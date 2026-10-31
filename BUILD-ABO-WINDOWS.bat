@echo off
setlocal
cd /d "%~dp0"
echo Pixel Recall - build disjoint Amazon Berkeley Objects libraries
echo.
echo Up to 30,000 ABO catalog photos are inspected and globally ranked.
echo Daily gets quality ranks 1-1095 only.
echo Run gets quality ranks 1096-2190 only.
echo The two pools cannot share an image or normalized 8x8 silhouette.
echo Local WebP previews are also generated for the photo-to-pixel animation.
echo.
where py >nul 2>nul
if %errorlevel%==0 (
  set PY=py -3
) else (
  set PY=python
)
%PY% -m venv .venv-abo
if errorlevel 1 goto :error
call .venv-abo\Scripts\activate.bat
python -m pip install --upgrade pip
python -m pip install -r requirements-real-objects.txt
if errorlevel 1 goto :error
python tools\abo_pattern_pipeline.py build --target-count 2190 --max-downloads 30000 --max-listings-per-label 500 --output-dir abo-output --asset-dir assets\abo --js-output real-object-patterns.generated.js
if errorlevel 1 goto :error
echo.
echo SUCCESS: 1,095 Daily-only + 1,095 Run-only ABO patterns are active.
echo Review abo-output\daily-contact-sheet.png, abo-output\run-contact-sheet.png, and abo-output\selected-sources.csv before deploying.
pause
exit /b 0
:error
echo.
echo Build did not complete. Deployed ABO JS/assets were not replaced.
echo Daily and Run stay disabled until both complete disjoint pools exist.
echo Increasing --max-downloads / --max-listings-per-label is safer than lowering quality thresholds.
pause
exit /b 1
