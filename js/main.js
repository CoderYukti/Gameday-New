document.addEventListener("DOMContentLoaded", function () {

  // Handle hamburger menu click
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('open');
      const headerMenu = document.getElementById('header-menu');
      const headerLogoMob = document.querySelector('.header-logo-mob');
      if (headerMenu && headerLogoMob) {
        headerMenu.classList.toggle('open');
        const menuList = headerMenu.querySelector('ul');
        const menuItems = menuList.querySelectorAll('li');
        if (menuList) menuList.classList.toggle('open');
        if (headerLogoMob.style.filter === 'invert(1)') {
          headerLogoMob.style.filter = '';
        } else {
          headerLogoMob.style.filter = 'invert(1)';
        }
        if (menuList.classList.contains('open')) {
          menuItems.forEach((item, index) => {
            setTimeout(() => item.classList.add('animate-in'), index * 150);
          });
          document.documentElement.style.overflowY = 'hidden';
        } else {
          menuItems.forEach(item => item.classList.remove('animate-in'));
          document.documentElement.style.overflowY = '';
        }
      }
    });
  }

  // Handle scroll for header menu
  window.addEventListener('scroll', function () {
    const header = document.getElementById('header-menu');
    if (header) {
      if (window.scrollY > 400) {
        header.classList.add('scroll');
      } else if (window.scrollY === 0) {
        header.classList.remove('scroll');
      }
    }
  });

  // Handle services hover
  const services = document.querySelectorAll('#ib-sec-two .services');
  services.forEach(service => {
    service.addEventListener('mouseenter', function () {
      const activeService = document.querySelector('#ib-sec-two .services.active');
      if (activeService) activeService.classList.remove('active');
      service.classList.add('active');
    });
  });

  // GSAP and ScrollTrigger for vertical progress bar
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.create({
    trigger: '#ib-sec-steps',
    start: 'center center',
    end: '+=500px',
    pin: true,
    pinSpacing: true,
    scrub: true,
    markers: false,
    invalidateOnRefresh: true,
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
      const ibscrolltrigger = document.querySelector('.ib-scroll-trigger');
      const ibscrollwrapper = document.querySelector('.ib-scroll-wrapper');
      if (ibscrolltrigger && ibscrollwrapper) {
        gsap.to(ibscrolltrigger, {
          x: () => -ibscrolltrigger.scrollWidth + window.innerWidth,
          ease: "none",
          scrollTrigger: {
            trigger: ibscrollwrapper,
            start: 'center center',
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

  // Initial call and bind resize event
  toggleSlickGsap();
  $(window).on('resize', toggleSlickGsap);

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

  // Footer menu dropdown
  $('.footer-menu-heading-arrow').click(function () {
    var menu = $(this).parent().next('.ib-footer-menu');
    var isOpen = menu.css('max-height') !== '0px' && menu.css('max-height') !== 'none';
    $('.ib-footer-menu').css('max-height', '0px');
    $('.footer-menu-heading-arrow').removeClass('open');
    if (!isOpen) {
      menu.css('max-height', menu.prop('scrollHeight') + 'px');
      $(this).addClass('open');
    }
  });
});
