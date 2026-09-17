@echo off
setlocal enabledelayedexpansion
title Zyphuel Git Direct Push Automation

echo ==============================================================
echo             ZYPHUEL GIT DIRECT PUSH AUTOMATION
echo ==============================================================
echo.

:: 1. Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git is not found in your system PATH.
    echo Please install Git or add it to PATH.
    echo.
    pause
    exit /b 1
)

:: 2. Check if inside a Git repository
git rev-parse --is-inside-work-tree >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] This directory is not a Git repository.
    echo.
    pause
    exit /b 1
)

:: 3. Detect current Git branch
set "CURRENT_BRANCH="
for /f "delims=" %%i in ('git branch --show-current 2^>nul') do set CURRENT_BRANCH=%%i
if "%CURRENT_BRANCH%"=="" (
    for /f "delims=" %%i in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set CURRENT_BRANCH=%%i
)
:: If in detached HEAD or empty, force default to main
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

:: 4. Check for changes
echo --------------------------------------------------------------
echo [STATUS] Checking for modifications...
echo --------------------------------------------------------------
git status -s
echo.

:: 5. Prompt for Commit Message
echo --------------------------------------------------------------
set "USER_MSG="
set /p "USER_MSG=Enter commit message (Press ENTER for auto message): "

if "%USER_MSG%"=="" (
    set "COMMIT_MSG=feat(update): automated push on %DATE% at %TIME%"
) else (
    set "COMMIT_MSG=%USER_MSG%"
)

echo.
echo [INFO] Staging all changes...
git add -A

git diff --staged --quiet
if %ERRORLEVEL% neq 0 (
    echo [INFO] Committing with message: "%COMMIT_MSG%"
    git commit -m "%COMMIT_MSG%"
) else (
    echo [INFO] No new changes to commit. Checking remote sync...
)

echo.
echo [INFO] Syncing with remote GitHub repository (git pull --rebase)...
git pull --rebase origin %CURRENT_BRANCH%

echo.
echo --------------------------------------------------------------
echo [INFO] Pushing commits to GitHub (origin/%CURRENT_BRANCH%)...
echo --------------------------------------------------------------
git push origin HEAD:%CURRENT_BRANCH%

if %ERRORLEVEL% equ 0 (
    echo.
    echo ==============================================================
    echo  [SUCCESS] Code successfully pushed to GitHub origin/%CURRENT_BRANCH%!
    echo ==============================================================
) else (
    echo.
    echo ==============================================================
    echo  [ERROR] Git push failed. Please check network/credentials above.
    echo ==============================================================
)

echo.
pause
