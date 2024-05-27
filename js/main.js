document.addEventListener("DOMContentLoaded", function () {

  $('.hamburger').click(function () {
    $(this).toggleClass('open');
  });


  const services = document.querySelectorAll('#ib-sec-two .services');

  services.forEach(service => {
    service.addEventListener('mouseenter', function () {
      const activeService = document.querySelector('#ib-sec-two .services.active');
      if (activeService) {
        activeService.classList.remove('active');
      }
      service.classList.add('active');
    });
  });




  // vertical progress bar on scroll start
  gsap.registerPlugin(ScrollTrigger);

  // Pin the timeline and animate the line filling
  ScrollTrigger.create({
    trigger: '#ib-sec-steps',
    start: 'center center',        // Start when the top of the timeline hits the top of the viewport
    end: '+=500px',               // End when the bottom of the timeline hits the bottom of the viewport
    pin: true,                     // Pin the timeline
    pinSpacing: true,              // Maintain spacing
    scrub: true,                   // Smooth scrubbing
    markers: false,                 // Remove this in production
    invalidateOnRefresh: true,
    onUpdate: self => {
      gsap.to('.timeline-line-fill', { height: `${self.progress * 100}%`, ease: "none" });
      updateActiveTimelineNumber(self.progress);
    }
  });

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
  // vertical progress bar on scroll end



  // horizontal card scroll for desktop and slider for mobile start
  $(document).ready(function () {
    function toggleSlickGsap() {
      if ($(window).width() < 992) {
        $('.mob-slider').slick({
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
      } else {
        gsap.registerPlugin(ScrollTrigger);

        // Horizontal Scroll Animation
        const ibscrolltrigger = document.querySelector('.ib-scroll-trigger');
        const ibscrollwrapper = document.querySelector('.ib-scroll-wrapper');

        if (ibscrolltrigger && ibscrollwrapper) {
          gsap.to(ibscrolltrigger, {
            x: () => -ibscrolltrigger.scrollWidth + window.innerWidth,
            ease: "none",
            scrollTrigger: {
              trigger: ibscrollwrapper,
              start: 'center center', // Adjust start point as needed
              end: () => `+=${ibscrolltrigger.scrollWidth - window.innerWidth}`,
              markers: false,
              pin: ibscrollwrapper,
              scrub: 3,
              invalidateOnRefresh: true
            }
          });
        }
      }
    }

    toggleSlickGsap();
    $(window).on('resize', toggleSlickGsap);
  });
  // horizontal card scroll for desktop and slider for mobile end



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

      // Add or remove CSS property 'filter' directly to the .header-logo-mob element
      if (headerLogoMob.style.filter === 'invert(1)') {
        headerLogoMob.style.filter = ''; // Remove filter if already inverted
      } else {
        headerLogoMob.style.filter = 'invert(1)'; // Add filter to invert the logo
      }

      // Animate list items
      if (menuList.classList.contains('open')) {
        menuItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate-in');
          }, index * 150); // 100ms delay for each item
        });
      } else {
        menuItems.forEach(item => {
          item.classList.remove('animate-in');
        });
      }
    });
  }




  // Number Counter JS start
  const counters = document.querySelectorAll('.ib-counter-number span');
  const speed = 500; //Increase value for slow speed

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
            setTimeout(updateCount, 50); //Increase value for slow speed
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
      }
    });
  };

  window.addEventListener('scroll', animateCounter);
  animateCounter(); // Initial check in case the element is already in view
  // Number Counter JS end

  // dynamically year change start
  const yearSpan = document.getElementById('currentYear');
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
  // dynamically year change end
});



// banner video play/pause start
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
// banner video play/pause end

// treatments card slider start
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
        dots: true,
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
// treatments card slider end


// testimonials slider start
$('.testimonial-card').slick({
  infinite: true,
  speed: 300,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: false
});
// testimonials slider end



// blogs slider for mobile start
$(document).ready(function () {
  function toggleSlick() {
    if ($(window).width() < 992) {
      if (!$('.blogs-slider').hasClass('slick-initialized')) {
        $('.blogs-slider').slick({
          infinite: true,
          speed: 300,
          autoplay: true,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
        });
      }
    } else {
      if ($('.blogs-slider').hasClass('slick-initialized')) {
        $('.blogs-slider').slick('unslick');
      }
    }
  }

  toggleSlick();
  $(window).on('resize', toggleSlick);
});
// blogs slider for mobile end


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