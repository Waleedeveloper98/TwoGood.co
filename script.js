function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
function navbarAnimation(){
    gsap.to("#nav-part1 svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
          trigger: "#page1",
          scroller: "main",
          start: "top 0",
          end: "top -5%",
          scrub: true,
        },
      });
    gsap.to("#nav-part2 #links", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
          trigger: "#page1",
          scroller: "main",
          start: "top 0",
          end: "top -5%",
          scrub: true,
        },
      });
}

function videoAnimation() {
    let videoContainer = document.querySelector(".video-container")
    let playBtn = document.querySelector("#play")
    videoContainer.addEventListener("mouseenter", () => {
        gsap.to(playBtn, {
            opacity: 1,
            scale: 1,
        })
    })
    videoContainer.addEventListener("mouseleave", () => {
        gsap.to(playBtn, {
            opacity: 0,
            scale: 0,
        })
    })
    videoContainer.addEventListener("mousemove", (dets) => {
        let rect = videoContainer.getBoundingClientRect()
        let x = dets.x - rect.left - playBtn.offsetWidth / 2
        let y = dets.y - rect.top - playBtn.offsetHeight / 2
        gsap.to(playBtn, {
            x: x,
            y: y
        })
    })
}
function loadingAnimation() {
    let tlOne = gsap.timeline()
    tlOne.from("#page1 h1 span", {
        opacity: 0,
        y: 100,
        delay: .5,
        duration: .7,
        stagger: .3
    })
    tlOne.from(".video-container", {
        opacity: 0,
        y: 100,
        scale: .8,
        duration: .8,
    })
}

function page3Animation(){
    document.addEventListener("mousemove", (dets) => {
        gsap.to("#cursor", {
            x: dets.clientX,
            y: dets.clientY
        });
    });
    
    let child = document.querySelectorAll("#page3 .child");
    const colors = [
        "rgba(255, 0, 0, 0.1)",
        "rgba(0, 255, 0, 0.1)",
        "rgba(0, 0, 255, 0.1)",
        "rgba(255, 255, 0, 0.1)"
    ];
    
    child.forEach((elem, idx) => {
        elem.addEventListener("mouseenter", () => {
            gsap.to("#cursor", {
                scale: 1,
                backgroundColor: colors[idx]
            });
        });
        elem.addEventListener("mouseleave", () => {
            gsap.to("#cursor", {
                scale: 0
            });
        });
    });
    
}


loco()
navbarAnimation()
videoAnimation()
loadingAnimation()
page3Animation()