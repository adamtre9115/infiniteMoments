$(document).ready(function() {
  
  // capture all contact values for email
  $("#submit").on("click", function(e) {
    e.preventDefault();
    const name = $("#name")
      .val()
      .trim();
    const email = $("#email")
      .val()
      .trim();
    const session = $("#session")
      .val()
      .trim();
    const comments = $("#comments")
      .val()
      .trim();

    // create object of info to send to server
    const data = {
      name: name,
      email: email,
      session: session,
      comments: comments
    };

    // post to server
    $.post("/mail", data, function() {});

    // reset input fields
    $("#name").val("");
    $("#email").val("");
    $("#session").val("Graduation");
    $("#comments").val("");
  });

  // handle year in copyright
  const year = document.querySelector(".footer");
  const date = new Date();
  year.innerHTML = `&copy;${date.getFullYear()} `;
});
