
window.fbAsyncInit = function() {
// init the FB JS SDK
  FB.init({
    appId      : '567730143256574', // App ID from the App Dashboard
    channelUrl : '://skill.herokuapp.com/channel.html', // Channel File for x-domain communication
    status     : true, // check the login status upon init?
    cookie     : true, // set sessions cookies to allow your server to access the session?
    xfbml      : true  // parse XFBML tags on this page?
  });

  jQuery(function(){

   // Additional initialization code such as adding Event Listeners goes here

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {

       FB.api('/me', function(response) {
          $(".nombre").append(response.name );
          $(".imagen").attr({src: "https://graph.facebook.com/"+response.id+"/picture"});
  });
    } else if (response.status === 'not_authorized') {
      alert("no conectado");
    } else {
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=567730143256574";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
   });


    $("#login").click(
      function(e){

        FB.login(function(response) {
         if (response.authResponse) {
           console.log('Welcome!  Fetching your information.... ');
           FB.api('/me', function(response) {
             console.log('Good to see you, ' + response.name + '.');
           });
            FB.api('/me', function(response) {
              $("#nombre").append('Your name is ' + response.name);
              $("#nombre").append('Your name is ' + response.id);


            });


         } else {
           console.log('User cancelled login or did not fully authorize.');
         }
       });
     });
    $("#salir").click(
        function(e){

          FB.logout();  

        }

      );
    $("#estado").click(
        function(e){

          FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              // connected
            } else if (response.status === 'not_authorized') {
              // not_authorized
            } else {
              // not_logged_in
            }
           });


        }

      );

  });

};

// Load the SDK's source Asynchronously
// Note that the debug version is being actively developed and might 
// contain some type checks that are overly strict. 
// Please report such bugs using the bugs tool.
(function(d, debug){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
   ref.parentNode.insertBefore(js, ref);
 }(document, /*debug*/ false));


