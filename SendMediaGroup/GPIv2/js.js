  function clicked()
    {
        var APIkey='&key?=AIzaSyDeWdYRg1dANj40oxIN1e0L4fjQliTAkjQ&strategy=mobile';
        var xhr = new XMLHttpRequest();
        var url ='http://'+ document.getElementById("url").value;
        if(url == ""){alert("Please enter URL"); return;}

        xhr.open("GET", "https://www.googleapis.com/pagespeedonline/v1/runPagespeed?url="+
        encodeURIComponent(url)+APIkey);
        // xhr.open("GET", "https://www.googleapis.com/pagespeedonline/v3beta1/mobileReady?url="+
        // encodeURIComponent(url)+APIkey);
        xhr.onload = function(){
        var aaa=performance.now();
            if (xhr.status >= 200 && xhr.status < 400) {
            var data= JSON.parse(xhr.responseText);
            var passstat=data.score;
            var rank;
            
            if(passstat>=80){

                 rank='Passed'

            }else{
                 rank='Failed'
            }
            
            console.log(data);
            console.log('https://www.googleapis.com/pagespeedonline/v1/runPagespeed?url='+
        encodeURIComponent(url)+APIkey);          
            document.getElementById("site").innerHTML=data.id;
            document.getElementById("score").innerHTML=passstat;
            document.getElementById("rank").innerHTML=rank; 
            document.getElementById("start").innerHTML=aaa;  
            document.getElementById("end").innerHTML=performance.now();  
            document.getElementById("lapstime").innerHTML=(performance.now()-aaa);       
            } else {
            //    console.clear();              
               console.log(url+' '+'Did not responce');

            }

            
        }
        xhr.send();
    }
    