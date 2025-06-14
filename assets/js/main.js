$(document).ready(function () {
  console.error = function () {};
    console.warn = function () {};
    console.log = function () {};
    function initSlider() {
      const slidesCount = $(".testimonial__slider .swiper-slide").length;
    
      const testimonialSwiper = new Swiper(".testimonial__slider", {
        slidesPerView: 4.2,
        spaceBetween: 20,
        loop: slidesCount >= 3,
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          1550: {
            slidesPerView: 4.2,
          },
          1200: {
            slidesPerView: 3.1,
          },
          1024: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 2.8,
          },
          0: {
            slidesPerView: 1.15,
            spaceBetween: 10,
          },
        },
      });
    
      // === Interaktiv progressbar ===
      const progressbarEl = document.querySelector(".swiper-pagination");
      let isDragging = false;
    
      // Bosganda (mouse)
      progressbarEl.addEventListener("mousedown", (e) => {
        isDragging = true;
        updateSliderFromProgress(e);
      });
    
      // Mouse harakatda
      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          updateSliderFromProgress(e);
        }
      });
    
      // Qo‘yib yuborganda (mouse)
      document.addEventListener("mouseup", () => {
        isDragging = false;
      });
    
      // Mobil qurilmalar uchun: touchstart
      progressbarEl.addEventListener(
        "touchstart",
        (e) => {
          isDragging = true;
          updateSliderFromProgress(e.touches[0]);
        },
        { passive: true }
      );
    
      // touchmove
      document.addEventListener(
        "touchmove",
        (e) => {
          if (isDragging) {
            updateSliderFromProgress(e.touches[0]);
          }
        },
        { passive: true }
      );
    
      // touchend
      document.addEventListener(
        "touchend",
        () => {
          isDragging = false;
        },
        { passive: true }
      );
    
      // Slayderni progressbardagi joyiga ko‘ra yangilovchi funksiya
      function updateSliderFromProgress(e) {
        const rect = progressbarEl.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const clickRatio = clickX / width;
    
        const totalSlides =
          testimonialSwiper.slides.length - testimonialSwiper.loopedSlides * 2;
        const slideTo = Math.floor(clickRatio * totalSlides);
    
        testimonialSwiper.slideToLoop(slideTo);
      }
    }
    
    initSlider();
    
 // Scrollbar va thumb
 const $container = $(".works__content");
const $thumb = $(".scrollbar_thumb");
const $items = $(".works__content__item");

function updateThumb() {
  const containerHeight = $container.height();
  const contentHeight = $container[0].scrollHeight;
  const scrollTop = $container.scrollTop();

  const maxScrollTop = contentHeight - containerHeight;
  const scrollRatio = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
  const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 50);
  const thumbTop = scrollRatio * (containerHeight - thumbHeight);

  $thumb.css({
    height: thumbHeight + "px",
    top: thumbTop + "px",
  });
}

function updateActiveItems() {
  const containerTop = $container.scrollTop();
  const containerHeight = $container.height();

  $items.each(function () {
    const $item = $(this);
    const itemOffset = $item.offset().top - $container.offset().top;
    const itemHeight = $item.outerHeight();

    if (itemOffset + itemHeight > 20 && itemOffset < containerHeight - 20) {
      $item.addClass("active");
    } else {
      $item.removeClass("active");
    }
  });
}

function onScroll() {
  updateThumb();
  updateActiveItems();
}

// Throttle scroll with requestAnimationFrame
let ticking = false;
$container.on("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
    ticking = true;
  }
});

onScroll();

// Drag functionality
let isDragging = false;
let startY = 0;
let startScrollTop = 0;

function startDrag(pageY) {
  isDragging = true;
  startY = pageY;
  startScrollTop = $container.scrollTop();
  $("body").addClass("no-select");
}

function endDrag() {
  isDragging = false;
  $("body").removeClass("no-select");
}

function dragMove(pageY) {
  if (!isDragging) return;

  const deltaY = pageY - startY;
  const containerHeight = $container.height();
  const contentHeight = $container[0].scrollHeight;
  const maxScrollTop = contentHeight - containerHeight;

  const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 50);
  const scrollableHeight = maxScrollTop;
  const thumbMoveRatio = scrollableHeight / (containerHeight - thumbHeight);

  $container.scrollTop(startScrollTop + deltaY * thumbMoveRatio);
}

// Mouse events
$thumb.on("mousedown", function (e) {
  e.preventDefault();
  startDrag(e.pageY);
});

$(document).on("mousemove", function (e) {
  dragMove(e.pageY);
});

$(document).on("mouseup", function () {
  endDrag();
});

// Touch events (passive: false kerak!)
$thumb[0].addEventListener("touchstart", function (e) {
  e.preventDefault(); // kerak bo‘lmasa passive false bo‘lmaydi
  startDrag(e.touches[0].pageY);
}, { passive: false });

document.addEventListener("touchmove", function (e) {
  if (isDragging) {
    dragMove(e.touches[0].pageY);
  }
}, { passive: false });

document.addEventListener("touchend", function () {
  endDrag();
});

  // Initialize intl-tel-input
  const input = $("#phone_input")[0];
  if (input && typeof window.intlTelInput !== "undefined") {
    const iti = window.intlTelInput(input, {
      initialCountry: "fi",
      nationalMode: false,
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.min.js",
    });
  } else {
    console.warn("");
  }

  // Flatpickr
  if ($("#datePicker").length) {
    $("#datePicker").flatpickr({
      dateFormat: "D M d, Y",
      defaultDate: "2025-09-12",
    });
  }

  if ($("#timePicker").length) {
    $("#timePicker").flatpickr({
      enableTime: true,
      noCalendar: true,
      dateFormat: "h:i K",
      defaultDate: "11:30",
      time_24hr: false,
    });
  }

  // Modal
  $(".open_modal").click(function (e) {
    e.preventDefault();
    $(".modal_order").fadeIn();
  });
  $(".exit_modal").click(function () {
    $(".modal_order").fadeOut();
  });

  // Video
  $(".play").each(function () {
    var $btn = $(this);
    var $container = $btn.parent();
    var $video = $container.find("video")[0];

    if ($video) {
      $btn.on("click", function () {
        $video.play();
        $btn.addClass("hidden");
      });
      $($video).on("click", function () {
        if ($video.paused) {
          $video.play();
          $btn.addClass("hidden");
        } else {
          $video.pause();
        }
      });
      $($video).on("pause", function () {
        $btn.removeClass("hidden");
      });
      $($video).on("play", function () {
        $btn.addClass("hidden");
      });
    }
  });
});