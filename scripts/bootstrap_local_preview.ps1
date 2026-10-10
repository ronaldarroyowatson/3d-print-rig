[CmdletBinding()]
param(
  [string]$Output = "..\rig-preview-source",
  [switch]$Force
)

$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$siteSource = Join-Path $root "site"
$bundleConfigPath = Join-Path $siteSource "ASSET_BUNDLE.json"

if (-not (Test-Path $bundleConfigPath)) {
  throw "Missing bundle descriptor: $bundleConfigPath"
}

$bundle = Get-Content -Raw -Path $bundleConfigPath | ConvertFrom-Json
if (-not $bundle.url -or -not $bundle.bytes -or -not $bundle.sha256) {
  throw "ASSET_BUNDLE.json is missing url/bytes/sha256."
}

$outputPath = [System.IO.Path]::GetFullPath((Join-Path $root $Output))
if ((Test-Path $outputPath) -and -not $Force) {
  throw "Output already exists: $outputPath`nUse -Force to rebuild it."
}

if (Test-Path $outputPath) {
  Remove-Item -Recurse -Force $outputPath
}
New-Item -ItemType Directory -Path $outputPath | Out-Null

Write-Host "Copying tracked site source to $outputPath ..."
Copy-Item -Recurse -Force (Join-Path $siteSource "*") $outputPath

$zipPath = Join-Path $outputPath "viewer-models.zip"
Write-Host "Downloading pinned model bundle..."
Invoke-WebRequest -Uri $bundle.url -OutFile $zipPath -Headers @{"User-Agent"="3D-Print-Rig"}

$archiveInfo = Get-Item $zipPath
if ([int64]$archiveInfo.Length -ne [int64]$bundle.bytes) {
  throw "Bundle size mismatch. Expected $($bundle.bytes), got $($archiveInfo.Length)."
}

$sha = (Get-FileHash -Algorithm SHA256 -Path $zipPath).Hash.ToLowerInvariant()
if ($sha -ne $bundle.sha256.ToLowerInvariant()) {
  throw "Bundle SHA-256 mismatch. Expected $($bundle.sha256), got $sha."
}

Write-Host "Extracting pinned model bundle..."
Expand-Archive -Path $zipPath -DestinationPath $outputPath -Force
Remove-Item -Force $zipPath

$customManifestPath = Join-Path $root "custom\manifest.json"
if (Test-Path $customManifestPath) {
  $customManifest = Get-Content -Raw -Path $customManifestPath | ConvertFrom-Json
  foreach ($generated in $customManifest.generated_files) {
    if (-not $generated.source -or -not $generated.target) { continue }
    $generatedSource = Join-Path (Join-Path $root "custom") $generated.source
    $generatedTarget = Join-Path $outputPath $generated.target
    if (Test-Path $generatedSource) {
      Copy-Item -Force $generatedSource $generatedTarget
    }
  }
} else {
  $customSource = Join-Path $root "custom\components\custom-components.json"
  $customTarget = Join-Path $outputPath "CUSTOM_COMPONENTS.json"
  if (Test-Path $customSource) {
    Copy-Item -Force $customSource $customTarget
  }
}

New-Item -ItemType File -Path (Join-Path $outputPath ".nojekyll") -Force | Out-Null

Write-Host "Preview directory prepared: $outputPath"
Write-Host "Serve with:"
Write-Host "  python -m http.server 8000 --directory `"$outputPath`""
