@echo off
setlocal enabledelayedexpansion
title Zyphuel Git Direct Push Automation

echo ==============================================================
echo             ZYPHUEL GIT DIRECT PUSH AUTOMATION
echo ==============================================================
echo.

rem 1. Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git is not found in your system PATH.
    echo Please install Git or add it to PATH.
    echo.
    pause
    exit /b 1
)

rem 2. Check if inside a Git repository
git rev-parse --is-inside-work-tree >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] This directory is not a Git repository.
    echo.
    pause
    exit /b 1
)

rem 3. Clean up any stale lock files or stuck rebase/merge states
if exist ".git\index.lock" del /f /q ".git\index.lock" >nul 2>nul
if exist ".git\rebase-merge" git rebase --abort >nul 2>nul
if exist ".git\rebase-apply" git rebase --abort >nul 2>nul
if exist ".git\MERGE_HEAD" git merge --abort >nul 2>nul

rem 4. Configure git repo for resilience against merge conflicts
git config --local pull.rebase true >nul 2>nul
git config --local rebase.autoStash true >nul 2>nul
git config --local merge.ours.driver true >nul 2>nul

rem 5. Detect current Git branch
set "CURRENT_BRANCH="
for /f "delims=" %%i in ('git branch --show-current 2^>nul') do set CURRENT_BRANCH=%%i
if "%CURRENT_BRANCH%"=="" (
    for /f "delims=" %%i in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set CURRENT_BRANCH=%%i
)
if "%CURRENT_BRANCH%"=="" set CURRENT_BRANCH=main
if /i "%CURRENT_BRANCH%"=="HEAD" (
    echo [WARN] Detached HEAD detected. Reattaching to branch 'main'...
    git checkout main 2>nul
    set CURRENT_BRANCH=main
)

echo [INFO] Target Branch: %CURRENT_BRANCH%
echo [INFO] Remote Origin:
git remote -v
echo.

rem 6. Check for modifications and show status
echo --------------------------------------------------------------
echo [STATUS] Current Working Tree Status:
echo --------------------------------------------------------------
git status -s
echo.

rem 7. Fetch remote status FIRST before touching files
echo --------------------------------------------------------------
echo [INFO] Step 1/4: Syncing with remote repository (origin/%CURRENT_BRANCH%)...
echo --------------------------------------------------------------
git fetch origin %CURRENT_BRANCH% 2>nul

set "BEHIND_COUNT=0"
for /f "delims=" %%c in ('git rev-list --count HEAD..origin/%CURRENT_BRANCH% 2^>nul') do set "BEHIND_COUNT=%%c"

if "%BEHIND_COUNT%"=="0" goto :branch_in_sync

echo [INFO] Remote origin/%CURRENT_BRANCH% has %BEHIND_COUNT% new commit(s).
echo [INFO] Integrating remote updates safely with auto-stash...
git checkout -- assets/*.svg .github/assets/*.svg public/images/*.svg src/data/gitTelemetry.json README.md >nul 2>nul
git pull --rebase --autostash origin %CURRENT_BRANCH%
if %ERRORLEVEL% equ 0 goto :sync_done

echo [WARN] Rebase conflict detected in generated assets. Auto-resolving...
git checkout --theirs assets/*.svg .github/assets/*.svg public/images/*.svg src/data/gitTelemetry.json README.md >nul 2>nul
git add assets/*.svg .github/assets/*.svg public/images/*.svg src/data/gitTelemetry.json README.md >nul 2>nul
git -c core.editor=true rebase --continue >nul 2>nul

if exist ".git\rebase-merge" (
    git rebase --abort >nul 2>nul
    git pull origin %CURRENT_BRANCH% --no-rebase -s recursive -X theirs --no-edit >nul 2>nul
)

:sync_done
echo [SUCCESS] Remote updates integrated cleanly.
goto :prompt_commit

:branch_in_sync
echo [INFO] Local branch is up to date with remote origin/%CURRENT_BRANCH%.

:prompt_commit
echo.
rem 8. Prompt for Commit Message
echo --------------------------------------------------------------
echo [INFO] Step 2/4: Commit Details
echo --------------------------------------------------------------
set "USER_MSG="
set /p "USER_MSG=Enter commit message (Press ENTER for auto message): "

set "CLEAN_MSG="
if defined USER_MSG set "CLEAN_MSG=!USER_MSG: =!"
if "!CLEAN_MSG!"=="" (
    set "COMMIT_MSG=feat(update): automated push on %DATE% at %TIME%"
) else (
    set "COMMIT_MSG=!USER_MSG!"
)
echo.

rem 9. Generate real-time telemetry on top of synced HEAD
echo --------------------------------------------------------------
echo [INFO] Step 3/4: Generating real-time Git activity graphs...
echo --------------------------------------------------------------
node scripts/generate_github_graph.js
echo.

rem 10. Stage and commit
git add -A
git diff --staged --quiet
if %ERRORLEVEL% neq 0 (
    echo [INFO] Committing changes with message: "%COMMIT_MSG%"
    git commit -m "%COMMIT_MSG%"
) else (
    echo [INFO] No new changes to commit.
)
echo.

rem 11. Push to GitHub with Auto-Retry Logic
echo --------------------------------------------------------------
echo [INFO] Step 4/4: Pushing commits to GitHub (origin/%CURRENT_BRANCH%)...
echo --------------------------------------------------------------
git push origin HEAD:%CURRENT_BRANCH%

if %ERRORLEVEL% equ 0 goto :push_success

echo.
echo [WARN] Direct push was rejected (remote may have updated during processing).
echo [INFO] Auto-reconciling with origin/%CURRENT_BRANCH% and retrying...
git pull --rebase --autostash origin %CURRENT_BRANCH%
if %ERRORLEVEL% neq 0 (
    git checkout --theirs assets/*.svg .github/assets/*.svg public/images/*.svg src/data/gitTelemetry.json README.md >nul 2>nul
    git add assets/*.svg .github/assets/*.svg public/images/*.svg src/data/gitTelemetry.json README.md >nul 2>nul
    git -c core.editor=true rebase --continue >nul 2>nul
)
node scripts/generate_github_graph.js >nul 2>nul
git add -A
git diff --staged --quiet || git commit -m "%COMMIT_MSG% (auto-reconciled)" >nul 2>nul
git push origin HEAD:%CURRENT_BRANCH%

if %ERRORLEVEL% equ 0 goto :push_success

echo.
echo ==============================================================
echo  [ERROR] Git push failed. Please check network/credentials above.
echo ==============================================================
goto :script_end

:push_success
echo.
echo ==============================================================
echo  [SUCCESS] Code successfully pushed to GitHub origin/%CURRENT_BRANCH%!
echo ==============================================================
echo.
echo Latest Commit SHA:
git rev-parse --short HEAD

:script_end
echo.
pause
