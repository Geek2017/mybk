function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

    readTextFile("js/url.json", function(text){
    var data = JSON.parse(text);
    var i=0;
     setInterval(function(){          
    i++
    // for (i = 0; i <=50; i++) {     
if(i<=10){
// i++;
      console.log(i);  
      console.log(data[i]);
      console.log(data[i].url);
      document.getElementById("test").innerHTML=data[i].url;
}
    // }
     
     
}, 2000);
});


//  document.getElementById("d").style.visibility = "hidden";
//  document.getElementById("s").style.visibility = "hidden";
//  document.getElementById("sc").style.visibility = "hidden";

// setInterval(function(){ 

// function readTextFile(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }

//   readTextFile("js/url.json", function(text){
//     var file = JSON.parse(text);
//     var i=0;
// if(i<=10){
// i++;     
// }
    


var request = new XMLHttpRequest();
var googleAPI="https://www.googleapis.com/pagespeedonline/v3beta1/mobileReady?url=";
var siteURL="http://"; 
var jm=googleAPI+siteURL+file[i].url;

var thesite=siteURL+file[i].url;

request.open('GET',jm, true);
request.send();
request.onload = function() {
    
    var data = JSON.parse(request.responseText);

    document.getElementById("loading").style.visibility = "hidden"; 

    document.getElementById("d").style.visibility = "visible";
    document.getElementById("s").style.visibility = "visible";
    document.getElementById("sc").style.visibility = "visible";

	document.getElementById("domain").innerHTML =thesite;
	document.getElementById("stat").innerHTML =data.ruleGroups.USABILITY.pass;
    document.getElementById("score").innerHTML =data.ruleGroups.USABILITY.score;
 console.log(file[1].url);
 console.log(data.ruleGroups.USABILITY.pass);
 console.log(data.ruleGroups.USABILITY.score);
};


});
}, 1000);

