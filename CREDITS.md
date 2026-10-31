# Pattern credits

## Amazon Berkeley Objects (ABO)

Pixel Recall's built-in **Daily** and **Run** pattern libraries are ABO-derived only in this build. No legacy handcrafted, Font Awesome-derived, mirrored, or other built-in Daily/Run patterns are used.

The build pipeline takes eligible Amazon Berkeley Objects catalog images, extracts the foreground object, converts the silhouette to a strict 8×8 binary grid, scores how faithfully the grid preserves the source silhouette, and retains the best unique results. It also creates a small local WebP crop of each selected source image for the photo-to-pixel intro animation.

The final generated library is split into two completely disjoint sets:

- quality ranks 1–1,095: Daily only
- quality ranks 1,096–2,190: Run only

Dataset: **Amazon Berkeley Objects (ABO)**, Collins et al., CVPR 2022.

Official dataset page: https://amazon-berkeley-objects.s3.amazonaws.com/index.html

The official ABO distribution states CC BY 4.0. Keep this credit and the generated `abo-output/selected-sources.csv` / `selected-sources.json` provenance files when publishing the generated assets.

Custom/Friend Challenge patterns are drawn by users and are not part of the built-in object library.
