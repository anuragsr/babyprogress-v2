<?php
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

    $database = "x_baby_prog";
    $host = "localhost"; 
    
    // For localhost
    // $user = "root"; 
    // $pass = ""; 

    // For eca host
    // $user = "x_baby_usr"; 
    // $pass = "November1"; 
    
    // For real host
    $user = "anurag";
    $pass = "nuragA*1";

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli($host, $user, $pass, $database);     
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

?>