// const header = document.querySelector('.header-bg');

// window.addEventListener('scroll', function headerSquosh() {
//   const scrollPosition = window.scrollY;
//   if (scrollPosition > 20) {
//     header.classList.add('scroll-down');
//   } else {
//     header.classList.remove('scroll-down');
//   }
// });

document.body.addEventListener('click', function(evt) {
  const close = evt.target.closest('[data-call-us-modal-close]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const overflow = document.querySelector('[data-call-us__overflow]');

  const closedetails = evt.target.closest('[data-details-modal-close]');
  const btndetails = evt.target.closest('[data-details-btn]');
  const overflowdetails = document.querySelector('[data-details__overflow]');

  const closeyoutube = evt.target.closest('[data-youtube-modal-close]');
  const btnyoutube = evt.target.closest('[data-youtube-btn]');
  const overflowyoutube = document.querySelector('[data-youtube__overflow]');

  if (btn) {
    window.dispatchEvent(new Event('stop-scroll'));
    return overflow.classList.remove('hidden');
  }
  if (close) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }
  if (evt.target === overflow) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }

  if (btndetails) {
    window.dispatchEvent(new Event('stop-scroll'));
    return overflowdetails.classList.remove('hidden');
  }
  if (closedetails) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflowdetails.classList.add('hidden');
  }
  if (evt.target === overflowdetails) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflowdetails.classList.add('hidden');
  }

  if (btnyoutube) {
    window.dispatchEvent(new Event('stop-scroll'));
    overflowyoutube.querySelector('iframe').src = btnyoutube.dataset.href;
    return overflowyoutube.classList.remove('hidden');
  }
  if (closeyoutube) {
    window.dispatchEvent(new Event('start-scroll'));
    overflowyoutube.querySelector('iframe').src = '';
    return overflowyoutube.classList.add('hidden');
  }
  if (evt.target === overflowyoutube) {
    window.dispatchEvent(new Event('start-scroll'));
    overflowyoutube.querySelector('iframe').src = '';
    return overflowyoutube.classList.add('hidden');
  }
});

// const loader = document.querySelector(".loader-wrap");

// document.addEventListener('DOMContentLoaded', () => {
//     window.onload = function () {
//       window.setTimeout(() => {
//         loader.classList.add("loaded")
//       }, 1200)
//     }
//   })
