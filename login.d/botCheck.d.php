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
  
  //Start database connection
  $startCon = new mysqli('localhost', $sqlUser, $sqlPass);
  
  //Check if exists else create and reconnect
  $checkIfReal = $startCon->query("USE artemis;");
  if(!$checkIfReal) $startCon->query("CREATE DATABASE IF NOT EXISTS artemis;");
  $realDatabase = $startCon->query("USE artemis;");
  
  //Check if timer exists
  $timerGet = $startCon->query("SELECT * FROM timeStatus;");
  if(!$timerGet) $startCon->query("CREATE TABLE timeStatus (timeUnique varchar(100) NOT NULL, timeGet varchar(255), PRIMARY KEY (timeUnique))");
  
  //Check if table exists to hold guilds else create
  $guildTable = $startCon->query("SELECT * FROM guildStatus;");
  if(!$guildTable) $startCon->query("CREATE TABLE guildStatus (guildId varchar(100) NOT NULL, guildName varchar(255), guildIcon varchar(255), PRIMARY KEY (guildId))");
  $startCon->query("TRUNCATE TABLE guildstatus;");
  
  //Get last update time
  $timerFetch = $startCon->query("SELECT timeGet FROM timeStatus limit 1;")->fetch_object()->timeGet;
  $calcTimeDiff = round($starttime - $timerFetch, 0);
  if($calcTimeDiff <= 600) return;
  
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
  
  //Collector for guilds
  $botGuild = [];
  
  //Function to loop guild grab for bot
  function loopBotGuilds($authCodeBot, $lastGuild, $startCon) {
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
      $guildNameSafer = mysqli_real_escape_string($startCon, $dataGuild->name);
      $startCon->query("REPLACE INTO guildStatus (guildId, guildName, guildIcon) VALUES ('{$dataGuild->id}', '{$guildNameSafer}', '{$dataGuild->icon}')");
      $botGuild[$dataGuild->id]['id'] = $dataGuild->id;
      $botGuild[$dataGuild->id]['name'] = $dataGuild->name;
      $botGuild[$dataGuild->id]['icon'] = $dataGuild->icon;
    }
    
    //If returned array is 200 in length expect more
    if(count($botGuilds) === 200) {
      //Get ID of last guild in array
      $lastGuildNum = array_values(array_slice($botGuilds, -1))[0]->id;
      //Reload loop
      return loopBotGuilds($authCodeBot, $lastGuildNum, $startCon);
    }
  }
  
  //Start bot guild request loop
  loopBotGuilds($botToken, false, $startCon);
  
  //Insert timestamp
  $startCon->query("REPLACE INTO timeStatus (timeUnique, timeGet) VALUES ('leet', '{$starttime}')");
?>
