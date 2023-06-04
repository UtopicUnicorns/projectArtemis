<?php
  //Check uselessToken presence
  if(isset($_SESSION['uselessToken'])) {
    //Handle uselessToken
    $msg = $_SESSION['uselessToken'];
  } else {
    //No uselessToken detected, obtaining?
    if(isset($_GET['code'])) {
      //Set uselessToken
      $_SESSION['uselessToken'] = $_GET['code'];
      
      //Remove get request
      header('Location: https://artemis.rest/index.php'); 
      exit();
    }
  }
?>
