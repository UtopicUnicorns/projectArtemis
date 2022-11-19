<?php
  if($_COOKIE["setCode"]) {
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
    
    include './panel.d/configd.php';
    
    $yourInformation = urlGet("https://discord.com/api/users/@me", 'authorization: Bearer ' . $_COOKIE["setCode"]);
    $guildsWeShare = urlGet("https://discord.com/api/users/@me/guilds", 'authorization: Bearer ' . $_COOKIE["setCode"]);
    
    $botGuildsArray = [];
    $yourGuildsArray = [];
    $sharedGuildsArray = [];
    
    function loopMyGuilds($botGuildsArray, $botToken, $last) {
      if(!$last) $botGuilds = urlGet("https://discord.com/api/users/@me/guilds?limit=200", 'authorization: Bot ' . $botToken);
      if($last) $botGuilds = urlGet("https://discord.com/api/users/@me/guilds?limit=200&after=" . $last, 'authorization: Bot ' . $botToken);
      foreach($botGuilds as $botGuild) {
        $botGuildsArray[$botGuild->id]['id'] .= $botGuild->id;
        $botGuildsArray[$botGuild->id]['name'] .= $botGuild->name;
        $botGuildsArray[$botGuild->id]['icon'] .= $botGuild->icon;
      }
      sleep(1);
      if(count($botGuilds) == 200) return loopMyGuilds($botGuildsArray, $botToken, $botGuilds[199]->id);
      return $botGuildsArray;
    }
    
    function loopYourGuilds($yourGuildsArray, $code, $last) {
      if(!$last) $yourGuilds = urlGet("https://discord.com/api/users/@me/guilds?limit=200", 'authorization: Bearer ' . $code);
      if($last) $yourGuilds = urlGet("https://discord.com/api/users/@me/guilds?limit=200&after=" . $last, 'authorization: Bearer ' . $code);
      foreach($yourGuilds as $yourGuild) {
        $yourGuildsArray[$yourGuild->id]['id'] .= $yourGuild->id;
        $yourGuildsArray[$yourGuild->id]['name'] .= $yourGuild->name;
        $yourGuildsArray[$yourGuild->id]['icon'] .= $yourGuild->icon;
        $yourGuildsArray[$yourGuild->id]['permissions'] .= $yourGuild->permissions;
      }
      sleep(1);
      if(count($yourGuilds) == 200) return loopYourGuilds($yourGuildsArray, $code, $yourGuilds[199]->id);
      return $yourGuildsArray;
    }
    
    $processedMyGuilds = loopMyGuilds($botGuildsArray, $botToken, 0);
    $processedYourGuilds = loopYourGuilds($yourGuildsArray, $_COOKIE["setCode"], 0);
    
    foreach($processedMyGuilds as $checkersGuild) {
      if($processedYourGuilds[$checkersGuild["id"]]) {
        $yourGuildPermissions = $processedYourGuilds[$checkersGuild["id"]]["permissions"];
        $guildManagePermissions = 1 << 5;
        $doMathForGuildPermissions = $yourGuildPermissions & $guildManagePermissions;
        if($doMathForGuildPermissions == $guildManagePermissions) {
          $sharedGuildsArray[$processedYourGuilds[$checkersGuild["id"]]["id"]]['id'] .= $processedYourGuilds[$checkersGuild["id"]]["id"];
          $sharedGuildsArray[$processedYourGuilds[$checkersGuild["id"]]["id"]]['name'] .= $processedYourGuilds[$checkersGuild["id"]]["name"];
          $sharedGuildsArray[$processedYourGuilds[$checkersGuild["id"]]["id"]]['icon'] .= $processedYourGuilds[$checkersGuild["id"]]["icon"];
          $sharedGuildsArray[$processedYourGuilds[$checkersGuild["id"]]["id"]]['permissions'] .= $processedYourGuilds[$checkersGuild["id"]]["permissions"];
        }
      }
    }
    //json_encode(array);
    //count(array);
    //array[entryId][entryValue]
    //echo $sharedGuildsArray['628978428019736619']["name"];
    include './panel.d/userMenu.php';
    
    if ($_GET["page"] == 'guildSettings' && $_GET["guild"]) include './panel.d/guildSettings.php';
    if ($_GET["page"] == 'guildInfo' && $_GET["guild"]) include './panel.d/guildInfo.php';
    if ($_GET["page"] == 'guildStreamers' && $_GET["guild"]) include './panel.d/guildStreamers.php';
    if ($_GET["page"] == 'guildTopics' && $_GET["guild"]) include './panel.d/guildTopics.php';
    if ($_GET["page"] == 'userInfo') include './panel.d/userInfo.php';
    if ($_GET["page"] == 'userSettings') include './panel.d/userSettings.php';
    if ($_GET["page"] == 'logout') include './panel.d/logout.php';
    if ($_GET["page"] == 'textChannelView' && $_GET["channel"] && $_GET["guild"]) include './panel.d/textChannelView.php';
    if ($_GET["page"] == 'threadChannelView' && $_GET["channel"] && $_GET["guild"]) include './panel.d/threadChannelView.php';
    if ($_GET["page"] == 'voiceChannelView' && $_GET["channel"] && $_GET["guild"]) include './panel.d/voiceChannelView.php';
    if (!$_GET["page"]) include './panel.d/userInfo.php';
  } else {
    echo '<script type="text/javascript">window.location = "https://artemis.rest/";</script>';
  }
?>
