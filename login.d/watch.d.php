<?php
  include './login.d/codes.d.php';
  if($_GET){
    if($_GET["code"]) {
      $post = [
                'client_id'     => $clientId,
                'client_secret' => $clientSecret,
                'grant_type'    => 'authorization_code',
                'code'          => $_GET["code"],
                'redirect_uri'  => $redirect2,
              ];
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, 'https://discord.com/api/v10/oauth2/token');
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
      $response = curl_exec($ch);
      $decoded_json = json_decode($response, false);
      $tokGrab = $decoded_json->access_token;
      $encodeTok = str_rot13("{$tokGrab}");
      echo '<script type="text/javascript">
              document.cookie = "setCode=' . $encodeTok . '; secure";
              window.location = "./testPage.php";
            </script>';
    }
  }

  if($_COOKIE["setCode"]) {
    $curl_h = curl_init('https://discord.com/api/v10/users/@me');
    $cookieGrab = $_COOKIE["setCode"];
    $decodeTok = str_rot13("{$cookieGrab}");
    curl_setopt($curl_h, CURLOPT_HTTPHEADER, array('authorization: Bearer ' . $decodeTok,));
    curl_setopt($curl_h, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl_h);
    $decodedJson = json_decode($response, false);
    $userAvatar = 'https://cdn.discordapp.com/avatars/' . $decodedJson->id . '/' . $decodedJson->avatar . '.png?size=512';
    $userLoggedIn = '
      <div class="loginAvatarBox">
        <div class="loginAvatarBoxImage" style="background-color: rgba(255, 255, 255, 0.5); border-radius: 100px;">
          <div class="loginAvatarBoxImage" style="border-radius: 100px; background-image: url(\''. $userAvatar .'\'); background-size: cover; background-repeat: no-repeat; background-position: center;">
          </div>
        </div>
      </div>
      '.$decodedJson->username.'#'.$decodedJson->discriminator.'<br \>'.$decodedJson->id.'
      <button class="secondaryMenuButton" onclick="goToSite(\'controlPane\', false);">CONTROL</button>
      <button class="secondaryMenuButton" onclick="goToSite(\'logoutLink\', false);">LOGOUT</button>
    ';
  } else {
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
  }
?>
