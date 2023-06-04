<?php
  //Not to be accessed
  if(count(get_included_files()) ==1) { 
    header('Location: https://artemis.rest/oops.php'); 
    exit();
  }
  
  //Timer to check page speed
  $starttime = microtime(true);

  //Config file
  include './codes.d.php';
  
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
  $startCon->query("TRUNCATE TABLE guildStatus;");
  
  //Get last update time
  $timerFetch = $startCon->query("SELECT timeGet FROM timeStatus limit 1;")->fetch_object()->timeGet;
  $calcTimeDiff = round($starttime - $timerFetch, 0);
  if($calcTimeDiff <= 60) return;
  
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
  function loopBotGuilds($authCodeBot, $lastGuild, $startCon, $sqlUser, $sqlPass) {
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
      
      //Create and check guild Database
      //Activate temp connection
      $newConMake = new mysqli('localhost', $sqlUser, $sqlPass);
      
      //Check if guild exists
      $checkIfExists = $newConMake->query("USE g{$dataGuild->id};");
      if(!$checkIfExists) $newConMake->query("CREATE DATABASE IF NOT EXISTS g{$dataGuild->id};");
      $newConMake->query("USE g{$dataGuild->id};");
      
      //Check Logs table
      $logTable = $newConMake->query("SELECT * FROM Logs;");
      if(!$logTable) $newConMake->query("CREATE TABLE Logs (id varchar(100) NOT NULL, value varchar(255), PRIMARY KEY (id))");
      
      //Check Settings Table
      $settingsTable = $newConMake->query("SELECT * FROM Settings;");
      if(!$settingsTable) $newConMake->query("CREATE TABLE Settings (id varchar(100) NOT NULL, value varchar(255), PRIMARY KEY (id))");
      
      //Check User table
      $usersTable = $newConMake->query("SELECT * FROM User;");
      if(!$usersTable) $newConMake->query("CREATE TABLE User (id varchar(100) NOT NULL, username varchar(255), discriminator varchar(255), avatar varchar(255), points int, PRIMARY KEY (id))");
      
      //Check Streamers Table
      $streamersTable = $newConMake->query("SELECT * FROM Streamers;");
      if(!$streamersTable) $newConMake->query("CREATE TABLE Streamers (id varchar(100) NOT NULL, value varchar(255), PRIMARY KEY (id))");
      
      //Check Support table
      $supportTable = $newConMake->query("SELECT * FROM Support;");
      if(!$supportTable) $newConMake->query("CREATE TABLE Support (id varchar(100) NOT NULL, value varchar(255), PRIMARY KEY (id))");
      
      //Check Topics Table
      $topicsTable = $newConMake->query("SELECT * FROM Topics;");
      if(!$topicsTable) $newConMake->query("CREATE TABLE Topics (id varchar(100) NOT NULL, value varchar(255), PRIMARY KEY (id))");
      
      //Check joinlog Table
      $joinlogTable = $newConMake->query("SELECT * FROM joinLog;");
      if(!$joinlogTable) $newConMake->query("CREATE TABLE joinLog (id varchar(100) NOT NULL, username varchar(255), discriminator varchar(255), avatar varchar(255), timeStamp varchar(255), PRIMARY KEY (id))");
      
      //Check roles table
      $rolesTable = $newConMake->query("SELECT * FROM roles;");
      if(!$rolesTable) $newConMake->query("CREATE TABLE roles (id varchar(100) NOT NULL, rolename varchar(255), description varchar(255), emote varchar(255), slot varchar(255), PRIMARY KEY (id))");
      
      //Check actionlog table
      $actionlogTable = $newConMake->query("SELECT * FROM actionLog;");
      if(!$actionlogTable) $newConMake->query("CREATE TABLE actionLog (id varchar(100) NOT NULL, timeStamp varchar(255), takenBy varchar(255), issuedTo varchar(255), actionType varchar(255), actionNotes varchar(255), PRIMARY KEY (id))");
      
      //Check customCommands table
      $customcommandsTable = $newConMake->query("SELECT * FROM customCommands;");
      if(!$customcommandsTable) $newConMake->query("CREATE TABLE customCommands (id varchar(100) NOT NULL, triggerWord varchar(255), reply varchar(255), actiontype varchar(255), actiondo varchar(255), placement varchar(255), PRIMARY KEY (id))");
      
      //Populate tables
      //Check if values are selectable or valid
      $verificationMethodSettings = $newConMake->query("SELECT value FROM Settings WHERE id = 'verificationMethodSettings' limit 1;")->fetch_object()->value;
      $verificationChannelSettings = $newConMake->query("SELECT value FROM Settings WHERE id = 'verificationChannelSettings' limit 1;")->fetch_object()->value;
      $memberRoleSettings = $newConMake->query("SELECT value FROM Settings WHERE id = 'memberRoleSettings' limit 1;")->fetch_object()->value;
      $streamerChannelSettings = $newConMake->query("SELECT value FROM Settings WHERE id = 'streamerChannelSettings' limit 1;")->fetch_object()->value;
      $streamerRoleSettings = $newConMake->query("SELECT value FROM Settings WHERE id = 'streamerRoleSettings' limit 1;")->fetch_object()->value;  
      $hiChanSettings = $newConMake->query("SELECT value FROM Settings WHERE id = 'hiChanSettings' limit 1;")->fetch_object()->value;
      $hiMsgSettings = $newConMake->query("SELECT value FROM Settings WHERE id = 'hiMsgSettings' limit 1;")->fetch_object()->value;
      $joinEventLog = $newConMake->query("SELECT value FROM Logs WHERE id = 'joinEventLog' limit 1;")->fetch_object()->value;
      $leaveEventLog = $newConMake->query("SELECT value FROM Logs WHERE id = 'leaveEventLog' limit 1;")->fetch_object()->value;
      $userNameChangeEventLog = $newConMake->query("SELECT value FROM Logs WHERE id = 'userNameChangeEventLog' limit 1;")->fetch_object()->value;
      $nickNameChangeEventLog = $newConMake->query("SELECT value FROM Logs WHERE id = 'nickNameChangeEventLog' limit 1;")->fetch_object()->value;
      $kickEventLog = $newConMake->query("SELECT value FROM Logs WHERE id = 'kickEventLog' limit 1;")->fetch_object()->value;
      $banEventLog = $newConMake->query("SELECT value FROM Logs WHERE id = 'banEventLog' limit 1;")->fetch_object()->value;
      $timeOutEventLog = $newConMake->query("SELECT value FROM Logs WHERE id = 'timeOutEventLog' limit 1;")->fetch_object()->value;
      $messageEditEventLog = $newConMake->query("SELECT value FROM Logs WHERE id = 'messageEditEventLog' limit 1;")->fetch_object()->value;
      $messageDeleteEventLog = $newConMake->query("SELECT value FROM Logs WHERE id = 'messageDeleteEventLog' limit 1;")->fetch_object()->value;
      
      //Check if vaLues need to be set
      if(!$verificationMethodSettings) $newConMake->query("INSERT INTO Settings (id, value) VALUES ('verificationMethodSettings', 'NONE')");
      if(!$verificationChannelSettings) $newConMake->query("INSERT INTO Settings (id, value) VALUES ('verificationChannelSettings', 'NONE')");
      if(!$memberRoleSettings) $newConMake->query("INSERT INTO Settings (id, value) VALUES ('memberRoleSettings', 'NONE')");
      if(!$streamerChannelSettings) $newConMake->query("INSERT INTO Settings (id, value) VALUES ('streamerChannelSettings', 'NONE')");
      if(!$streamerRoleSettings) $newConMake->query("INSERT INTO Settings (id, value) VALUES ('streamerRoleSettings', 'NONE')");
      if(!$hiChanSettings) $newConMake->query("INSERT INTO Settings (id, value) VALUES ('hiChanSettings', 'NONE')");
      if(!$hiMsgSettings) $newConMake->query("INSERT INTO Settings (id, value) VALUES ('hiMsgSettings', 'NONE')");
      if(!$joinEventLog) $newConMake->query("INSERT INTO Logs (id, value) VALUES ('joinEventLog', 'NONE')");
      if(!$leaveEventLog) $newConMake->query("INSERT INTO Logs (id, value) VALUES ('leaveEventLog', 'NONE')");
      if(!$userNameChangeEventLog) $newConMake->query("INSERT INTO Logs (id, value) VALUES ('userNameChangeEventLog', 'NONE')");
      if(!$nickNameChangeEventLog) $newConMake->query("INSERT INTO Logs (id, value) VALUES ('nickNameChangeEventLog', 'NONE')");
      if(!$kickEventLog) $newConMake->query("INSERT INTO Logs (id, value) VALUES ('kickEventLog', 'NONE')");
      if(!$banEventLog) $newConMake->query("INSERT INTO Logs (id, value) VALUES ('banEventLog', 'NONE')");
      if(!$timeOutEventLog) $newConMake->query("INSERT INTO Logs (id, value) VALUES ('timeOutEventLog', 'NONE')");
      if(!$messageEditEventLog) $newConMake->query("INSERT INTO Logs (id, value) VALUES ('messageEditEventLog', 'NONE')");
      if(!$messageDeleteEventLog) $newConMake->query("INSERT INTO Logs (id, value) VALUES ('messageDeleteEventLog', 'NONE')");
    }
    
    //If returned array is 200 in length expect more
    if(count($botGuilds) === 200) {
      //Get ID of last guild in array
      $lastGuildNum = array_values(array_slice($botGuilds, -1))[0]->id;
      //Reload loop
      return loopBotGuilds($authCodeBot, $lastGuildNum, $startCon, $sqlUser, $sqlPass);
    }
  }
  
  //Start bot guild request loop
  loopBotGuilds($botToken, false, $startCon, $sqlUser, $sqlPass);
  
  //Insert timestamp
  $startCon->query("REPLACE INTO timeStatus (timeUnique, timeGet) VALUES ('leet', '{$starttime}')");
?>
