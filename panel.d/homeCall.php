<?php
  include './panel.d/configd.php';
  if($_GET["code"]) {
    $post = [
              'client_id'     => $clientId,
              'client_secret' => $clientSecret,
              'grant_type'    => 'authorization_code',
              'code'          => $_GET["code"],
              'redirect_uri'  => $redirect,
            ];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://discord.com/api/oauth2/token');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
    $response = curl_exec($ch);
    $decoded_json = json_decode($response, false);
    echo '<script type="text/javascript">
            document.cookie = "setCode=' . $decoded_json->access_token . '; SameSite=None; Secure";
            window.location = "/";
          </script>';
  }

  if($_COOKIE["setCode"]) {
    $curl_h = curl_init('https://discord.com/api/users/@me');
    curl_setopt($curl_h, CURLOPT_HTTPHEADER, array('authorization: Bearer ' . $_COOKIE["setCode"],));
    curl_setopt($curl_h, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl_h);
    $decodedJson = json_decode($response, false);
    $personalizedContent = '<div class="logo" style="background-size: contain; background-image: url(\'https://cdn.discordapp.com/avatars/' . $decodedJson->id . '/' . $decodedJson->avatar . '.png?size=2048\')">
            <p id="logoColTop">
              <br />Project You<br />
              <small id="logoColBot">
                Be yourself, ' . $decodedJson->username . '#' . $decodedJson->discriminator . '.
              </small>
            </p>
           </div>
           <div class="menu_box">
             <button class="menu_button pulse" onclick="document.getElementById(\'home\').scrollIntoView();">HOMEPAGE</button>
             <button class="menu_button pulse" onclick="document.getElementById(\'invite\').scrollIntoView();">INVITE</button>
             <button class="menu_button pulse" onclick="document.getElementById(\'github\').scrollIntoView();">GITHUB</button>
             <button class="menu_button pulse" onclick="document.getElementById(\'donate\').scrollIntoView();">DONATE</button>
             <button class="menu_button pulse" onclick="document.getElementById(\'contact\').scrollIntoView();">CONTACT</button>
             <button class="menu_button pulse" onclick="document.getElementById(\'stats\').scrollIntoView();">STATS</button>
             <br /><br />
             <button class="menu_button pulse" onclick="location.href=\'./panel.php\';">My Control Panel</button>
             <button class="menu_button pulse" onclick="location.href=\'./panel.php?page=logout\';" >Log me out</button>
           </div>
           </div>';
  } else {
    $clientId = '654361253413781537';
    $baseURL='https://discord.com/api/oauth2/authorize?client_id=' . $clientId . '&redirect_uri=https%3A%2F%2Fartemis.rest%2F&response_type=code&scope=identify%20guilds%20guilds.members.read';
    $personalizedContent = '<div class="logo"></div>
           <div class="menu_box">
            <button class="menu_button pulse" onclick="document.getElementById(\'home\').scrollIntoView();">HOMEPAGE</button>
            <button class="menu_button pulse" onclick="document.getElementById(\'invite\').scrollIntoView();">INVITE</button>
            <button class="menu_button pulse" onclick="document.getElementById(\'github\').scrollIntoView();">GITHUB</button>
            <button class="menu_button pulse" onclick="document.getElementById(\'donate\').scrollIntoView();">DONATE</button>
            <button class="menu_button pulse" onclick="document.getElementById(\'contact\').scrollIntoView();">CONTACT</button>
            <button class="menu_button pulse" onclick="document.getElementById(\'stats\').scrollIntoView();">STATS</button>
            <br /><br />
            <button class="menu_button pulse" onclick="location.href=\'' . $baseURL . '\';">LOGIN</button>
           </div>
           </div>';
  }
?>
