$(document).ready(function(){



  
$(".addcomment").on("click", function(e){

  e.preventDefault();

  var thisid = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/stories/" + thisid,
    data: {
      author : $("#author").val().trim(),
      body: $("#body").val().trim()
    }
  }).then(function(data){
    console.log(data);
   
  });
});


});

