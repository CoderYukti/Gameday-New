// gsap.to("#ib-sec-seven .ib-scroll-trigger .content", {
//     transform:"translateX(-275%)",
//     scrollTrigger:{
//         trigger:".ib-scroll-trigger",
//         scroller:"body",
//         markers:false,
//         start:"top 5%",
//         end:"top -100%",
//         scrub:5,
//         pin:true,
//     }
// })

// document.addEventListener("DOMContentLoaded", function () {
//   gsap.registerPlugin(ScrollTrigger);

//   let ibscrolltrigger = document.querySelector('.ib-scroll-trigger');

//   gsap.to('.ib-scroll-trigger', {
//     x: () => ibscrolltrigger.scrollWidth * -1,
//     ease: "none",
//     xPercent: 100,
//     scrollTrigger: {
//       trigger: '.ib-scroll-trigger',
//       start: 'center center',
//       end: '+=2000px',
//       markers: true,
//       pin: '.ib-scroll-trigger',
//       scrub: 3,
//       invalidateOnRefresh: true
//     }
//   });
// });


// document.addEventListener("DOMContentLoaded", function () {
//   gsap.registerPlugin(ScrollTrigger);

//   let ibscrolltrigger = document.querySelector('.ib-scroll-trigger');

//   gsap.to('.ib-scroll-trigger', {
//     x: () => -ibscrolltrigger.scrollWidth + window.innerWidth,
//     ease: "none",
//     scrollTrigger: {
//       trigger: '.ib-scroll-wrapper', // Use a wrapper element for better control
//       start: 'top', // Start when the top of the trigger reaches the center of the viewport
//       end: () => `+=${ibscrolltrigger.scrollWidth - window.innerWidth}`, // Adjust dynamically based on element's width
//       markers: true,
//       pin: '.ib-scroll-wrapper', // Pin the wrapper, not the moving element
//       scrub: 3,
//       invalidateOnRefresh: true
//     }
//   });
// });




document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Horizontal Scroll Animation
  let ibscrolltrigger = document.querySelector('.ib-scroll-trigger');

  gsap.to('.ib-scroll-trigger', {
    x: () => -ibscrolltrigger.scrollWidth + window.innerWidth,
    ease: "none",
    scrollTrigger: {
      trigger: '.ib-scroll-wrapper',
      start: 'top top', // Adjust start point as needed
      end: () => `+=${ibscrolltrigger.scrollWidth - window.innerWidth}`,
      markers: true,
      pin: '.ib-scroll-wrapper',
      scrub: 3,
      invalidateOnRefresh: true
    }
  });

  // Timeline Animation with Screen Size Handling
  function setupAnimations(triggerElement) {
    // Destroy existing ScrollTriggers if necessary
    // ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top top',
      end: '+=2000px',
      pin: true,
      pinSpacing: true,
      scrub: true,
      markers: true,
      onUpdate: self => {
        gsap.to('.timeline-line-fill', { height: `${self.progress * 100}%`, ease: "none" });
        updateActiveTimelineNumber(self.progress);
      }
    });

    function updateActiveTimelineNumber(progress) {
      const timelineNumbers = document.querySelectorAll('.ib-timeline-content .timeline-number');
      const timelineContents = document.querySelectorAll('.ib-timeline-content .timeline-content');
      const activeIndex = Math.floor(progress * (timelineNumbers.length - 1));

      timelineNumbers.forEach((number, index) => {
        if (index <= activeIndex) {
          if (!number.classList.contains('active')) {
            number.classList.add('active');
            gsap.fromTo(timelineContents[index], { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' });
          }
        } else {
          number.classList.remove('active');
          gsap.to(timelineContents[index], { x: '100%', opacity: 0, duration: 0.5, ease: 'power2.in' });
        }
      });

      if (progress === 0) {
        timelineNumbers[0].classList.remove('active');
        gsap.to(timelineContents[0], { x: '100%', opacity: 0, duration: 0.5, ease: 'power2.in' });
      }
    }
  }

  function setupForScreenSize(screenSize) {
    if (screenSize.matches) {
      setupAnimations('.ib-timeline-content');
    } else {
      setupAnimations('#ib-sec-steps');
    }
  }

  const screenSize = window.matchMedia("(max-width: 991px)");
  setupForScreenSize(screenSize);
  screenSize.addListener(setupForScreenSize);
});









// document.addEventListener("DOMContentLoaded", function () {
//   // Pin the timeline and animate the line filling
//   ScrollTrigger.create({
//     trigger: '#ib-sec-steps',
//     start: 'top',        // Start when the top of the timeline hits the top of the viewport
//     end: '+=2000px',    // End when the bottom of the timeline hits the bottom of the viewport
//     pin: true,               // Pin the timeline
//     pinSpacing: true,        // Maintain spacing
//     scrub: 3,             // Smooth scrubbing
//     markers: true,           // Remove this in production
//     onUpdate: self => {
//       gsap.to('.timeline-line-fill', { height: `${self.progress * 100}%`, ease: "none" });
//       updateActiveTimelineNumber(self.progress);
//     }
//   });


//   // Function to update active timeline number
//   function updateActiveTimelineNumber(progress) {
//     const timelineNumbers = document.querySelectorAll('.ib-timeline-content .timeline-number');
//     const timelineContents = document.querySelectorAll('.ib-timeline-content .timeline-content');
//     const activeIndex = Math.floor(progress * (timelineNumbers.length - 1));

//     timelineNumbers.forEach((number, index) => {
//       if (index <= activeIndex) {
//         if (!number.classList.contains('active')) {
//           number.classList.add('active');
//           gsap.fromTo(timelineContents[index], { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 1, ease: 'power2.out' });
//         }
//       } else {
//         number.classList.remove('active');
//         gsap.to(timelineContents[index], { x: '100%', opacity: 0, duration: 1, ease: 'power2.in' });
//       }
//     });

//     // Ensure the active class is removed from the first number if the fill height is 0
//     if (progress === 0) {
//       timelineNumbers[0].classList.remove('active');
//       gsap.to(timelineContents[0], { x: '100%', opacity: 0, duration: 1, ease: 'power2.in' });
//     }
//   }

// });



// document.addEventListener("DOMContentLoaded", function () {
//   gsap.registerPlugin(ScrollTrigger);

//   function setupAnimations(triggerElement) {
//     // // Destroy existing ScrollTriggers
//     // ScrollTrigger.getAll().forEach(trigger => trigger.kill());

//     ScrollTrigger.create({
//       trigger: triggerElement,
//       start: 'top',        // Start when the top of the timeline hits the top of the viewport
//       end: '+=2000px',               // End when the bottom of the timeline hits the bottom of the viewport
//       pin: true,                     // Pin the timeline
//       pinSpacing: true,              // Maintain spacing
//       scrub: true,                   // Smooth scrubbing
//       markers: true,                 // Remove this in production
//       onUpdate: self => {
//         gsap.to('.timeline-line-fill', { height: `${self.progress * 100}%`, ease: "none" });
//         updateActiveTimelineNumber(self.progress);
//       }
//     });

//     // Function to update active timeline number
//     function updateActiveTimelineNumber(progress) {
//       const timelineNumbers = document.querySelectorAll('.ib-timeline-content .timeline-number');
//       const timelineContents = document.querySelectorAll('.ib-timeline-content .timeline-content');
//       const activeIndex = Math.floor(progress * (timelineNumbers.length - 1));

//       timelineNumbers.forEach((number, index) => {
//         if (index <= activeIndex) {
//           if (!number.classList.contains('active')) {
//             number.classList.add('active');
//             gsap.fromTo(timelineContents[index], { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' });
//           }
//         } else {
//           number.classList.remove('active');
//           gsap.to(timelineContents[index], { x: '100%', opacity: 0, duration: 0.5, ease: 'power2.in' });
//         }
//       });

//       // Ensure the active class is removed from the first number if the fill height is 0
//       if (progress === 0) {
//         timelineNumbers[0].classList.remove('active');
//         gsap.to(timelineContents[0], { x: '100%', opacity: 0, duration: 0.5, ease: 'power2.in' });
//       }
//     }
//   }

//   function setupForScreenSize(screenSize) {

//     if (screenSize.matches) {
//       // Large screen animation
//       setupAnimations('.ib-timeline-content');
//     } else {
//       // Small screen animation
//       setupAnimations('#ib-sec-steps');
//     }
//   }

//   // Define breakpoints
//   const screenSize = window.matchMedia("(max-width: 991px)");

//   // Set up initial animations based on the screen size
//   setupForScreenSize(screenSize);

//   // Add listener for screen size changes
//   screenSize.addListener(setupForScreenSize);
// });











// banner video
const video = document.getElementById('bannerVideo');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

playBtn.addEventListener('click', () => {
  video.play();
  playBtn.style.display = 'none'; // Hide play button
  pauseBtn.style.display = 'block'; // Show pause button
});

pauseBtn.addEventListener('click', () => {
  video.pause();
  pauseBtn.style.display = 'none'; // Hide pause button
  playBtn.style.display = 'block'; // Show play button
});


$('.ib-card-slider').slick({
  infinite: true,
  speed: 300,
  autoplay: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: true
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$('.testimonial-card').slick({
  infinite: true,
  speed: 300,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        dots: true,
        autoplay: true,
      }
    }
  ]
});