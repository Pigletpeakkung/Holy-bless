// Replace with <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>

const sacredGeometry = {
  animateCross: () => {
    const tl = gsap.timeline();
    tl.to(".cross-vertical", { 
      scaleY: 1.5, 
      duration: 0.3,
      transformOrigin: "center center"
    })
    .to(".cross-horizontal", {
      scaleX: 1.5,
      duration: 0.3,
      transformOrigin: "center center" 
    }, "<")
    .to(".cross-button", {
      rotation: 360,
      duration: 1.5,
      ease: "power2.out"
    });
  },
  
  quoteEntrance: (element) => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "back.out",
      onStart: () => {
        // Create divine light effect
        const div = document.createElement('div');
        div.style = `position:absolute; top:0; left:0; 
          width:100%; height:2px; background:radial-gradient(#ff0, transparent)`;
        element.parentNode.appendChild(div);
        gsap.to(div, { 
          y: element.offsetHeight,
          opacity: 0,
          duration: 1,
          onComplete: () => div.remove()
        });
      }
    });
  }
};

// Modify generatePassage() to use:
sacredGeometry.animateCross();
sacredGeometry.quoteEntrance(document.querySelector('#passageOutput p'));
