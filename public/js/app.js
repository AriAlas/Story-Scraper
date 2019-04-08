$(document).ready(function(){



  
$(".addcomment").on("click", function(e){

  e.preventDefault();


var data = {
  author: $(".author").val().trim(),
  body: $(".body").val().trim() 
}

console.log("this is the data",data);

  var thisid = $(this).attr("data-id");

  $(".commentsdump").append("<h5>"+ data.author +"</h5><p>"+ data.body + "</p>");

  $.ajax({
    method: "POST",
    url: "/stories/" + thisid,
    data: data
    
  }).then(function(data){

  });
});




});

