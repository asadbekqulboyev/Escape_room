$(document).ready(function () {
  const $scrollable = $("#scrollable");
  const $thumb = $("#thumb");

  $scrollable.on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const maxScroll = this.scrollHeight - this.clientHeight;
    const trackHeight = this.clientHeight * 0.8; // .line height
    const thumbHeight = 60;
    const maxThumbTop = trackHeight - thumbHeight;

    const thumbTop = (scrollTop / maxScroll) * maxThumbTop;
    $thumb.css("top", `calc(10% + ${thumbTop}px)`);
  });
});
