# Reference Motion Spec

| Animation | Trigger | Property | Duration | Easing |
|---|---|---|---|---|
| Disclosure expand | click | height + opacity | [ASSUMED] 250-300ms | ease-out |
| Chevron rotate | click | transform | [ASSUMED] 200ms | ease-out |
| Category content swap | tab click | opacity + translateY(8px->0) | [ASSUMED] 250-300ms | ease-out |
| Selected swatch ring | select | border/scale | [ASSUMED] 150-200ms | ease-out |
| Paint change | select | fill crossfade | [ASSUMED] 300-500ms | ease-in-out |
| Wheel swap | select | crossfade | [ASSUMED] 250-350ms | ease-in-out |
| Drawer open | click | translateX(100%->0) + scrim | [ASSUMED] 300-400ms | cubic-bezier(.4,0,.2,1) |
| Modal open | click | opacity + scale(.98->1) | [ASSUMED] 200ms | ease-out |
| Price update | change | number tween/flash | [ASSUMED] 300-500ms | ease-out |
| Toast | event | translateY + opacity | [ASSUMED] 200 in / 150 out | ease-out |
