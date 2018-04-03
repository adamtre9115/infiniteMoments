$(document).ready(function() {
  //   once all images have loaded, start initializing masonry grid ...
  $(".item").imagesLoaded(
    {
      background: true
    },
    function(masonry) {
      var container = document.querySelector("#masonry");
      var masonry = new Masonry(container, {
        columnWidth: 5,
        gutter: 8,
        itemSelector: ".item",
        fitWidth: true,
        initLayout: false
      });

      // then wait 4s to initialize grid to prevent collapse on load
      setTimeout(function() {
        masonry.layout();
      }, 3000);
    }
  );
});
