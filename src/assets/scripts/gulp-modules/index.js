import Swiper, { Autoplay, EffectFade, Pagination } from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import '../modules/helpers/imgParallax';

import { initSmoothScrolling } from '../modules/scroll/leniscroll';
import device from 'current-device';
initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

const expandArrow = document.querySelector('.expand-arrow');
const partnersList = document.querySelector('.partners-list');
if (expandArrow) {
  expandArrow.addEventListener('click', function() {
    partnersList.classList.toggle('open-list');
    expandArrow.classList.toggle('open-list');
  });
}

function langIdent() {
  const img = document.querySelector('.hero-img-pc');
  if (!img) return;
  if (window.location.href.includes('/en/')) {
    img.src = './assets/images/title-en.png';
  }

  return;
}
langIdent();
const fillerTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.filler-photo1',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom center', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    // markers: true,
  },
});
fillerTl
  .to('.filler-photo1 .right-border', {
    xPercent: 100,
    duration: 1.7,
    delay: 0.3,
  })
  .to(
    '.filler-photo1 .left-border',
    {
      xPercent: -100,
      duration: 1.7,
    },
    '<',
  )
  .from(
    '.filler-photo1 img',
    {
      yPercent: 20,
      duration: 1.5,
    },
    '<',
  );
const swiperProjects = new Swiper('.swiper-projects', {
  modules: [Autoplay],
  speed: 5000,
  slidesPerView: 'auto',
  // spaceBetween: 20,
  // slidesPerView: 1,
  autoplay: { delay: 10 },
  breakpoints: {
    // 360: {
    //   slidesPerView: 1.1,
    //   spaceBetween: 8,
    // },
    // 768: {
    //   slidesPerView: 2,
    //   //   spaceBetween: 20,
    // },
    // 1366: {
    //   // spaceBetween: 20,
    //   slidesPerView: 3,
    // },
  },
});
const swiperStates = new Swiper('.swiper-state', {
  modules: [Autoplay],
  speed: 5000,
  slidesPerView: 'auto',
  spaceBetween: 20,
  // slidesPerView: 1,
  autoplay: { delay: 10 },
  breakpoints: {
    // 360: {
    //   slidesPerView: 1.1,
    //   spaceBetween: 8,
    // },
    // 768: {
    //   slidesPerView: 2,
    //   //   spaceBetween: 20,
    // },
    // 1366: {
    //   // spaceBetween: 20,
    //   slidesPerView: 3,
    // },
  },
});
// @include adaptive-width(283.319, 165);
const identificateSlideWidth =
  window.innerWidth > 767
    ? 165 + (283.319 - 165) * (window.innerWidth / 1920)
    : 165 + (283.319 - 165 + (283.319 - 165) * 0.7) * ((window.innerWidth - 320) / 1920);
const adaptiveSlidesPerView =
  window.innerWidth > 1365
    ? (window.innerWidth * 0.648) / identificateSlideWidth
    : window.innerWidth / identificateSlideWidth;

if (device.mobile() || device.tablet()) {
  const swiperStories = new Swiper('.swiper-stories', {
    modules: [Pagination],
    spaceBetween: 20,
    slidesPerView: adaptiveSlidesPerView,
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    on: {
      init: function() {
        const firstVideo = document.querySelector('.swiper-slide video');
        firstVideo.play();
        firstVideo.style.filter = 'none';
        document
          .querySelector('.swiper-slide video')
          .addEventListener('ended', function videoEnded() {
            swiperStories.slideNext();
            firstVideo.style.filter = 'grayscale(1)';
            firstVideo.removeEventListener('ended', videoEnded);
          });
      },
      beforeTransitionStart: function(swiper) {
        let activeSlideVideo = swiper.slides[swiper.realIndex].querySelector('video');

        if (activeSlideVideo) {
          activeSlideVideo.addEventListener('ended', function videoEnded() {
            swiper.slideTo(
              swiper.slides.length === swiper.realIndex + 1 ? 0 : swiper.realIndex + 1,
            );
            activeSlideVideo.removeEventListener('ended', videoEnded);
          });
          activeSlideVideo.currentTime = 0;
          document.querySelectorAll('.swiper-slide video').forEach(function(video) {
            video.style.filter = 'grayscale(1)';
            if (!video.paused) {
              video.pause();
            }
          });

          activeSlideVideo.play();
          activeSlideVideo.style.filter = 'none';
        }
      },
    },
  });
}
if (device.desktop()) {
  const swiperStories = new Swiper('.swiper-stories', {
    modules: [Pagination, Autoplay],
    spaceBetween: 20,
    slidesPerView: adaptiveSlidesPerView,
    speed: 5000,
    autoplay: { delay: 10 },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  const slides = document.querySelectorAll('.swiper-stories .swiper-slide');

  slides.forEach(slide => {
    const video = slide.querySelector('video');

    slide.addEventListener('mouseenter', () => {
      video.play(); // Відтворює відео
      video.style.filter = 'grayscale(0)'; // Знімає ефект grayscale
    });

    slide.addEventListener('mouseleave', () => {
      video.pause(); // Ставит відео на паузу
      video.currentTime = 0; // Скидає відео на початок
      video.style.filter = 'grayscale(100%)'; // Повертає ефект grayscale
    });
  });
}

const questionsTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.questions',
    start: 'top+=20% center', // when the top of the trigger hits the top of the viewport
    end: 'bottom center', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    // markers: true,
  },
});
questionsTl.from('.question', {
  opacity: 0,
  yPercent: -300,
  stagger: {
    each: 0.1, // Час між анімаціями кожного елемента
    from: 'end', // Анімація починається з останнього елемента
  },
  duration: 1,
  ease: 'bounce.out',
});
gsap.to('.about', {
  scrollTrigger: {
    trigger: '.about', // Елемент, який триггерить анімацію
    start: 'top bottom', // Коли верх другого блоку досягне низу вікна
    end: 'top top', // Коли верх другого блоку досягне верху вікна
    scrub: true, // Анімація синхронізується зі скролом
    pin: '.hero', // Фіксуємо перший блок на місці
    pinSpacing: false, // Видаляємо простір, коли блокує перший блок
  },
  // y: '-100%', // Другий блок наїжджає на перший
});
gsap.to('.question__title', {
  scrollTrigger: {
    trigger: '.courses ', // Елемент, який триггерить анімацію
    start: 'top bottom', // Коли верх другого блоку досягне низу вікна
    end: 'top center', // Коли верх другого блоку досягне верху вікна
    scrub: true, // Анімація синхронізується зі скролом
    pin: '.question__title', // Фіксуємо перший блок на місці
    pinSpacing: false, // Видаляємо простір, коли блокує перший блок
  },
  opacity: 0,
  scale: 1.2,
  // y: '-100%', // Другий блок наїжджає на перший
});

gsap.to('.filler-photo-2', {
  scrollTrigger: {
    trigger: '.reviews', // Елемент, який триггерить анімацію
    start: () => window.innerWidth * -0.45 + ' top', // Коли верх другого блоку досягне низу вікна
    end: 'top top', // Коли верх другого блоку досягне верху вікна
    scrub: true, // Анімація синхронізується зі скролом
    pin: '.filler-photo-2', // Фіксуємо перший блок на місці
    pinSpacing: false, // Видаляємо простір, коли блокує перший блок
  },
  scale: 1.1,
});
const swiperReviews = new Swiper('.swiper-reviews', {
  modules: [Autoplay],
  speed: 5000,
  slidesPerView: 'auto',
  spaceBetween: 8,

  autoplay: { delay: 10 },
});
const swiperYoutube = new Swiper('.swiper-youtube', {
  modules: [Autoplay],
  speed: 5000,
  slidesPerView: 'auto',
  autoplay: { delay: 10 },
});
