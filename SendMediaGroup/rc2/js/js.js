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
   var max=5000;
   var key='&key=AIzaSyCPFRwvYYi5ASk2g9-RMIztcYSUMo2q_Gc&'+'strategy=mobile';

//    setInterval(function(){  
//     var today = new Date();

//     var min = today.getMinutes();
//     var sec = today.getSeconds();
//     var mil = today.getMilliseconds();
//     document.getElementById("lapsetime").innerHTML=min+':'+sec;
// }, 1000);

// var dur=3;
// var intervalkoto = setInterval(function(){  
//     if(dur<=60){
//         dur--;
//         document.getElementById("lapsetime").innerHTML=dur;
//     }
//     if(dur===0){
//         alert('skipped it');
//         clearInterval(intervalko);
//         clearInterval(intervalkoto);
//          i++;
//         console.log(data0[i].url);
       
        
//     }

    
// }, 1000);



var intervalko = setInterval(function(){          
   
if(i !==max){
var jm=googleAPI+siteURL+data0[i].url+key;
var cursite=data0[i].url;
var stat;
request.open('GET',jm, true);
if(request.status==='(canceled)'){
console.log(request.status);
}
request.onload = function() {  
if(request.status==='(canceled)'){
console.log(request.status);
}

if (request.status >= 200 && request.status < 400) {
  var data = JSON.parse(request.responseText);
  


  if(data.ruleGroups.USABILITY.score>80){
      stat='Passed';
  }else{
      stat='Failed';
  }




    // console.log(data);
      console.log('Url:'+data.id+' '+'Rank:'+stat+' '+'Score:'+data.ruleGroups.USABILITY.score);
         
    document.getElementById("progress").innerHTML=i+' '+'Out of'+' '+max;
    document.getElementById("domain").innerHTML=data.id;
    document.getElementById("stat").innerHTML=stat;
    document.getElementById("score").innerHTML=data.ruleGroups.USABILITY.score;
  console.log(jm);
    
    } else{                 
               console.log(cursite+' '+'Did not responce');
               document.getElementById("domain").innerHTML=cursite;
               document.getElementById("stat").innerHTML='Error';
               document.getElementById("score").innerHTML='Error';
               document.getElementById("progress").innerHTML=i+' '+'Out of'+' '+max;
               
  }
i++;
};

    }else{
        console.log('max crawl reach its just set to '+max)
        clearInterval(intervalko);
    }   
      request.send();
}, 3000);



});






