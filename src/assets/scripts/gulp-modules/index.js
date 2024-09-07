import Swiper, { Autoplay, EffectFade } from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import '../modules/helpers/imgParallax';

import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

const expandArrow = document.querySelector(".expand-arrow")
const partnersList = document.querySelector(".partners-list")
if (expandArrow) {
  expandArrow.addEventListener("click", function () {
    partnersList.classList.toggle("open-list")
    expandArrow.classList.toggle("open-list")
  })
}

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
.to('.filler-photo1 .right-border', 
  {
    xPercent:100,
    duration: 1.7,
    delay: 0.3,
  }
)
.to('.filler-photo1 .left-border', 
  {
    xPercent:-100,
    duration: 1.7,
  },
  '<'

)
.from('.filler-photo1 img', 
  {
    yPercent: 20,
    duration: 1.5,
  },
  '<'

)