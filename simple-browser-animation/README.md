# Simple Browser Animation a.k.a `CartoonSystem`

A working example demonstrating the `CartoonSystem` structure and its use in creating Frog Crossing (Simulated 2D Cartoon created in the Browser).

[Cartoon Animation System - Frog Crossing](https://github.com/cpdata/orphan-scripts/new/main/simple-browser-animation/index.html)

**Explanation:**

1.  **HTML:** Sets up the basic page structure, includes the GSAP library via CDN, defines the `#cartoon-stage` div, and adds basic control buttons and the accessibility toggle.
2.  **CSS:** Provides styling for the stage, ensures elements added by the system are `position: absolute`, and styles the buttons.
3.  **JavaScript (`CartoonSystem`):**
    * Implements the `CartoonSystem` object as designed.
    * `init`: Sets up the stage reference, initializes the main GSAP timeline, and calls `setupAccessibility`. Includes a `clearStage` call to handle restarts.
    * `clearStage`: Removes previously added elements from the stage DOM and clears the internal `objects` tracker.
    * `setupAccessibility`: Uses `gsap.matchMedia` to detect the user's motion preference and sets a `this.prefersReducedMotion` flag. It also links the UI checkbox to refresh the setting (though a full timeline rebuild might be needed for immediate effect in complex scenarios).
    * `addElement` (and aliases `addBackground`, `addObject`): Creates a `div`, applies styles, adds it to the stage, and stores its reference. Handles optional timed removal via the timeline.
    * `removeElement` (and aliases): Removes an element from the DOM and the `objects` store, with an option for a fade-out effect.
    * `animateObject`: The core animation function. It checks the `prefersReducedMotion` flag. If true, it attempts a simpler animation (like a fade) or skips the animation. If false, it adds the full GSAP animation to the main timeline using `timeline.to()`.
    * `animateSprite` / `setObjectSpriteFrame`: Included as placeholders based on the design, but their internal logic is commented out as this example doesn't use actual sprite sheets. They include basic checks for necessary configuration and the reduced motion flag.
    * Timeline Controls (`play`, `pause`, `seek`, `restart`, `addLabel`, `addDelay`, `getTimeline`): Provide straightforward wrappers around the GSAP timeline methods. The `restart` function now calls `createCartoon()` again to rebuild the scene.
4.  **JavaScript (`createCartoon`):**
    * This function orchestrates the creation of the specific frog animation.
    * It calls `CartoonSystem.init()` first.
    * It adds background elements for the start/finish zones and the road using `addBackground`. Lane markings are added for visual detail.
    * It adds the frog and car objects using `addObject`, calculating their initial positions.
    * It uses `animateObject` to create infinitely repeating animations for the cars, starting them all at time 0 on the timeline.
    * It sequences the frog's upward hops using `animateObject` and relative timeline positioning (`>+0.5`), creating a step-by-step movement.
    * A final `timeline.call` adds a small visual effect when the frog reaches the end.
5.  **Event Listeners:**
    * The `DOMContentLoaded` listener ensures the script runs after the page is ready.
    * It calls `createCartoon()` to set up the animation.
    * It attaches the `CartoonSystem` control functions to the corresponding buttons.
