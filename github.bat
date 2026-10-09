@echo off
setlocal enabledelayedexpansion
title Zyphuel Web Direct Push to GitHub

echo ==============================================================
echo          ZYPHUEL WEB 1-CLICK GIT DIRECT PUSH TO GITHUB
echo ==============================================================
echo.

:: 1. Verify Git availability
where git >nul 2>nul
if !ERRORLEVEL! neq 0 (
    echo [ERROR] Git is not installed or not in system PATH.
    echo.
    pause
    exit /b 1
)

:: 2. Verify git repository
git rev-parse --is-inside-work-tree >nul 2>nul
if !ERRORLEVEL! neq 0 (
    echo [ERROR] Current folder is not a Git repository.
    echo.
    pause
    exit /b 1
)

:: 3. Remove stale lock files if any
if exist ".git\index.lock" del /f /q ".git\index.lock" >nul 2>nul

:: 4. Detect branch
set "CURRENT_BRANCH="
for /f "delims=" %%i in ('git branch --show-current 2^>nul') do set CURRENT_BRANCH=%%i
if "%CURRENT_BRANCH%"=="" (
    for /f "delims=" %%i in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set CURRENT_BRANCH=%%i
)
if "%CURRENT_BRANCH%"=="" set CURRENT_BRANCH=main

echo [i] Repository    : %CD%
echo [i] Target Branch : %CURRENT_BRANCH%
echo.

:: 5. Stage all changes
echo [1/3] Staging all files (git add -A)...
git add -A

:: 6. Commit changes if any exist
echo [2/3] Creating commit...
git diff --staged --quiet
if !ERRORLEVEL! neq 0 (
    git commit -m "feat(update): automated 1-click push on %DATE% at %TIME%"
    echo [OK] Changes committed successfully.
) else (
    echo [i] No new uncommitted changes detected.
)
echo.

:: 7. Push to GitHub
echo [3/3] Pushing to GitHub (origin/%CURRENT_BRANCH%)...
git push origin %CURRENT_BRANCH%

if !ERRORLEVEL! equ 0 goto :push_success

echo.
echo [!] Push failed or was rejected. Attempting safe sync and retry...
git pull --rebase --autostash origin %CURRENT_BRANCH%
if !ERRORLEVEL! neq 0 (
    echo.
    echo ==============================================================
    echo  [ERROR] Sync/Rebase failed. Please resolve conflicts or check git status.
    echo ==============================================================
    goto :push_end
)

git push origin %CURRENT_BRANCH%
if !ERRORLEVEL! equ 0 goto :push_success_synced

echo.
echo ==============================================================
echo  [ERROR] Push failed. Please check your internet or GitHub access.
echo ==============================================================
goto :push_end

:push_success
echo.
echo ==============================================================
echo  [SUCCESS] Code successfully pushed to GitHub!
echo ==============================================================
echo Commit SHA:
git rev-parse --short HEAD
goto :push_end

:push_success_synced
echo.
echo ==============================================================
echo  [SUCCESS] Code successfully pushed after sync!
echo ==============================================================
echo Commit SHA:
git rev-parse --short HEAD
goto :push_end

:push_end

echo.
pause
