# ASSETS.md — Vehicle Image & Layer Contract

## Folder & Asset Structure

All vehicle assets are organized under `public/cars/` and referenced via `src/data/officialMercedesAssets.js`:

```
public/cars/
  sedan/
    threequarter/
    side/
    cockpit/
  suv/
  coupe/
```

## How to Swap In Custom or Licensed Images
To replace or customize images:
1. Place your high-resolution 16:10 transparent or studio image in the respective folder or update the URL in `src/data/officialMercedesAssets.js`.
2. The `CarPhotoStage` component automatically manages preloading, smooth crossfade transitions, aspect-ratio clamping, and studio/night filters.
