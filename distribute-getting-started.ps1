$ErrorActionPreference = "Stop"

$repos = Get-ChildItem -Directory C:\Users\frank\starlight\repos\awesome-* | Select-Object -ExpandProperty FullName
$sourceFile = "C:\Users\frank\starlight\repos\FrankX\GETTING_STARTED.md"

foreach ($repo in $repos) {
    Write-Host "Processing $repo..."
    $destFile = Join-Path $repo "GETTING_STARTED.md"
    Copy-Item -Path $sourceFile -Destination $destFile -Force

    $readmePath = Join-Path $repo "README.md"
    if (Test-Path $readmePath) {
        $content = Get-Content $readmePath -Raw
        
        # Check if we already updated it
        if (-not ($content -match "GETTING_STARTED\.md")) {
            $replacement = "$&`n`n> [!TIP]`n> **New to Agents?** Check out our [Getting Started Guide](./GETTING_STARTED.md) to set up your first Claude Code skill for free.`n>`n> **Ready to Scale?** Unlock premium Agent Swarms on [Gumroad](https://gumroad.com/frankxai) or [frankx.ai/products](https://frankx.ai/products)."
            
            # Find the section and insert the tip right after the table
            $newContent = $content -replace "(?s)(## .*?Recommended Claude Code Skills.*?\|.*?\|.*?`r?`n`r?`n)", $replacement
            
            # If the replace worked and actually changed something
            if ($newContent -ne $content) {
                Set-Content -Path $readmePath -Value $newContent -Encoding UTF8
                Write-Host "Updated README.md in $repo"
            } else {
                Write-Host "Could not find Recommended Skills table to append to in $repo" -ForegroundColor Yellow
            }
        } else {
            Write-Host "README already contains Getting Started link in $repo"
        }
    }
}
Write-Host "Done distributing Getting Started."
