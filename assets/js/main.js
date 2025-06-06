$(document).ready(function () {
  new Swiper(".testimonial__slider", {
    slidesPerView: 4.1,
    spaceBetween: 20,
    loop: true,
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
        slidesPerView: 1.5,
      },
    },
  });
  const $container = $(".works__content"); // Scroll qilingan div
  const $thumb = $(".scrollbar_thumb");
  const $scrollbar = $(".scrollbar");
  const $items = $(".works__content__item");

  function updateThumb() {
    const containerHeight = $container.height();
    const contentHeight = $container[0].scrollHeight;
    const scrollTop = $container.scrollTop();

    const thumbHeight = Math.max(
      (containerHeight / contentHeight) * containerHeight,
      50
    );
    const thumbTop = (scrollTop / contentHeight) * containerHeight;

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
      const itemTop = $item.position().top;
      const itemHeight = $item.outerHeight();

      if (itemTop + itemHeight > 20 && itemTop < containerHeight - 20) {
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

  // Scroll harakati
  $container.on("scroll", onScroll);

  // Boshlanishida
  onScroll();

  // Thumbni drag qilish
  let isDragging = false;
  let startY = 0;
  let startScrollTop = 0;

  $thumb.on("mousedown", function (e) {
    e.preventDefault();
    isDragging = true;
    startY = e.pageY;
    startScrollTop = $container.scrollTop();
    $("body").addClass("no-select");
  });

  $(document).on("mousemove", function (e) {
    if (!isDragging) return;

    const deltaY = e.pageY - startY;
    const containerHeight = $container.height();
    const contentHeight = $container[0].scrollHeight;
    const scrollableHeight = contentHeight - containerHeight;

    const thumbMoveRatio = scrollableHeight / containerHeight;
    $container.scrollTop(startScrollTop + deltaY * thumbMoveRatio);
  });

  $(document).on("mouseup", function () {
    isDragging = false;
    $("body").removeClass("no-select");
  });
  // Initialize intl-tel-input
  const iti = window.intlTelInput($("#phone_input")[0], {
    initialCountry: "fi", // Finland
    nationalMode: false,
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.min.js",
  });

  // Initialize flatpickr for date
  $("#datePicker").flatpickr({
    dateFormat: "D M d, Y",
    defaultDate: "2025-09-12",
  });

  // Initialize flatpickr for time
  $("#timePicker").flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    defaultDate: "11:30",
    time_24hr: false,
  });
  $(".open_modal").click(function (e) {
    e.preventDefault();
    $(".modal_order").fadeIn();
  });
  $(".exit_modal").click(function () {
    $(".modal_order").fadeOut();
  });
});
