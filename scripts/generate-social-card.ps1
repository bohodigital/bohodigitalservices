param(
  [string]$OutputPath = (Join-Path $PSScriptRoot "..\public\boho-digital-services-social-v2.png")
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bitmap = [System.Drawing.Bitmap]::new($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$bounds = [System.Drawing.Rectangle]::new(0, 0, $width, $height)
$background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
  $bounds,
  [System.Drawing.Color]::FromArgb(9, 11, 13),
  [System.Drawing.Color]::FromArgb(42, 29, 43),
  18
)
$graphics.FillRectangle($background, $bounds)

$gridPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(22, 255, 248, 235), 1)
for ($x = 0; $x -le $width; $x += 64) {
  $graphics.DrawLine($gridPen, $x, 0, $x, $height)
}
for ($y = 0; $y -le $height; $y += 64) {
  $graphics.DrawLine($gridPen, 0, $y, $width, $y)
}

$logoPanel = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 253, 248))
$graphics.FillRectangle($logoPanel, 72, 64, 116, 116)
$logoPath = Join-Path $PSScriptRoot "..\public\brand\boho-bee-logo-v2-256.png"
$logo = [System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $logoPath))
$graphics.DrawImage($logo, 82, 74, 96, 96)

$eyebrowFont = [System.Drawing.Font]::new("Arial", 19, [System.Drawing.FontStyle]::Bold)
$headlineFont = [System.Drawing.Font]::new("Georgia", 58, [System.Drawing.FontStyle]::Regular)
$supportFont = [System.Drawing.Font]::new("Arial", 21, [System.Drawing.FontStyle]::Regular)
$metaFont = [System.Drawing.Font]::new("Consolas", 13, [System.Drawing.FontStyle]::Regular)
$ivory = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(244, 240, 231))
$muted = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(193, 190, 184))
$gold = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(227, 174, 61))

$graphics.DrawString("BOHO DIGITAL SERVICES", $eyebrowFont, $gold, 218, 78)
$graphics.DrawString("Research-led website design,`nlocal SEO, and digital growth.", $headlineFont, $ivory, 72, 220)
$graphics.DrawString("Websites  |  SEO  |  Migration  |  Provider rescue", $supportFont, $muted, 76, 492)
$graphics.DrawString("RESEARCH  /  STRUCTURE  /  DELIVERY", $metaFont, $muted, 76, 560)

$routePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(160, 217, 184, 121), 2)
$graphics.DrawLine($routePen, 782, 116, 1114, 116)
$accentColors = @(
  [System.Drawing.Color]::FromArgb(84, 169, 157),
  [System.Drawing.Color]::FromArgb(87, 148, 174),
  [System.Drawing.Color]::FromArgb(157, 78, 130),
  [System.Drawing.Color]::FromArgb(227, 174, 61)
)
for ($i = 0; $i -lt 4; $i++) {
  $brush = [System.Drawing.SolidBrush]::new($accentColors[$i])
  $graphics.FillEllipse($brush, 770 + ($i * 112), 104, 24, 24)
  $brush.Dispose()
}

$background.Dispose()
$gridPen.Dispose()
$logoPanel.Dispose()
$logo.Dispose()
$eyebrowFont.Dispose()
$headlineFont.Dispose()
$supportFont.Dispose()
$metaFont.Dispose()
$ivory.Dispose()
$muted.Dispose()
$gold.Dispose()
$routePen.Dispose()
$graphics.Dispose()

$resolvedOutput = [System.IO.Path]::GetFullPath($OutputPath)
$outputDirectory = [System.IO.Path]::GetDirectoryName($resolvedOutput)
if (-not [System.IO.Directory]::Exists($outputDirectory)) {
  [System.IO.Directory]::CreateDirectory($outputDirectory) | Out-Null
}
$bitmap.Save($resolvedOutput, [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()

Write-Output $resolvedOutput
