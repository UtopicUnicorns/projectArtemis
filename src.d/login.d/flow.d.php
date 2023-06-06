<?php
  //Not to be accessed
  if(count(get_included_files()) ==1) { 
    header('Location: https://artemis.rest/oops.php'); 
    exit();
  }
  
  //Include config codes
  include './login.d/codes.d.php';
  
  //Post, Get, Patch functions
  function urlGet($url, $headers) {
    $curl_h = curl_init($url);
    curl_setopt($curl_h, CURLOPT_HTTPHEADER, array($headers));
    curl_setopt($curl_h, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl_h);
    return json_decode($response, false);
  }
  
  function urlPatch($url, $headers, $data) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
  }
  
  function urlPost($url, $headers, $data) {
    $curl_i = curl_init();
    curl_setopt($curl_i, CURLOPT_URL, $url);
    curl_setopt($curl_i, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl_i, CURLOPT_POST, true);
    curl_setopt($curl_i, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl_i, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($curl_i);
    curl_close($curl_i);
    return $response;
  }
  
  //Connect to database
  $createDatabaseSession = new mysqli('localhost', $sqlUser, $sqlPass);
  $getMeToInfo = $createDatabaseSession->query("USE artemis;");
  if(!$getMeToInfo) die("flow.d #46");
  $botGuilds = $createDatabaseSession->query("SELECT * FROM guildStatus;");
  if(!$botGuilds) die("flow.d #48");
  
  //Flow?
  $flow = false;
  
  //Check uselessToken presence
  if(isset($_SESSION['uselessToken'])) {
    //Handle uselessToken
    $uselessToken = $_SESSION['uselessToken'];
    $flow = true;
  } else {
    //No uselessToken detected, obtaining?
    if(isset($_GET['code'])) {
      //Build post request
      $post = [
                'client_id'     => $clientId,
                'client_secret' => $clientSecret,
                'grant_type'    => 'authorization_code',
                'code'          => $_GET["code"],
                'redirect_uri'  => $redirect,
              ];
              
      //Shorted curl init
      $ch = curl_init();
      
      //Curl option set
      curl_setopt($ch, CURLOPT_URL, 'https://discord.com/api/v10/oauth2/token');
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
      
      //Execute request
      $response = curl_exec($ch);
      
      //Expect json, decode
      $decoded_json = json_decode($response, false);
      
      //Grab token
      $tokGrab = $decoded_json->access_token;
    
      //Set uselessToken
      if($tokGrab) $_SESSION['uselessToken'] = $tokGrab;
      
      //Remove get request
      header('Location: https://artemis.rest/index.php'); 
      exit();
    }
  }
?>
