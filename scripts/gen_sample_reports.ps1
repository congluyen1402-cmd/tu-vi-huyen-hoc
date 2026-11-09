Add-Type -AssemblyName System.Drawing

$pages = @(
  @{ File = "sample-report-1.jpg"; Title = "BAO CAO TU VI VIP - TRANG 1/3"; Sub = "BAN DO SAO TOAN THU & BO CUC 12 CUNG VI" },
  @{ File = "sample-report-2.jpg"; Title = "BAO CAO TU VI VIP - TRANG 2/3"; Sub = "LUAN GIAI CHI TIET TAM PHUONG TU CHINH" },
  @{ File = "sample-report-3.jpg"; Title = "BAO CAO TU VI VIP - TRANG 3/3"; Sub = "VAN HAN DAI VAN & PHUONG PHAP HOA GIAI" }
)

foreach ($p in $pages) {
  $bmp = New-Object System.Drawing.Bitmap(800, 1131)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(250, 247, 240))
  $g.FillRectangle($bgBrush, 0, 0, 800, 1131)

  $penGold1 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(212, 175, 55), 3)
  $penGold2 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 140, 40), 1)
  $g.DrawRectangle($penGold1, 30, 30, 740, 1071)
  $g.DrawRectangle($penGold2, 38, 38, 724, 1055)

  $fontHeader = New-Object System.Drawing.Font('Times New Roman', 18, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font('Times New Roman', 12, [System.Drawing.FontStyle]::Italic)
  $brushDark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 20, 40))
  $brushGold = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(160, 120, 20))

  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center

  $g.DrawString("XEM TU VI HUYEN HOC", $fontHeader, $brushGold, 400.0, 70.0, $sf)
  $g.DrawString($p.Title, $fontHeader, $brushDark, 400.0, 105.0, $sf)
  $g.DrawString($p.Sub, $fontSub, $brushGold, 400.0, 135.0, $sf)
  $g.DrawLine($penGold2, 150, 165, 650, 165)

  $penLine = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, 215, 200), 1)
  for ($y = 200; $y -le 900; $y += 35) {
    $g.DrawLine($penLine, 70, $y, 730, $y)
  }

  $sealBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(200, 54, 45))
  $sealPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(160, 30, 25), 3)
  $g.FillEllipse($sealBrush, 580, 920, 140, 140)
  $g.DrawEllipse($sealPen, 580, 920, 140, 140)
  $g.DrawEllipse($penGold1, 588, 928, 124, 124)

  $fontSeal = New-Object System.Drawing.Font('Times New Roman', 11, [System.Drawing.FontStyle]::Bold)
  $brushWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
  $g.DrawString("TU VI", $fontSeal, $brushWhite, 650.0, 960.0, $sf)
  $g.DrawString("CHINH TONG", $fontSeal, $brushWhite, 650.0, 980.0, $sf)
  $g.DrawString("HOANG GIA", $fontSeal, $brushWhite, 650.0, 1000.0, $sf)

  $fontWm = New-Object System.Drawing.Font('Times New Roman', 28, [System.Drawing.FontStyle]::Bold)
  $brushWm = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 212, 175, 55))
  $g.TranslateTransform(400.0, 550.0)
  $g.RotateTransform(-30.0)
  $g.DrawString("XEMTUVINHUYENHOC.COM - BAN QUYEN VIP", $fontWm, $brushWm, 0.0, 0.0, $sf)
  $g.ResetTransform()

  $p1 = Join-Path "images" $p.File
  $p2 = Join-Path "public/images" $p.File
  $bmp.Save($p1, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bmp.Save($p2, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bmp.Dispose()
  $g.Dispose()
  Write-Output ("Saved " + $p.File)
}
