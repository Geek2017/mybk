function saveUserData(userData){
    $.post('php/userData.php',
     {oauth_provider:'facebook',
     userData: JSON.stringify(userData)}, 
     function(data)
     { return true; });

}
var tm=1000;
$(document).ready(function() {



   $('#myModal').modal({backdrop: 'static', keyboard: false}) 
   $('#myModal').modal('show');

});


function call(){


               	function progress(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').animate({ width: progressBarWidth }, 
	timeleft === timetotal ? 0 : 1000, 'linear');

    if(timeleft >= '0') {
      var timer= setTimeout(function() {
            progress(timeleft - 1, timetotal, $element);
			// console.log(timeleft+":"+timetotal);
        }, tm);
    }
	else{
		alert('Game Over!');		
		
	}

};

progress(30, 30, $('#progressBar'));
                

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
     $('#myModal').modal('hide');
    //  call();

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


function refresh(){
location.reload();
}



function FindPosition(oElement)
{
  if( typeof( oElement.offsetParent ) != "undefined" )
  {
    for( var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent )
    {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
    return [ posX, posY ];
  }
  else
  {
    return [ oElement.x, oElement.y ];
  }
}
 var l="3";
function GetCoordinates(e)
{
 var myImg0 = document.getElementById("myImgId0");
 var myImg1 = document.getElementById("myImgId1");
 var myImg2 = document.getElementById("myImgId2");

 var PosX = 0;
 var PosY = 0;
 var ImgPos;
 ImgPos = FindPosition(myImg0) || FindPosition(myImg1) ||  FindPosition(myImg2);
 if (!e) var e = window.event;
 if (e.pageX || e.pageY)
 {
  PosX = e.pageX;
  PosY = e.pageY;
 }
 else if (e.clientX || e.clientY)
   {
    PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
 }
 PosX = PosX - ImgPos[0];
 PosY = PosY - ImgPos[1];
 document.getElementById("x").innerHTML = PosX;
 document.getElementById("y").innerHTML = PosY;


document.getElementById("life").innerHTML = l; 

// if( document.getElementById("myImgId0").style.visibility = "visible" && 
//     PosX===83 || 
//     PosX===82 ||   
//     PosX===81 || 
//     PosX===72 ||
//     PosX===80 || 
//     PosX===79 ||
//     PosX===78 ||
//     PosX===77 ||
//     PosX===76 ||
//     PosX===75 ||
//     PosX===74 ||
//     PosX===73 ||
//     PosX===72 || 
//     PosX===71 ||
//     PosX===70 ||
//     PosX===69 ||
//     PosX===68 ||
//     PosX===67 ||
//     PosX===66 || 
//     PosX===65 ||
//     PosX===64 ||
//     PosX===65 ||
//     PosX===64 ||
//     PosX===63 ||
//     PosX===62 ||
//     PosX===61 ||
//     PosX===60 

    
// ){
    
// localStorage.setItem("data","2"); 
// document.getElementById("myImgId0").style.visibility = "hidden";  
// document.getElementById("myImgId1").style.visibility = "visible";  
// }


if( document.getElementById("myImgId1").style.visibility = "visible" &&  
    PosX===40 ||
    PosX===39 ||
    PosX===37 ||
    PosX===36 ||
    PosX===35 ||
    PosX===34 ||
    PosX===33 ||
    PosX===32 ||
    PosX===31 
    
){
    
localStorage.setItem("data","3"); 
document.getElementById("myImgId1").style.visibility = "hidden";  
document.getElementById("myImgId2").style.visibility = "visible"; 

}

if( document.getElementById("myImgId2").style.visibility = "visible" &&  
    PosX===	360	|| 
    PosX===	361	|| 
    PosX===	362	|| 
    PosX===	363	|| 
    PosX===	364	|| 
    PosX===	365	|| 
    PosX===	366	|| 
    PosX===	367	|| 
    PosX===	368	|| 
    PosX===	369	|| 
    PosX===	370	|| 
    PosX===	371	|| 
    PosX===	372	|| 
    PosX===	373	|| 
    PosX===	374	|| 
    PosX===	375	|| 
    PosX===	376	|| 
    PosX===	377	|| 
    PosX===	378	|| 
    PosX===	379	|| 
    PosX===	380	|| 
    PosX===	381	|| 
    PosX===	382	|| 
    PosX===	383	|| 
    PosX===	384	|| 
    PosX===	385	

    
    
){
    
refresh();

}

// else if (localStorage.getItem("data")==1 &&  
//    !( PosX===83 || 
//     PosX===82 ||   
//     PosX===81 || 
//     PosX===72 ||
//     PosX===80 || 
//     PosX===79 ||
//     PosX===78 ||
//     PosX===77 ||
//     PosX===76 ||
//     PosX===75 ||
//     PosX===74 ||
//     PosX===73 ||
//     PosX===72 || 
//     PosX===71 ||
//     PosX===70 ||
//     PosX===69 ||
//     PosX===68 ||
//     PosX===67 ||
//     PosX===66 || 
//     PosX===65 ||
//     PosX===64 ||
//     PosX===65 ||
//     PosX===64 ||
//     PosX===63 ||
//     PosX===62 ||
//     PosX===61 ||
//  PosX===60) ){
// minus();
// document.getElementById("life").innerHTML = l; 
// }

if (localStorage.getItem("data")==2 &&  
   !( PosX==40 ||
      PosX==39 ||
      PosX==37 ||
      PosX==36 ||
      PosX==35 ||
      PosX==34 ||
      PosX==33 ||
      PosX==32 ||
      PosX==31


   ) ){
minus();

document.getElementById("life").innerHTML = l; 


}







function minus(){
l--;
if (l===2){
document.getElementById("third").style.visibility = "hidden";
}
if(l===1){
document.getElementById("second").style.visibility = "hidden";
}

if(l===0){
document.getElementById("first").style.visibility = "hidden";
alert('game over!');
refresh();
}
}

}

function listener(){

localStorage.setItem("data","1");
 
document.getElementById("page").style.cursor = "crosshair";
document.getElementById("page").addEventListener("click", GetCoordinates);

document.getElementById("myImgId1").style.visibility = "hidden";
document.getElementById("myImgId2").style.visibility = "hidden";   
}