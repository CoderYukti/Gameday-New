document.addEventListener("DOMContentLoaded", function () {

  $('.hamburger').click(function () {
    $(this).toggleClass('open');
  });

  const hamburger = document.querySelector('.hamburger');
  const headerMenu = document.querySelector('#header-menu');
  const headerLogoMob = document.querySelector('.header-logo-mob');

  if (hamburger && headerMenu && headerLogoMob) {
    hamburger.addEventListener('click', function () {
      headerMenu.classList.toggle('open'); // Toggle 'open' class on #header-menu
      const menuList = headerMenu.querySelector('ul');
      const menuItems = menuList.querySelectorAll('li');

      if (menuList) {
        menuList.classList.toggle('open'); // Toggle 'open' class on ul element
      }

      // // Add or remove CSS property 'filter' directly to the .header-logo-mob element
      // if (headerLogoMob.style.filter === 'invert(1)') {
      //   headerLogoMob.style.filter = ''; // Remove filter if already inverted
      // } else {
      //   headerLogoMob.style.filter = 'invert(1)'; // Add filter to invert the logo
      // }

      // Animate list items
      if (menuList.classList.contains('open')) {
        menuItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate-in');
          }, index * 150); // 150ms delay for each item
        });
        document.documentElement.style.overflowY = 'hidden'; // Add overflow-y: hidden to <html> tag
      } else {
        menuItems.forEach(item => {
          item.classList.remove('animate-in');
        });
        document.documentElement.style.overflowY = ''; // Remove overflow-y: hidden from <html> tag
      }
    });
  }




  let prevScrollPos = window.scrollY;

  window.addEventListener('scroll', function () {
    var header = document.getElementById('header-menu');
    var currentScrollPos = window.scrollY;

    if (currentScrollPos === 0) {
      // If at the top of the page, remove the scroll class
      header.classList.remove('scroll');
    } else if (currentScrollPos < prevScrollPos) {
      // Scrolling up
      header.classList.add('scroll');
    } else {
      // Scrolling down
      header.classList.remove('scroll');
    }

    prevScrollPos = currentScrollPos;
  });




  // Services hover effect
  const services = document.querySelectorAll('#ib-sec-two .services');
  services.forEach(service => {
    service.addEventListener('mouseenter', function () {
      document.querySelector('#ib-sec-two .services.active')?.classList.remove('active');
      service.classList.add('active');
    });
  });



  // vertical progress bar on scroll start

  // // GSAP and ScrollTrigger initialization
  // gsap.registerPlugin(ScrollTrigger);

  // // Initialize the timeline ScrollTrigger
  // function initTimelineScrollTrigger() {
  //   ScrollTrigger.create({
  //     trigger: '#ib-sec-steps',
  //     start: 'center center',        // Start when the top of the timeline hits the top of the viewport
  //     end: '+=500px',               // End when the bottom of the timeline hits the bottom of the viewport
  //     pin: true,                     // Pin the timeline
  //     pinSpacing: true,              // Maintain spacing
  //     scrub: true,                   // Smooth scrubbing
  //     markers: false,                // Remove this in production
  //     invalidateOnRefresh: true,
  //     id: 'timelineScroll',          // Give a unique ID for the timeline ScrollTrigger
  //     onUpdate: self => {
  //       gsap.to('.timeline-line-fill', { height: `${self.progress * 100}%`, ease: "none" });
  //       updateActiveTimelineNumber(self.progress);
  //     }
  //   });
  // }

  // // Function to update active timeline number
  // function updateActiveTimelineNumber(progress) {
  //   const timelineNumbers = document.querySelectorAll('.ib-timeline-content .timeline-number');
  //   const timelineContents = document.querySelectorAll('.ib-timeline-content .timeline-content');
  //   const activeIndex = Math.floor(progress * (timelineNumbers.length - 1));

  //   timelineNumbers.forEach((number, index) => {
  //     if (index <= activeIndex) {
  //       if (!number.classList.contains('active')) {
  //         number.classList.add('active');
  //         gsap.fromTo(timelineContents[index], { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' });
  //       }
  //     } else {
  //       number.classList.remove('active');
  //       gsap.to(timelineContents[index], { x: '100%', opacity: 0, duration: 0.5, ease: 'power2.in' });
  //     }
  //   });

  //   // Ensure the active class is removed from the first number if the fill height is 0
  //   if (progress === 0) {
  //     timelineNumbers[0].classList.remove('active');
  //     gsap.to(timelineContents[0], { x: '100%', opacity: 0, duration: 0.5, ease: 'power2.in' });
  //   }
  // }
  // // Initialize the timeline ScrollTrigger on page load
  // initTimelineScrollTrigger();


  // GSAP and ScrollTrigger initialization
  gsap.registerPlugin(ScrollTrigger);

  function initTimelineScrollTrigger() {
    const section = document.querySelector('#ib-sec-steps');
    if (!section) {
      return;
    }

    const timelineLine = section.querySelector('.timeline-line');
    const timelineFill = section.querySelector('.timeline-line-fill');
    const timelineNumbers = section.querySelectorAll('.timeline-number');

    if (timelineNumbers.length === 0) {
      return;
    }

    const timelineNumberFirst = timelineNumbers[0];
    const timelineNumberLast = timelineNumbers[timelineNumbers.length - 1];

    // Function to update the height of the timeline line
    function updateTimelineHeight() {
      const sectionRect = section.getBoundingClientRect();
      const topPosition = timelineNumberFirst.getBoundingClientRect().top - sectionRect.top;
      const bottomPosition = timelineNumberLast.getBoundingClientRect().bottom - sectionRect.top;
      const totalHeight = bottomPosition - topPosition;

      // Set the height of the .timeline-line dynamically based on calculated height
      timelineLine.style.height = `${totalHeight}px`;
    }

    // Call the function once to set the initial height
    updateTimelineHeight();

    // Recalculate the height on window resize
    window.addEventListener('resize', updateTimelineHeight);

    // Initialize ScrollTrigger
    ScrollTrigger.create({
      trigger: '#ib-sec-steps',
      start: 'center center',
      end: () => `+=${timelineLine.offsetHeight}`,  // End when the bottom of the timeline content is reached
      pin: true,
      pinSpacing: true,
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
      id: 'timelineScroll',
      onUpdate: self => {
        gsap.to(timelineFill, { height: `${self.progress * 100}%`, ease: "none" });
        updateActiveTimelineNumber(self.progress);
      }
    });
  }

  // Function to update active timeline number
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

    // Ensure the active class is removed from the first number if the fill height is 0
    if (progress === 0) {
      timelineNumbers[0].classList.remove('active');
      gsap.to(timelineContents[0], { x: '100%', opacity: 0, duration: 0.5, ease: 'power2.in' });
    }
  }

  // Initialize the timeline ScrollTrigger on page load
  initTimelineScrollTrigger();









  // vertical progress bar on scroll end



  // Toggle Slick and GSAP animations on resize
  function toggleSlickGsap() {
    const mobSlider = $('.mob-slider');
    if ($(window).width() < 992) {
      if (!mobSlider.hasClass('slick-initialized')) {
        mobSlider.slick({
          responsive: [
            {
              breakpoint: 991,
              settings: {
                infinite: true,
                speed: 300,
                autoplay: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true,
                dots: true,
              }
            },
            {
              breakpoint: 767,
              settings: {
                infinite: true,
                speed: 300,
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: true,
              }
            }
          ]
        });
      }
    } else {
      if (mobSlider.hasClass('slick-initialized')) {
        mobSlider.slick('unslick');
      }
      // const ibscrolltrigger = document.querySelector('.ib-scroll-trigger');
      // const ibscrollwrapper = document.querySelector('.ib-scroll-wrapper');
      // if (ibscrolltrigger && ibscrollwrapper) {
      //   gsap.to(ibscrolltrigger, {
      //     x: () => -ibscrolltrigger.scrollWidth + window.innerWidth,
      //     ease: "none",
      //     scrollTrigger: {
      //       trigger: ibscrollwrapper,
      //       start: 'top',
      //       end: () => `+=${ibscrolltrigger.scrollWidth - window.innerWidth}`,
      //       markers: true,
      //       pin: ibscrollwrapper,
      //       scrub: 3,
      //       invalidateOnRefresh: true,
      //       id: 'horizontalScroll' // Give a unique ID
      //     }
      //   });
      // }

      gsap.registerPlugin(ScrollTrigger);

      let horizontalSection = document.querySelector('.horizontal');

      gsap.to('.horizontal', {
        x: () => horizontalSection.scrollWidth * -1,
        xPercent: 100,
        scrollTrigger: {
          trigger: '.horizontal',
          start: 'center center',
          end: '+=2000px',
          pin: '#horizontal-scoll',
          scrub: 2,
          invalidateOnRefresh: true
        }
      });

    }
  }

  // Initial call and bind resize event
  toggleSlickGsap();
  $(window).on('resize', function () {
    // Clear only specific GSAP animations and ScrollTriggers related to responsive elements
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id === 'horizontalScroll') {
        trigger.kill();
      }
    });
    toggleSlickGsap();
  });









  // Number counter animation
  const counters = document.querySelectorAll('.ib-counter-number span');
  const speed = 500;
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const animateCounter = () => {
    counters.forEach(counter => {
      if (isElementInViewport(counter) && counter.getAttribute('data-started') !== 'true') {
        counter.setAttribute('data-started', 'true');
        counter.style.opacity = 1;
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const increment = target / speed;
          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 50);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      }
    });
  };

  window.addEventListener('scroll', animateCounter);
  animateCounter();

  // Dynamically change year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Initialize sliders
  $('.ib-card-slider').slick({
    infinite: true,
    speed: 300,
    autoplay: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1301,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      }
    ]
  });

  $('.testimonial-card').slick({
    infinite: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false
  });

  // footer menu drop down start
  $(document).ready(function () {
    $('.footer-menu-heading-arrow').click(function () {
      var menu = $(this).parent().next('.ib-footer-menu');
      var isOpen = menu.css('max-height') !== '0px' && menu.css('max-height') !== 'none';

      // Close all menus and remove rotation from all arrows
      $('.ib-footer-menu').css('max-height', '0px');
      $('.footer-menu-heading-arrow').removeClass('open');

      // Toggle the clicked menu
      if (isOpen) {
        menu.css('max-height', '0px');
      } else {
        menu.css('max-height', menu.prop('scrollHeight') + 'px');
        $(this).addClass('open');
      }
    });
  });
  // footer menu drop down end


  // Function to detect screen size changes and force a hard refresh
  (function () {
    let initialWidth = window.innerWidth;

    window.addEventListener('resize', function () {
      if (window.innerWidth !== initialWidth) {
        location.reload(); // Hard refresh the page
      }
    });
  })();
});

