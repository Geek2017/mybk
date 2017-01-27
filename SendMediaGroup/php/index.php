	
<?php  

 static $i=0;


$string = file_get_contents("url.json");
$json_a = json_decode($string, true);


echo $json_a[$i]['url'];


// print_r($json_a);


//   function checkPageSpeed($url){    
//     if (function_exists('file_get_contents')) {    
//     $result = @file_get_contents($url);
//   }    
//   if ($result == '') {    
//   $ch = curl_init();    
//   $timeout = 60;    
//   curl_setopt($ch, CURLOPT_URL, $url);    
//   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);   
//   curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);  
//   curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);  
//   curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);  
//   curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);    
//   $result = curl_exec($ch);    
//   curl_close($ch);    
//  }    

//  return $result;    
// }  

// $myKEY = "AIzaSyD7DzQ2X8XeQwj3tiHDG_CuOeb1jlBuv1o";  
// $url = "http://www.tt1069.com/";  
// $url_req = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url='.$url.'&screenshot=true&key='.$myKEY;  
// $results = checkPageSpeed($url_req);  
// echo '<pre>';  
// print_r(json_decode($results,true));   
// echo '</pre>'; 
?>

