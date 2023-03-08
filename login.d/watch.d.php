<?php
  //Not to be accessed
  if(count(get_included_files()) ==1) { 
    header('Location: https://artemis.rest/?message=403'); 
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
  
  //If get set to code, parse and encode
  if(isset($_GET["code"])) {
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
    
    //Encode token
    $encodeTok = str_rot13("{$tokGrab}");
    
    //Redirect with encoded token, set cookie.
    echo '<script type="text/javascript">
            document.cookie = "setCode=' . $encodeTok . '; secure";
            window.location = "https://artemis.rest/?message=loggedin";
          </script>';
  }
  
  //If cookie with setCode
  if(isset($_COOKIE["setCode"])) {
    //Initiate curl request
    $curl_h = curl_init('https://discord.com/api/v10/users/@me');
    
    //Simplify cookie
    $cookieGrab = $_COOKIE["setCode"];
    
    //Decode token
    $decodeTok = str_rot13("{$cookieGrab}");
    
    //Set curl options
    curl_setopt($curl_h, CURLOPT_HTTPHEADER, array('authorization: Bearer ' . $decodeTok,));
    curl_setopt($curl_h, CURLOPT_RETURNTRANSFER, true);
    
    //Execute curl request
    $response = curl_exec($curl_h);
    
    //Expect json, decode
    $decodedJson = json_decode($response, false);
    
    //If not logged in, but cookie is set, or token is expired
    if(isset($decodedJson->message)) {
      header('Location: https://artemis.rest/login.d/logout.d.php?error=forceLogged');
      die();
    }
    
    //Include session
    include './login.d/session.d.php';
    
    //Pages
    if(basename($_SERVER['PHP_SELF']) == 'control.d.php') include './login.d/control.d.php';
    if(basename($_SERVER['PHP_SELF']) == 'channel.d.php') include './login.d/channel.d.php';
  } else {
    //If not index
    if(basename($_SERVER['PHP_SELF']) !== 'index.php') { 
      header('Location: https://artemis.rest/?message=403'); 
      exit();
    }
    
    //Form login box for non-user
    $userLoggedIn = '
      <div class="loginAvatarBox">
        <div class="loginAvatarBoxImage" style="background-color: rgba(255, 255, 255, 0.5); border-radius: 100px;">
          <div class="loginAvatarBoxImage" style="border-radius: 100px; background-image: url(\'../images/icons/user.svg\'); background-size: cover; background-repeat: no-repeat; background-position: center;">
          </div>
        </div>
      </div>
      You are not logged in
      <button class="secondaryMenuButton" onclick="goToSite(\'loginLink\', false);">LOGIN</button>
    ';
    
    //Leave empty panel to supress error
    $panelCreate = '';
    
    //Empty data gather
    $gatherData = '<div class="boxFirst" id="home"></div>';
  }
?>
