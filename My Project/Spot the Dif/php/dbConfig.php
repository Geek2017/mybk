<?php
// Database configuration
$dbHost     = "jm.dev";
$dbUsername = "root";
$dbPassword = "admin";
$dbName     = "fbapi";

//Create connection and select DB
$db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if ($db->connect_error) {
    die("Unable to connect database: " . $db->connect_error);
}
?>