
$(document).ready(function() {
    $("#pic2").hide();
    $("#gif").hide();

});

function saveUserData(userData){
    $.post('php/userData.php',
     {oauth_provider:'facebook',
     userData: JSON.stringify(userData)}, 
     function(data)
     { return true; });

}


function recall0(){
var timerDuration = 120 * 100;
var bar = $('.progressBar .progress').css('width', '100%').show();
bar.animate({width:"0%"}, timerDuration, 'linear', function() {
    recall1();
    minus();
});

}

function recall1(){
var timerDuration = 120 * 100;
var bar = $('.progressBar .progress').css('width', '100%').show();
bar.animate({width:"0%"}, timerDuration, 'linear', function() {
     recall2();
     minus();
});

}

function recall2(){
var timerDuration = 120 * 100;
var bar = $('.progressBar .progress').css('width', '100%').show();
bar.animate({width:"0%"}, timerDuration, 'linear', function() {
  
  minus();
});

}
           
            function Redirect0() {
           
        
            $("#pic2").show();
           
             
           $('.progressBar .progress').stop();

           setTimeout(function(){
                 $("#pic2").hide();
                   $("#gif").show();
            }, 2000);
            

             setTimeout(function(){
                  window.location="img2.html";
            }, 5000);
            
              
            }

            function Redirect1() {
              $("#pic2").show();
             
              
           $('.progressBar .progress').stop();
            setTimeout(function(){
                 $("#pic2").hide();
                   $("#gif").show();
            }, 2000);
            

             setTimeout(function(){
                  window.location="img3.html";
            }, 5000);
            }

            function Redirect2() {
                $("#pic2").show();
           $('.progressBar .progress').stop();
             setTimeout(function(){
                 $("#pic2").hide();
                   $("#gif").show();
            }, 2000);
            

             setTimeout(function(){
                  window.location="img4.html";
            }, 5000);
            }

            function Redirect3() {
               $("#pic2").show();
           $('.progressBar .progress').stop();
             setTimeout(function(){
                 $("#pic2").hide();
                   $("#gif").show();
            }, 2000);
            

             setTimeout(function(){
                  window.location="img5.html";
            }, 5000);
            }

            function Redirect4() {
                  $("#pic2").show();
           $('.progressBar .progress').stop();
             setTimeout(function(){
                 $("#pic2").hide();
                   $("#gif").show();
            }, 2000);
            

             setTimeout(function(){
                  window.location="win.html";
            }, 5000); 
            }

            function win() {
                //  window.location="index.html";
                 window.location="win.html";    
            }

             function gameover() {
                 window.location="index.html";    
            }

             function over() {
                 window.location="gameover.html";    
            }




            function listener0 (){
            
            document.getElementById("wrapper").style.cursor = "pointer";    
            document.getElementById('id01').style.display='block';    
            localStorage.setItem("life","3");
            document.getElementById("index").addEventListener("click", minus);   
            life();
            }

            function listener1 (){

            recall0();
            life();
            document.getElementById("img2").addEventListener("click", minus);
            }

            function listener2 (){
                
            recall0();
            life();
            document.getElementById("img3").addEventListener("click", minus);    
            }
            function listener3 (){
              
            recall0();
            life();
            document.getElementById("img4").addEventListener("click", minus);
            }
            function listener4 (){
                 
            recall0();
            life();
            document.getElementById("img5").addEventListener("click", minus);  
            }
           

   
           

            function minus() {
                var n= localStorage.getItem("life")
                var m=n-1;             
                console.log(m);
                localStorage.setItem("life",m);

                if(m==00){
                     over();
                }
              life();
            
    
            }

            function life(){
                
             document.getElementById("wrapper").style.cursor = "pointer";
              if(localStorage.getItem("life")===3){
             document.getElementById("first").style.visibility = "visible";
             document.getElementById("second").style.visibility = "visible";
             document.getElementById("third").style.visibility = "visible";
             }

             if(localStorage.getItem("life")==2){
             document.getElementById("first").style.visibility = "hidden";
             document.getElementById("second").style.visibility = "visible";
             document.getElementById("third").style.visibility = "visible";
             }   
             if(localStorage.getItem("life")==1){
              document.getElementById("first").style.visibility = "hidden";
             document.getElementById("second").style.visibility = "hidden";
             document.getElementById("third").style.visibility = "visible";
             }     

              if(localStorage.getItem("life")==0){
             document.getElementById("first").style.visibility = "hidden";
             document.getElementById("second").style.visibility = "hidden";
             document.getElementById("third").style.visibility = "hidden";
             } 
                
            }

   window.fbAsyncInit = function() {
    // FB JavaScript SDK configuration and setup
    FB.init({
      appId      : '1761769924086338', // FB App ID
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });
    
    // Check whether the user already logged in
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			//display user data
			getFbUserData();
			 
		}
	});
};

// Load the JavaScript SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Facebook login with JavaScript SDK
function fbLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            // Get and display the user profile data
            getFbUserData();

        //   document.getElementById("wrapper").style.visibility = "visible";
		//     document.getElementById("userData").style.visibility = "hidden";
		// 	  document.getElementById("status").style.visibility = "hidden";
        } else {
            document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
        }
    }, {scope: 'email'});
}

// Fetch the user profile data from facebook
function getFbUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,friendlists,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
        // document.getElementById('fbLink').setAttribute("onclick","fbLogout()");
        // document.getElementById('fbLink').innerHTML = 'Logout from Facebook';

        // document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.first_name + '!';
        // document.getElementById('userData').innerHTML = '<p><b>FB ID:</b> '+response.id+'</p><p><b>Name:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+'</p><p><b>Locale:</b> '+response.locale+'</p><p><b>Picture:</b> <img src="'+response.picture.data.url+'"/></p><p><b>FB Profile:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>';
      
     saveUserData(response);        
     document.getElementById('id01').style.display='none'
     recall0();
    });
}



// Logout from facebook
// function fbLogout() {
//     FB.logout(function() {
//         document.getElementById('fbLink').setAttribute("onclick","fbLogin()");
//         document.getElementById('fbLink').innerHTML = '<img src="fblogin.png"/>';
//         document.getElementById('userData').innerHTML = '';
//         document.getElementById('status').innerHTML = 'You have successfully logout from Facebook.';
//     });
// }
