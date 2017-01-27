function readTextFile0(file, callback) {
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

    readTextFile0("js/url.json", function(text){
var data0 = JSON.parse(text);

var request = new XMLHttpRequest();
var googleAPI="https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=";
var siteURL="http://"; 
   var i=0; 
   var key='&key=AIzaSyCn4BITCxgfizv40i0dXSZwVJErhdgVgIA';
   var max=5;

   var interval='1000';
 var intervalko = setInterval(function(){          
   
    if(i !==max){


var jm=googleAPI+siteURL+data0[i].url+key;
request.open('GET',jm, true);


request.onload = function() {  
i++    
if (request.status >= 200 && request.status < 400) {
  var data = JSON.parse(request.responseText); 

  
 console.log(data.ruleGroups.USABILITY);  

  } else {
   console.log(data0[i].url+' '+'error');

  }



};
request.onerror = function() {
    alert('error');
};

request.send();
    }else{
        console.log('max crawl reach its just set to '+max)
       clearInterval(intervalko);
    }   
      
}, interval);



});






