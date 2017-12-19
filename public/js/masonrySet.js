$(document).ready(function () {
    var container = document.querySelector('#masonry');
    var masonry = new Masonry(container, {
        columnWidth: 15,
        gutter: 5,
        itemSelector: '.item'
    });
})