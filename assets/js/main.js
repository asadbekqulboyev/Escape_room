$(document).ready(function () {
  console.error = function () {};
    console.warn = function () {};
    console.log = function () {};

    function initSlider() {
      const testimonialSwiper = new Swiper(".testimonial__slider", {
        slidesPerView: 4.2,
        spaceBetween: 20,
        loop: false,
        on: {
          setTranslate: updateThumb,
          slideChange: updateThumb,
          resize: updateThumb,
        },
        breakpoints: {
          1550: { slidesPerView: 4.2 },
          1200: { slidesPerView: 3.1 },
          1024: { slidesPerView: 2.5 },
          768: { slidesPerView: 2.8 },
          0: { slidesPerView: 1.15, spaceBetween: 10 },
        },
      });
    
      const $thumb = $(".testimonial__scrollbar_thumb");
      const $scrollbar = $(".testimonial__scrollbar");
    
      // Boshlanishda grab kursori
      $thumb.css("cursor", "grab");
    
      function updateThumb() {
        const total = testimonialSwiper.slides.length;
        const visible = testimonialSwiper.params.slidesPerView;
        const ratio = visible / total;
        const widthPercent = Math.min(100, ratio * 100);
    
        $thumb.css("width", widthPercent + "%");
    
        const maxTranslate = $scrollbar.width() - $thumb.width();
        const translateX = testimonialSwiper.progress * maxTranslate;
    
        $thumb.css("transform", "translateX(" + translateX + "px)");
      }
    
      // Thumb harakatini boshqaruvchi
      function handleDrag(clientX) {
        const rect = $scrollbar[0].getBoundingClientRect();
        const posX = clientX - rect.left;
        const clampedX = Math.max(0, Math.min(posX, rect.width));
        const ratio = clampedX / rect.width;
    
        testimonialSwiper.setProgress(ratio);
      }
    
      let isDragging = false;
    
      // === Thumb ustida bosish
      $thumb.on("mousedown touchstart", function (e) {
        isDragging = true;
        let clientX = e.clientX || e.originalEvent.touches[0].clientX;
        handleDrag(clientX);
        $thumb.css("cursor", "grabbing");
        $("body").css("user-select", "none");
      });
    
      // === Thumbni harakatlantirish
      $(document).on("mousemove touchmove", function (e) {
        if (isDragging) {
          let clientX = e.clientX || e.originalEvent.touches[0].clientX;
          handleDrag(clientX);
        }
      });
    
      // === Qo‘yib yuborish
      $(document).on("mouseup touchend", function () {
        if (isDragging) {
          isDragging = false;
          $thumb.css("cursor", "grab");
          $("body").css("user-select", "");
        }
      });
    
      // === Scrollbarning istalgan joyiga bosish
      $scrollbar.on("mousedown touchstart", function (e) {
        let clientX = e.clientX || e.originalEvent.touches[0].clientX;
        handleDrag(clientX);
      });
    
      // === Thumb transform animatsiyasi (ixtiyoriy)
      $thumb.css("transition", "transform 0.2s ease");
    
      // Dastlabki holatda yangilaymiz
      updateThumb();
    }
    
    initSlider();
    $(document).ready(function () {
      const $container = $(".works__content");
      const $items = $(".works__content__item");
      const $thumb = $(".scrollbar_thumb");
    
      function checkItemsNearThumb() {
        const containerTop = $container.offset().top;
        const thumbTop = $thumb.offset().top;
        const thumbHeight = $thumb.outerHeight();
        const thumbCenter = thumbTop + thumbHeight / 2;
    
        $items.each(function () {
          const $item = $(this);
          const itemTop = $item.offset().top;
          const itemHeight = $item.outerHeight();
          const itemCenter = itemTop + itemHeight / 2;
    
          // Farq qanchalik kichik bo‘lsa, shunchalik thumbga yaqin
          const distance = Math.abs(itemCenter - thumbCenter);
    
          if (distance < itemHeight ) {
            $item.addClass("active");
          } else {
            $item.removeClass("active");
          }
        });
      }
    
      // Scroll paytida tekshiramiz
      $container.on("scroll", checkItemsNearThumb);
      $(window).on("resize", checkItemsNearThumb);
    
      // Bir marta yuklanishda ham tekshir
      checkItemsNearThumb();
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
$(function () {
  const $container = $('.works__content');
  const $items = $container.find('.works__content__item');

  let scrollReleased = false;
  let scrollLocked = false;
  let ticking = false; // requestAnimationFrame holati

  function lockBodyScroll() {
    if (!scrollLocked) {
      $('body').css('overflow', 'hidden');
      scrollLocked = true;
    }
  }

  function unlockBodyScroll() {
    if (scrollLocked) {
      $('body').css('overflow', 'auto');
      scrollLocked = false;
    }
  }

  function isContainerNearTop() {
    const rect = $container[0].getBoundingClientRect();
    return rect.top <= 10 && rect.top >= -10;
  }

  function scrollToContainerTop() {
    const currentScroll = $(window).scrollTop();
    const targetScroll = $container.offset().top - 10;
    const diff = Math.abs(currentScroll - targetScroll);

    if (diff > 40) {
      $('html, body').stop().animate({ scrollTop: targetScroll }, 300);
    } else {
      $(window).scrollTop(targetScroll);
    }
  }

  // ⚙️ requestAnimationFrame scroll kuzatuvchisi
  function checkScrollPosition() {
    const scrollTop = $(window).scrollTop();
    const containerTop = $container.offset().top;

    // Qayta yuqoriga chiqilganda holatni tiklash
    if (scrollReleased && scrollTop + $(window).height() < containerTop + 100) {
      scrollReleased = false;
    }

    // Scroll qotiruvchi holat
    if (!scrollReleased && isContainerNearTop()) {
      scrollToContainerTop();
      lockBodyScroll();
    }

    ticking = false; // qayta ruxsat beramiz
  }

  // window scroll listener — RAF orqali
  $(window).on('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(checkScrollPosition);
      ticking = true;
    }
  });

  // works__content ichida scroll qilish — active aniqlash
  $container.on('scroll', function () {
    const containerHeight = $container.height();
    let closestIndex = -1;
    let smallestDiff = Infinity;

    $items.each(function (index) {
      const $item = $(this);
      const itemTop = $item.offset().top - $container.offset().top;
      const itemCenter = itemTop + $item.outerHeight() / 2;
      const containerCenter = containerHeight / 2;
      const diff = Math.abs(containerCenter - itemCenter);

      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestIndex = index;
      }
    });

    $items.removeClass('active');
    if (closestIndex !== -1) {
      const $activeItem = $items.eq(closestIndex);
      $activeItem.addClass('active');

      if (closestIndex === $items.length - 1 && !scrollReleased) {
        scrollReleased = true;
        unlockBodyScroll();

        setTimeout(() => {
          const offset = $container.offset().top + $container.outerHeight();
          $('html, body').animate({ scrollTop: offset }, 500);
        }, 300);
      }
    }
  });

  // Boshlanishda scrollni trigger qilish
  setTimeout(() => {
    $container.scrollTop($container.scrollTop() + 1);
  }, 100);
});














