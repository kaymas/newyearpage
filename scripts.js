// Initialize Firebase
var config = {
  apiKey: "AIzaSyB_RG7naDkJ8Lw8sSGpoVaFvTSch6uifPw",
  authDomain: "newyear-page.firebaseapp.com",
  databaseURL: "https://newyear-page.firebaseio.com",
  projectId: "newyear-page",
  storageBucket: "",
  messagingSenderId: "850752388453"
};
firebase.initializeApp(config);

$(window).on('load',function() {

  var firstTime = true;

  //Refernce to the firebase database
  var database = firebase.database();

  function writeUserData(message){
    database.ref("newyear-page").push().set({
      message: message
    }).then(function(){
      console.log("status saved!");
    }).catch(function(error){
      console.log("ERROR : " + error);
    });
  }

  function addElementToPage(message){
    if(firstTime){
      firstTime = false;
      $('.initalElement').css("display","none");
    }
    var html = '<div class="card"><h2>'+ message +'</h2></card>';
    $(".main").append(html);
  }

  database.ref("newyear-page").once("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var data = childSnapshot.val();
      var message = data.message;
      addElementToPage(message);
    });
  });

  $(".new-button").on('click',function(){

    //anonymous login check
    firebase.auth().onAuthStateChanged(function(firebaseUser){
      if(firebaseUser){
        console.log("user logged in");
      }else {
        firebase.auth().signInAnonymously();
      }
    });

    $(this).parents(".main").find('.res-form').toggleClass("fade-in");
    // $(this).parents(".main").find('.res-form').css({"display": "block"});

  });

  $(".res-form .submit").on('click',function(){

    var form = $('.res-form');
    var message = $("#resolution").val();
    writeUserData(message);
    addElementToPage(message);

    form.addClass("is-sent");
    setTimeout(function(){
      form.removeClass('is-sent');
      form.removeClass('fade-in');
    },1000);
    // form.css({"display": "none"});
    $("#resolution").val("");
  });
});
