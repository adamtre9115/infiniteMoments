$(document).ready(function () {

    var quotes = [
        'In photography there is a reality so subtle that it becomes more real than reality.',
        'There is one thing the photograph must contain, the humanity of the moment.',
        'Taking an image, freezing a moment, reveals how rich reality truly is.',
        'Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever…',
        'We are making photographs to understand what our lives mean to us.',
        'A thing that you see in my pictures is that I was not afraid to fall in love with these people.',
        'Photography for me is not looking, it’s feeling.',
        'It’s one thing to make a picture of what a person looks like, it’s another thing to make a portrait of who they are.',
        'Moments can last forever...'
    ];

    // generate random quote for jumbotron tag
    function quote() {
        setInterval(function () {
            var num = Math.floor(Math.random() * quotes.length);
            $("#jumboTag").text(quotes[num]);
        }, 5000)

    }
    quote();

    // image lightbox
    var images = ["images/galleryImg1.jpg", "images/galleryImg2.jpg", "images/galleryImg3.jpg", "images/galleryImg4.jpg", "images/galleryImg5.jpg", "images/galleryImg6.jpg", "images/galleryImg7.jpg", "images/galleryImg8.jpg", "images/galleryImg9.jpg"];

    $(".item").on("click", function () {
        var imgSrc = $(this).attr("src");
        var caption = $(this).attr("alt");

        $(".modal-title").text(caption);
        $(".modalImg").attr("src", imgSrc);

        $("#exampleModal").modal("show");
    })

    // capture email inputs
    $("#sendMsg").on("click", function (e) {
        e.preventDefault();
        var name = $("#inputName").val().trim();
        var email = $("#inputEmail").val().trim();
        var message = $("#message").val().trim();

        var emailData = {
            name: name,
            email: email,
            message: message
        }

        //console.log(emailData);
        $.post("/message", emailData, function () {});
    })

})