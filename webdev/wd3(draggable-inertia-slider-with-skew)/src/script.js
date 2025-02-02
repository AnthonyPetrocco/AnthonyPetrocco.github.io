console.clear();

gsap.registerPlugin(Draggable, InertiaPlugin);

const draggableWrapper = document.querySelector(".container");
const imagesContainer = document.querySelector(".images-container");
const tracker = InertiaPlugin.track(imagesContainer, "x")[0];
const clamper = gsap.utils.clamp(-20, 20);

window.addEventListener("load", () => {
  Draggable.create(imagesContainer, {
    type: "x",
    bounds: {
      minX: draggableWrapper.clientWidth - imagesContainer.scrollWidth,
      maxX: 0
    },
    onDrag() {
      const skew = clamper(tracker.get("x") / 200);
      gsap.set(imagesContainer, {
        skewX: skew
      });
    },
    onRelease() {
      gsap.to(imagesContainer, {
        skewX: 0,
        duration: 0.8,
        ease: "power1.inOut"
      });
    },
    inertia: true
  });
});
