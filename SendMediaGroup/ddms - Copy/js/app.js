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


// define application
angular.module("crudApp", [])
.controller("userController", function($scope,$http){
    $scope.users = [];
    $scope.tempUserData = {};
    // function to get records from the database
    $scope.getRecords = function(){

        $http.get('php/action.php', {
            params:{
                'type':'view'
            }
        }).success(function(response){
            if(response.status == 'OK'){
                $scope.users = response.records;
            }
        });

        
    };
    
    // function to insert or update  data to the database
    $scope.saveData = function(type){
        
        var data = $.param({
            'data':$scope.tempUserData,
            'type':type
        });
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        
 $http.post("php/action.php", data, config).success(function(response){
         

         
            if(response.status == 'OK'){

                  
        
                if(type == 'edit'){
                

                    $scope.users[$scope.index].id = $scope.tempUserData.id;

                    $scope.users[$scope.index].SiteName = response.data.SiteName;

                    $scope.users[$scope.index].url = $scope.tempUserData.url;

                    $scope.users[$scope.index].stat = $scope.tempUserData.stat;
                    $scope.users[$scope.index].rank = $scope.tempUserData.rank;
                    $scope.users[$scope.index].created = $scope.tempUserData.created;
                }else{

               

                    $scope.users.push({
                        id:response.data.id,

                        SiteName:response.data.SiteName,

                        url:response.data.url,

                        stat:response.data.stat,
                        rank:response.data.rank,
                        created:response.data.created
                    });
                    
                }
                $scope.userForm.$setPristine();
                $scope.tempUserData = {};
                $('.formData').slideUp();
                $scope.messageSuccess(response.msg);
            }else{
                $scope.messageError(response.msg);
            }
        });


    };
    
    // function to add  data
    $scope.addData = function(){
      
        $scope.saveData('add');
    };
    
    // function to edit  data
    $scope.editUser = function(user){
        $scope.tempUserData = {
            id:user.id,
            SiteName:user.SiteName,

            url:user.url,

            stat:user.stat,
            rank:user.rank,
            created:user.created
        };
        $scope.index = $scope.users.indexOf(user);
        $('.formData').slideDown();
    };
    
    // function to update  data
    $scope.updateUser = function(){
        $scope.saveData('edit');
    };
    
    // function to delete  data from the database
    $scope.deleteUser = function(user){
        var conf = confirm('Are you sure to delete the user?');
        if(conf === true){
            var data = $.param({
                'id': user.id,
                'type':'delete'    
            });
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }    
            };
            $http.post("php/action.php",data,config).success(function(response){
                if(response.status == 'OK'){
                    var index = $scope.users.indexOf(user);
                    $scope.users.splice(index,1);
                    $scope.messageSuccess(response.msg);
                }else{
                    $scope.messageError(response.msg);
                }
            });
        }
    };
    
    // function to display success message
    $scope.messageSuccess = function(msg){
        $('.alert-success > p').html(msg);
        $('.alert-success').show();
        $('.alert-success').delay(5000).slideUp(function(){
            $('.alert-success > p').html('');
        });
    };
    
    // function to display error message
    $scope.messageError = function(msg){
        $('.alert-danger > p').html(msg);
        $('.alert-danger').show();
        $('.alert-danger').delay(5000).slideUp(function(){
            $('.alert-danger > p').html('');
        });
    };




$scope.startnow=function(){




 readTextFile0("js/url.json", function(text){
var data0 = JSON.parse(text);

var request = new XMLHttpRequest();
var googleAPI="https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=";
var siteURL="http://"; 
var i=0;  
var max=1001;
var key='&key=AIzaSyCPFRwvYYi5ASk2g9-RMIztcYSUMo2q_Gc&'+'strategy=mobile';
var counter = 60;

var lapsetime = setInterval(function(){  
   
    document.getElementById("onprocess").innerHTML=data0[i].url;
    document.getElementById("lapsetime").innerHTML=counter;

if( counter=='0' ){
counter = 60;
console.log(data0[i].url);

$scope.tempUserData.SiteName=data0[i].url;
$scope.tempUserData.url='http://'+data0[i].url;
$scope.tempUserData.stat='Skip';
$scope.tempUserData.rank='Skip';
$scope.addData();

    i++;
    
}


counter--;

}, 1000);



var intervalko = setInterval(function(){          
   
if(i !==max){
var jm=googleAPI+siteURL+data0[i].url+key;
var cursite=data0[i].url;
var trim=cursite.substring(0, cursite.indexOf('?'));
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




    console.log(jm);

counter=60;
console.log('Url:'+data.id+' '+'Rank:'+stat+' '+'Score:'+data.ruleGroups.USABILITY.score);
       

$scope.tempUserData.SiteName=trim;
$scope.tempUserData.url=siteURL+data0[i].url;
$scope.tempUserData.stat=stat;
$scope.tempUserData.rank=data.ruleGroups.USABILITY.score;


  
  $scope.addData();



    } else{

counter=60;

console.log(cursite+' '+'Did not responce');
$scope.tempUserData.SiteName=trim;
$scope.tempUserData.url=siteURL+data0[i].url;
$scope.tempUserData.stat='Error';
$scope.tempUserData.rank='Error';
 
$scope.addData();


  }
i++;
};
 request.send();
    }else{
         clearInterval(intervalko);
        clearInterval(lapsetime);
        console.log('max crawl reach its just set to '+max)
       
        request.abort();
    }

$scope.stopnow=function(){
clearInterval(lapsetime);
clearInterval(intervalko);
request.abort();

}       
     
}, 3000);



});



}



});






   






