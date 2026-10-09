# CONCEPTS.md — React Architecture & CarPhotoStage

## How `CarPhotoStage` Works

`CarPhotoStage` replaces the procedural 3D box model with a photographic studio stage that feels alive and responsive. Here is how core React concepts power this component:

### 1. Props (`vehicle`, `paint`, `wheel`, `upholstery`, `view`, `theme`)
- **What they are:** Data inputs passed down from the parent `Configurator` component.
- **Analogy:** Think of props like the order ticket given to a chef in a restaurant. The chef prepares the exact dish specified on the ticket.

### 2. State (`displayedImageUrl`, `previousImageUrl`, `isLoading`, `cockpitOffset`)
- **What it is:** Internal memory within the component that changes over time based on user interactions.
- **Analogy:** Like a digital camera display remembering which photo is currently active and whether it is loading the next one.

### 3. `useEffect` (Preloading & Crossfading)
- **What it does:** When `currentImageUrl` changes, `useEffect` uses `new Image()` to load the next high-resolution photo in the background before displaying it.
- **Why it matters:** Eliminates white flashes or flickering. The new image is swapped in smoothly with a 300ms CSS crossfade.

### 4. `useMemo` (Performance Optimization)
- **What it does:** Caches computed values like body style resolution, alt text, and paint overlays so they are only recalculated when their specific dependencies change.

### 5. `useRef` (Cockpit Drag Interaction)
- **What it does:** Stores mutable drag coordinates (`dragStartX`, `dragStartOffset`) without triggering unnecessary component re-renders during 60fps pointer movements.
