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

gsap.registerPlugin(ScrollTrigger);

let ibscrolltrigger = document.querySelector('.ib-scroll-trigger');

gsap.to('.ib-scroll-trigger', {
  x: () => ibscrolltrigger.scrollWidth * -1,
  xPercent: 100,
  scrollTrigger: {
    trigger: '.ib-scroll-trigger',
    // start: 'center center',
    // end: '+=2000px',
            start:"top 5%",
        end:"top -100%",
    markers:true,
    pin: '.ib-scroll-trigger',
    scrub: true,
    invalidateOnRefresh: true
  }
});



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