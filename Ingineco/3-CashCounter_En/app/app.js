var app = angular.module('angularTable', ['angularUtils.directives.dirPagination']);
app.controller('listdata', function($scope, $http, $filter) {

$scope.setview();


localStorage.setItem('state','coin');
$scope.coinf=function(){
$scope.search=$scope.list+'c';
$scope.copy=$scope.list+'c';
$scope.modal=false;
$scope.input=true;
$scope.c102 =false ;
$scope.c101 = true;
$scope.myFunct1();
localStorage.setItem('state','Notes');
}

$scope.notesf=function(){
$scope.search=$scope.list+'p';
$scope.copy=$scope.list+'p';
$scope.c1=false;
$scope.p1=true;
$scope.showme=false;
$scope.c102 = true;
$scope.c101 = false;
$scope.modal=false;
$scope.input=true;
$scope.myFunct1();
localStorage.setItem('state','Total');
}

$scope.totalf=function(){
$scope.calc();
$scope.ShowHide();
$scope.modal=true;

}


$scope.users = [];

$http.get("app/data.json").success(function(response) {

$scope.users = response;

// var i;
// var i2=0;
// var get=localStorage.getItem('Cur')+'p';

// for ( i = 0; i < response.length; i++) {
//     if(response[i].type===get){
//      i2= i2+response[i].enabled*1;
//     }
// }

// console.log(i2);

//    console.log(response[0].money_value);
//    console.log(response[7].money_value);

});



var msg = document.getElementById('state-msg');
document.body.addEventListener('keydown', function(e) {

    if(e.keyCode===13 && localStorage.getItem('view')==='cmc'){

    $scope.movef();

    }

    if(e.keyCode===48 && localStorage.getItem('view')==='main'){

    $scope.ito0();

    }
    if(e.keyCode===190 && localStorage.getItem('view')==='main'){
    $scope.ito1();
    }
    if(e.keyCode===13 && localStorage.getItem('view')==='main'){
    $scope.ito2();
    }
    if(e.keyCode===8) {
    $scope.reset();
    }

});

$scope.moveb=function(){
    if($scope.currentPage !== 0 ){
    $scope.currentPage-=1;
        if($scope.currentPage < 1 ){
        $scope.currentPage=1;
        }
    }
}

$scope.movef=function(){


    if($scope.currentPage !== $scope.filteredData1){
       $scope.currentPage+=1;
    }
    else if($scope.currentPage === $scope.filteredData1 && localStorage.getItem('state')==='coin'){

        $scope.notesf();
            }
        else if($scope.currentPage ===  $scope.filteredData1 && localStorage.getItem('state')==='Total'){
        $scope.totalf();
                }


}

$scope.myFunct1 = function() {
        $scope.currentPage=1;
}


$scope.counted = $scope.users.length;



      $scope.$watch("search", function(query){
        $scope.filteredData = $filter("filter")($scope.users, query);
        $scope.filteredData1=  $scope.filteredData.length
      });




$scope.currentPage =1;
$scope.pageSize = 1;


  $scope.resetPage = function() {
      $scope.currentPage = 1;


  };

$scope.input = true;

$scope.ShowHide = function () {
$scope.input = $scope.input ? false : false;
}

$scope.c101=true;
$scope.c102=false;

$scope.print = function() {
window.print();
$scope.cbt = false;
};
$scope.thedate=moment().format("YYYY-MM-DD");
$scope.thetime=moment().format("HH:mm:ss");

$scope.calc = function() {

var t11 = '0';
var t2 = '0';
var t3 = '0';
var coin=0;
var notes=0;
var cmt=0;

var nmt=0;
for (var key in sessionStorage) {

if (key >= $scope.gt && key <= $scope.lt ){
coin = coin * 1 + (key * sessionStorage[key].replace(/['"]+/g, '') ) ;
localStorage.setItem('1Notes', coin+' '+$scope.list);
}

if (key >= $scope.gt1 && key <= $scope.lt1){
notes = notes * 1 + (key * sessionStorage[key].replace(/['"]+/g, '') ) ;
localStorage.setItem('2Coin', notes+' '+$scope.list);
localStorage.setItem('3Total',(coin+notes+' '+$scope.list));
}

if (key >= $scope.gt && key <= $scope.lt){
cmt +=(sessionStorage[key].replace(/['"]+/g, '')*1);
}

if (key >= $scope.gt1 && key <= $scope.lt1){
nmt +=(sessionStorage[key].replace(/['"]+/g, '')*1);
}



}

$scope.t1 = (coin+notes);
$scope.t2 = (coin);
$scope.t3 = (notes);
$scope.t4 = (cmt);
$scope.t5 = (nmt);

var date = new Date();
var time;
time = $filter('date')(new Date(), 'hh:mm:ss a');

$scope.todoTime = time;
$scope.todoDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);



$scope.todoCoin =  coin.toFixed(2);
$scope.todoNotes = notes.toFixed(2);;
$scope.todoTotal = (coin+notes);
}

});


var sessionStorageService = function($scope) {
this.storageType = 'sessionStorage';

var sessionStorageService = function() {
this.storageType = 'sessionStorage';

this.get = function(name) {

try {
var raw = window.sessionStorage[name];

if (raw && raw !== 'undefined' && raw !== 'null') {

var parsed = JSON.parse(raw);
if (!parsed) return null;
return parsed;
}
} catch (ex) {
console.log('Exception ' + ex);
}
return null;
};

this.set = function(name, value, $route) {

var vm = this;
vm.relaodData = function() {
$route.reload();
}

var raw = window.sessionStorage[name];
console.log("before setter:" + raw);

var sessionObject = !!(raw) && raw !== 'undefined' && raw !== 'null' ? JSON.parse(raw) : {};

if (value && sessionObject.value !== 'undefined') {
sessionObject = value;
} else {
delete sessionObject[name];
}

var serialized = JSON.stringify(sessionObject);

console.log('serialized in setter to :' + serialized);

console.log('serialized' + sessionObject[name]);
window.sessionStorage.setItem(name, JSON.stringify(sessionObject));

};

};

app.factory('sessionStorage', function() {
return new sessionStorageService();
});

var StorageExampleCtrl = function($scope, sessionStorage) {

$scope.userKey, $scope.userValue;
$scope.storageKeys = sessionStorage.getKeys();
$scope.get = sessionStorage.get;
$scope.set = function() {

sessionStorage.set($scope.userKey, $scope.userValue);
$scope.storageKeys = sessionStorage.getKeys();
$scope.userKey = '';
$scope.userValue = '';

};
};
this.get = function(name) {

try {
var raw = window.sessionStorage[name];

if (raw && raw !== 'undefined' && raw !== 'null') {

var parsed = JSON.parse(raw);
if (!parsed) return null;
return parsed;
}
} catch (ex) {
console.log('Exception ' + ex);

}
return null;

};

this.set = function(name, value, $route) {

var raw = window.sessionStorage[name];
console.log("before setter:" + raw);

var sessionObject = !!(raw) && raw !== 'undefined' && raw !== 'null' ? JSON.parse(raw) : {};

if (value && sessionObject.value !== 'undefined') {
sessionObject = value;
} else {
delete sessionObject[name];
}

var serialized = JSON.stringify(sessionObject);
console.log('serialized in setter to :' + serialized);

console.log('serialized' + sessionObject[name]);
window.sessionStorage.setItem(name, JSON.stringify(sessionObject));

};

this.clear = function() {
sessionStorage.clear();
};

this.getKeys = function() {
var keys = [];
for (var i = 0; i < sessionStorage.length; i++) {
keys.push(sessionStorage.key(i));

}
return keys;
};



};


app.factory('sessionStorage', function() {

return new sessionStorageService();

});

var StorageExampleCtrl = function($scope, sessionStorage) {

$scope.userKey, $scope.userValue;
$scope.storageKeys = sessionStorage.getKeys();
$scope.get = sessionStorage.get;

$scope.set = function() {
if($scope.val==0){
    $scope.val='';
}
if($scope.val>0){
sessionStorage.set($scope.userKey, $scope.userValue);
$scope.storageKeys = sessionStorage.getKeys();
$scope.userKey = '';
}

};

};

app.controller('MainCtrl', function($scope) {

$scope.validValues = ['0', '1', '3', '2', '4', '5', '6', '7', '8', '9'];
});

app.directive('myValidator', function($parse) {

return {

scope: {
validValues: '=validValues'

},

link: function(scope, elm, attrs) {
elm.bind('keypress', function(e) {
var char = String.fromCharCode(e.which || e.charCode || e.keyCode),
matches = [];
angular.forEach(scope.validValues, function(value, key) {
if (char === value) matches.push(char);
}, matches);
if (matches.length == 0) {
e.preventDefault();
return false;
}
});

}
}
});

app.controller('Ctrl', function($scope) {
$scope.startDate = localStorage.getItem('StartDate');
$scope.endDate = localStorage.getItem('EndDate');

$scope.getn = function() {

$scope.startDate = moment().format("YYYY-MM-DD");
$scope.endDate = moment().format("YYYY-MM-DD");

$scope.std=$scope.startDate;
$scope.edt=$scope.endDate;

};

$scope.get3 = function() {
$scope.startDate = moment().subtract(3, "days").format("YYYY-MM-DD");
$scope.endDate = moment().subtract(1, "days").format("YYYY-MM-DD");
$scope.std=$scope.startDate;
$scope.edt=$scope.endDate;
};

$scope.get7 = function() {
$scope.startDate = moment().subtract(7, "days").format("YYYY-MM-DD");
$scope.endDate = moment().subtract(1, "days").format("YYYY-MM-DD");
};

$scope.get30 = function() {
$scope.startDate = moment().subtract(1, "month").format("YYYY-MM-DD");
$scope.endDate = moment().subtract(1, "days").format("YYYY-MM-DD");
};

});

app.filter("myfilter", function($filter) {
return function(items, from, to) {
return $filter('filter')(items, "Date", function(v) {
var date = moment(v);
return date >= moment(from) && date <= moment(to);
});
};
});




function StorageController($scope,$filter) {

$scope.reset1 = function(keyname) {
window.localStorage.removeItem('tblstorage');
window.localStorage.removeItem('StartDate');
window.localStorage.removeItem('EndDate');
window.location.reload();
}

$scope.saved = localStorage.getItem('tblstorage');
$scope.tblstorage = (localStorage.getItem('tblstorage') !== null) ? JSON.parse($scope.saved) : [];
localStorage.setItem('tblstorage', JSON.stringify($scope.tblstorage));

$scope.addTodo = function() {

var sknv='';
var sknv0='';
var sknv1='';
var skv='';
var product='';

for (var key in sessionStorage) {

if(key >= $scope.gt && key <= $scope.lt ){
    sknv += key +'x'+ sessionStorage[key].replace(/['"]+/g, '') +'='+Math.round(key * sessionStorage[key].replace(/['"]+/g, '')* 100)/100+' '+localStorage.getItem('Cur')+'\n';

}
else if(key >= $scope.gt1 && key <= $scope.lt1 ){
  skv  += key +'x'+ sessionStorage[key].replace(/['"]+/g, '') +'='+Math.round(key * sessionStorage[key].replace(/['"]+/g, '')* 100)/100+' '+localStorage.getItem('Cur')+'\n';

}
}
console.log(sknv+'Coin');
console.log(skv+'Note');

$scope.todoCsum=sknv;
$scope.todoPsum=skv;

$scope.todoCoin=$filter('number')($scope.todoCoin, 2);
$scope.todoNotes=$filter('number')($scope.todoNotes, 2);
$scope.todoTotal=$filter('number')($scope.todoTotal, 2);


$scope.tblstorage.push({
Time: $scope.todoTime,
Date: $scope.todoDate,
Coin: $scope.todoCoin+' '+$scope.list,
CoinSummary:$scope.todoCsum,
Notes: $scope.todoNotes+' '+$scope.list,
NotesSummary:$scope.todoPsum,
Total: $scope.todoTotal+' '+$scope.list

});
alert('Saved');

$scope.todoTime = '';
$scope.todoDate = '';
$scope.todoCoin = '';
$scope.todoNotes = '';
$scope.todoComputation = '';
$scope.todoTotal = '';




localStorage.setItem('tblstorage', JSON.stringify($scope.tblstorage));
};

}

function HistoryController($scope) {

$scope.allow = function() {
    alert('Function Under development')
}



$scope.SandEdate = function() {

localStorage.setItem('StartDate',
$scope.startDate);
localStorage.setItem('EndDate',
$scope.endDate);

};

}

function CurrencyController($scope,$window) {

//  if(localStorage.getItem("Cur")===null  ){
// localStorage.setItem("Cur",'EUR')
//  }


$scope.ito2= function() {
localStorage.setItem('view','sit')
$scope.settings=true;
$scope.h0=false;
$scope.bk=true;
$scope.history=false;
}

$scope.ito1= function() {
localStorage.setItem('view','his')
$scope.history=true;
$scope.h0=false;
$scope.bk=true;

}

$scope.ito0= function() {
    localStorage.setItem(('view'),'cmc')

 if(localStorage.getItem("Cur")===null  ){
    confirm("Please set your currency");
    $scope.settings=true;
    $scope.h0=false;
    $scope.bk=true;
    $scope.history=false;
    $scope.h1=false;
    $scope.cur=true;
    $scope.settings=false;
}else{

    $scope.tabs=true;
    $scope.h1=true;
    $scope.dir=true;
    $scope.h0=false;
    $scope.search=$scope.list+'c';
    $scope.copy=$scope.list+'c';
    $scope.history=false;
    $scope.bk=true;
}

};

$scope.date = moment().format('h:mm A ');
$scope.time = moment().format('MM.DD.YY');
localStorage.setItem('StartDate',moment().format("YYYY-MM-DD"));
localStorage.setItem('EndDate',moment().format("YYYY-MM-DD"));

$scope.setFocus = function() {
 var element = $window.document.getElementById("val");
 element.focus();

};

$scope.setview=function(){
localStorage.setItem('view','main');
}

$scope.reset = function() {
$scope.setview();
$scope.history2=false;
$scope.email=false;
$scope.h0=true;
$scope.settings=false;
$scope.h1=false;
$scope.cur=false;
$scope.bk=false;
$scope.dir=false;
$scope.history=false;
$scope.notif0=true;
$scope.notif1=false
 if(localStorage.getItem('1Notes')!==null || localStorage.getItem('2Coin')!==null || localStorage.getItem('3Total')!==null ){

     if (confirm("This will delete your transaction") == true) {
     localStorage.removeItem('2Coin')
     localStorage.removeItem('1Notes')
     localStorage.removeItem('3Total')
     sessionStorage.clear();

    } else {
        alert('Function Cancelled')
    }
}
window.location.reload();
}

$scope.exit = function() {
$window.close()
}

$window.onload = function($window) {

var value=localStorage.getItem('Cur');

if (value==='EUR') {
$scope.gt = 0.010;
$scope.lt = 2.00;
$scope.gt1 = 5.00;
$scope.lt1 = 500.00;
}

if  (value==='AUD') {
$scope.gt = 0.050;
$scope.lt = 2.00;
$scope.gt1 = 5.00;
$scope.lt1 = 100.00;
}

if  (value==='CAD') {
$scope.gt = 0.050;
$scope.lt = 2.00;
$scope.gt1 = 5.00;
$scope.lt1 = 100.00;
}

if  (value==='CHF') {
$scope.gt = 0.050;
$scope.lt = 5.00;
$scope.gt1 = 10.00;
$scope.lt1 = 1000.00;
}

if  (value==='CNY') {
$scope.gt = 0.010;
$scope.lt = 1.00;
$scope.gt1 = 1.00;
$scope.lt1 = 100.00;
}

if  (value==='GBP') {
$scope.gt = 0.010;
$scope.lt = 2.00;
$scope.gt1 = 5.00;
$scope.lt1 = 50.00;
}

if  (value==='INR') {
$scope.gt = 0.10;
$scope.lt = 5.00;
$scope.gt1 = 5.00;
$scope.lt1 = 1000.00;
}

if  (value==='JPY') {
$scope.gt = 1.00;
$scope.lt = 500.00;
$scope.gt1 = 1000.00;
$scope.lt1 = 10000.00;
}

if  (value==='BRL') {
$scope.gt = 0.01;
$scope.lt = 1.00;
$scope.gt1 = 2.0;
$scope.lt1 = 100;
}

if  (value==='MXN') {
$scope.gt =0.05;
$scope.lt = 20.0;
$scope.gt1 = 20.0;
$scope.lt1 = 1000;
}
};

$scope.list=localStorage.getItem('Cur');

$scope.currency = function() {
localStorage.setItem('Cur',
$scope.list);


}

$scope.reload = function() {
window.location.reload();
}

}

function EmailController($scope) {

$scope.useremail=localStorage.getItem('myemail');

$scope.mymail = function() {

if($scope.useremail!==null){
localStorage.setItem('myemail',
$scope.useremail);
alert('Email Updated');
}else{
alert('Please Check your Input');
}

};

}



function SendController($scope,$http, $rootScope) {

// //     var sknv="";

// // for (var key in sessionStorage) {

// //     sknv  += key +' x ' + sessionStorage[key].replace(/['"]+/g, '') + '='+ key * sessionStorage[key].replace(/['"]+/g, '') +' '+localStorage.getItem('Cur') +'\n';


// // }

// console.log(sknv);




var theNotes = [{}];
var theCoins = [{}];
for (var key in sessionStorage) {
if(key != null){
var someStr = sessionStorage.getItem(key);
if(key >= $scope.gt && key <= $scope.lt ){
theCoins.push({checkK:key,valsK:someStr.replace(/['"]+/g, '')});
}
else if (key >= $scope.gt1 && key <= $scope.lt1 ){
theNotes.push({checkK:key,valsK:someStr.replace(/['"]+/g, '')});
}
}
}
$scope.email = function(){
$http({
method: 'GET',
url: 'https://www.wylog.com/ingenico/ws/weather/index.php/emailsend?authID=ce0cf133c8e40246ec816cef2375ca4b',
params: {
"email":localStorage.getItem('myemail'),
"coins": parseFloat(localStorage.getItem('1Notes')).toFixed(2),
"theNotes": JSON.stringify(theNotes),
"theCoins": JSON.stringify(theCoins),
"notes": parseFloat(localStorage.getItem('2Coin')).toFixed(2),
"currency": localStorage.getItem('Cur'),
"total": localStorage.getItem('3Total'),
"dates":moment().format("YYYY-MM-DD"),
"times":moment().format("HH:mm:ss"),
"subject": "Ticket"
},
headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
.success(function (data) {
alert(data);
//  localStorage.removeItem('2Coin')
//  localStorage.removeItem('1Notes')
//  localStorage.removeItem('3Total')
})
.error(function (data) {
alert('Error Contact your administrator');
});
}
}


