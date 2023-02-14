<?php
  //Not to be accessed
  if(count(get_included_files()) ==1) { 
    header('Location: https://artemis.rest/?message=403'); 
    exit();
  }
  
  //Timer to check page speed
  $starttime = microtime(true);
  
  //Config file
  include './login.d/codes.d.php';
  
  //Get request function
  function getRequest($url, $auth, $user) {
    //If auth provided expect code
    if($auth) $authCode = $auth;
    
    //If no auth provided or false
    if(!$auth) {
      //If no cookies at all, return
      if(!$_COOKIE) return 'error';
      
      //If no proper setCode, return
      if(!$_COOKIE["setCode"]) return 'error';
      
      //If setCode cookie, use as auth
      $authCode = $_COOKIE["setCode"];
    }
    
    //If user provided or true, set user to bot
    if($user) $authMeth = "Bot ";
    
    //If no user provided or false expect user request
    if(!$user) $authMeth = "Bearer ";
    
    //Create method array, provide headers
    $opts = array(
      'http'=>array(
        'method'=>"GET",
        'header' => "Authorization: " . $authMeth . $authCode 
      )
    );
    
    //Parse method into context for stream
    $context = stream_context_create($opts);
    
    //Execute context
    $file = file_get_contents($url, false, $context);
    
    //Return info, parse properly for use
    return json_decode($file);
  }
  
  //Get user, user guilds, bot guilds
  //Collect information
  $userInfo = [];
  $userGuild = [];
  $botGuild = [];
  
  //Get user details
  $userLogin = getRequest("https://discord.com/api/v10/users/@me", false, false);

  //If user is properly logged in or parsed
  if($userLogin !== 'error') {
    //Write user data to array
    $userInfo['id'] = $userLogin->id;
    $userInfo['username'] = $userLogin->username;
    $userInfo['discriminator'] = $userLogin->discriminator;
    $userInfo['avatar'] = $userLogin->avatar;
    $userInfo['banner'] = $userLogin->banner;
    
    //Get user guilds
    $userGuilds = getRequest("https://discord.com/api/v10/users/@me/guilds?limit=200", false, false);
    
    //Loop over user guilds
    foreach($userGuilds as $dataUserGuild) {
      //Write to global
      global $userGuild;
        
      //Write entries
      $userGuild[$dataUserGuild->id]['id'] = $dataUserGuild->id;
      $userGuild[$dataUserGuild->id]['name'] = $dataUserGuild->name;
      $userGuild[$dataUserGuild->id]['icon'] = $dataUserGuild->icon;
      $userGuild[$dataUserGuild->permissions]['permissions'] = $dataUserGuild->permissions;
    }
    
    //Get bot guilds
    function loopBotGuilds($authCodeBot, $lastGuild) {
      //Initiate bot guild get requests
      //If initial request
      if(!$lastGuild) $botGuilds = getRequest("https://discord.com/api/v10/users/@me/guilds?limit=200", $authCodeBot, true);
      
      //If extra loop needed
      if($lastGuild) $botGuilds = getRequest("https://discord.com/api/v10/users/@me/guilds?limit=200&after=" . $lastGuild, $authCodeBot, true);
      
      //Loop incoming information
      foreach($botGuilds as $dataGuild) {
        //Write to global
        global $botGuild;
        
        //Write entries
        $botGuild[$dataGuild->id]['id'] = $dataGuild->id;
        $botGuild[$dataGuild->id]['name'] = $dataGuild->name;
        $botGuild[$dataGuild->id]['icon'] = $dataGuild->icon;
      }
      
      //If returned array is 200 in length expect more
      if(count($botGuilds) === 200) {
        //Get ID of last guild in array
        $lastGuildNum = array_values(array_slice($botGuilds, -1))[0]->id;
        //Reload loop
        return loopBotGuilds($authCodeBot, $lastGuildNum);
      }
    }
    
    //Start bot guild request loop
    loopBotGuilds($botToken, false);
    
    //Arrays to work with json_encode
    //$userInfo
    //$userGuild
    //$botGuild
  }
  
  //Timer end for page speed
  $endtime = microtime(true);
  
  //Display page speed
  printf("<br><br>Page loaded in %f seconds", $endtime - $starttime );
?>
