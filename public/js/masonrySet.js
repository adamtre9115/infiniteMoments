$(document).ready(function () {
    // var container = document.querySelector('#masonry');
    // var masonry = new Masonry(container, {
    //     columnWidth: 5,
    //     gutter: 8,
    //     itemSelector: '.item',
    //     fitWidth: true
    // });


    $('.item').imagesLoaded({
        background: true
    }, function (masonry) {
        var container = document.querySelector('#masonry');
        var masonry = new Masonry(container, {
            columnWidth: 5,
            gutter: 8,
            itemSelector: '.item',
            fitWidth: true
        });
    });
})