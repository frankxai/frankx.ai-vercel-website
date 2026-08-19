$ErrorActionPreference = "Stop"

$repos = Get-ChildItem -Directory C:\Users\frank\starlight\repos\awesome-* | Select-Object -ExpandProperty FullName

foreach ($repo in $repos) {
    Write-Host "Processing $repo..."
    Push-Location $repo
    
    try {
        # Check if there are changes
        $status = git status --porcelain
        if ($status) {
            Write-Host "Changes found in $repo. Committing and pushing..."
            git add .
            git commit -m "chore: ACOS ecosystem alignment (visuals, architecture, links)"
            git push origin main
        } else {
            Write-Host "No changes in $repo."
        }
    } catch {
        Write-Host "Failed to process $repo. Error: $_" -ForegroundColor Red
    } finally {
        Pop-Location
    }
}
Write-Host "All repositories pushed successfully!"
