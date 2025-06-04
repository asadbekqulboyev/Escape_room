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
      1024: {
        slidesPerView: 4.4,
      },
      768: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 1,
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
});
