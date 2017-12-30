$(window).on('load',function() {
  $(".new-button").on('click',function(){

    //toggle class here in future
    $(this).parents(".main").find('.res-form').css({"display": "block"});

  });

  $(".res-form .submit").on('click',function(){

    var form = $('.res-form');
    var message = $("#resolution").val();
    var html = '<div class="card"><h2>'+ message +'</h2></card>';
    $(".main").append(html);
    //toggle class here in future
    form.css({"display": "none"});
    $("#resolution").val("");
  });
});
