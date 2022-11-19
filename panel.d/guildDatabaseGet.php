<?php
  $guildCheck = urlGet("https://discord.com/api/v10/guilds/" . $sharedGuildsArray[$_GET["guild"]]["id"] . "/channels", 'authorization: Bot ' . $botToken);
  $guildThreadCheck = urlGet("https://discord.com/api/v10/guilds/" . $sharedGuildsArray[$_GET["guild"]]["id"] . "/threads/active", 'authorization: Bot ' . $botToken);
  $guildRolesGet = urlGet("https://discord.com/api/v10/guilds/" . $sharedGuildsArray[$_GET["guild"]]["id"] . "/roles", 'authorization: Bot ' . $botToken);
  
  $bindChannels = '<option value="NONE">NONE/UNBIND</option>';
  $numNameChan = [];
  $numNameChan['NONE'] .= 'Not Set';
  
  foreach ($guildCheck as $guildChannels) {
    if($guildChannels->type == 0) {
      $bindChannels .= '<option value="' . $guildChannels->id . '"># ' . $guildChannels->name . '</option>'; 
      $numNameChan[$guildChannels->id] .= '# ' . $guildChannels->name;
    }
  }
  
  foreach($guildThreadCheck->threads as $guildThreadChannel) {
    $bindChannels .=  '<option value="' . $guildThreadChannel->id . '">⌥ ' . $guildThreadChannel->name . '</option>'; 
    $numNameChan[$guildThreadChannel->id] .= '⌥ ' . $guildThreadChannel->name;
  }
  
  $bindRoles = '<option value="NONE">NONE/UNBIND</option>';
  $numNameRole = [];
  $numNameRole['NONE'] .= 'Not Set';
  
  foreach($guildRolesGet as $guildRoles) {
    $bindRoles .= '<option value="' . $guildRoles->id . '">@ ' . $guildRoles->name . '</option>'; 
    $numNameRole[$guildRoles->id] .= '@ ' . $guildRoles->name;
  }
  
  $connection = new mysqli('localhost', $sqlUser, $sqlPass);
  $testDataBase = $connection->query("USE g{$sharedGuildsArray[$_GET["guild"]]["id"]};");
  if(!$testDataBase) $connection->query("CREATE DATABASE IF NOT EXISTS g{$sharedGuildsArray[$_GET["guild"]]["id"]};");
  $connection->query("USE g{$sharedGuildsArray[$_GET["guild"]]["id"]};");
  $testTable = $connection->query("SELECT * FROM Logs;");
  if(!$testTable) $connection->query("CREATE TABLE Logs (id varchar(100) NOT NULL, value varchar(255), PRIMARY KEY (id))");
  
  $testTableToo = $connection->query("SELECT * FROM Settings;");
  if(!$testTableToo) $connection->query("CREATE TABLE Settings (id varchar(100) NOT NULL, value varchar(255), PRIMARY KEY (id))");
  
  $verificationMethodSettings = $connection->query("SELECT value FROM Settings WHERE id = 'verificationMethodSettings' limit 1;")->fetch_object()->value;
  $verificationChannelSettings = $connection->query("SELECT value FROM Settings WHERE id = 'verificationChannelSettings' limit 1;")->fetch_object()->value;
  $memberRoleSettings = $connection->query("SELECT value FROM Settings WHERE id = 'memberRoleSettings' limit 1;")->fetch_object()->value;
  
  $streamerChannelSettings = $connection->query("SELECT value FROM Settings WHERE id = 'streamerChannelSettings' limit 1;")->fetch_object()->value;
  $streamerRoleSettings = $connection->query("SELECT value FROM Settings WHERE id = 'streamerRoleSettings' limit 1;")->fetch_object()->value;
  
  $joinEventLog = $connection->query("SELECT value FROM Logs WHERE id = 'joinEventLog' limit 1;")->fetch_object()->value;
  $leaveEventLog = $connection->query("SELECT value FROM Logs WHERE id = 'leaveEventLog' limit 1;")->fetch_object()->value;
  $userNameChangeEventLog = $connection->query("SELECT value FROM Logs WHERE id = 'userNameChangeEventLog' limit 1;")->fetch_object()->value;
  $nickNameChangeEventLog = $connection->query("SELECT value FROM Logs WHERE id = 'nickNameChangeEventLog' limit 1;")->fetch_object()->value;
  $kickEventLog = $connection->query("SELECT value FROM Logs WHERE id = 'kickEventLog' limit 1;")->fetch_object()->value;
  $banEventLog = $connection->query("SELECT value FROM Logs WHERE id = 'banEventLog' limit 1;")->fetch_object()->value;
  $timeOutEventLog = $connection->query("SELECT value FROM Logs WHERE id = 'timeOutEventLog' limit 1;")->fetch_object()->value;
  $messageEditEventLog = $connection->query("SELECT value FROM Logs WHERE id = 'messageEditEventLog' limit 1;")->fetch_object()->value;
  $messageDeleteEventLog = $connection->query("SELECT value FROM Logs WHERE id = 'messageDeleteEventLog' limit 1;")->fetch_object()->value;
  
  if(!$verificationMethodSettings) $connection->query("INSERT INTO Settings (id, value) VALUES ('verificationMethodSettings', 'NONE')");
  if(!$verificationChannelSettings) $connection->query("INSERT INTO Settings (id, value) VALUES ('verificationChannelSettings', 'NONE')");
  if(!$memberRoleSettings) $connection->query("INSERT INTO Settings (id, value) VALUES ('memberRoleSettings', 'NONE')");
  
  if(!$streamerChannelSettings) $connection->query("INSERT INTO Settings (id, value) VALUES ('streamerChannelSettings', 'NONE')");
  if(!$streamerRoleSettings) $connection->query("INSERT INTO Settings (id, value) VALUES ('streamerRoleSettings', 'NONE')");
  
  if(!$joinEventLog) $connection->query("INSERT INTO Logs (id, value) VALUES ('joinEventLog', 'NONE')");
  if(!$leaveEventLog) $connection->query("INSERT INTO Logs (id, value) VALUES ('leaveEventLog', 'NONE')");
  if(!$userNameChangeEventLog) $connection->query("INSERT INTO Logs (id, value) VALUES ('userNameChangeEventLog', 'NONE')");
  if(!$nickNameChangeEventLog) $connection->query("INSERT INTO Logs (id, value) VALUES ('nickNameChangeEventLog', 'NONE')");
  if(!$kickEventLog) $connection->query("INSERT INTO Logs (id, value) VALUES ('kickEventLog', 'NONE')");
  if(!$banEventLog) $connection->query("INSERT INTO Logs (id, value) VALUES ('banEventLog', 'NONE')");
  if(!$timeOutEventLog) $connection->query("INSERT INTO Logs (id, value) VALUES ('timeOutEventLog', 'NONE')");
  if(!$messageEditEventLog) $connection->query("INSERT INTO Logs (id, value) VALUES ('messageEditEventLog', 'NONE')");
  if(!$messageDeleteEventLog) $connection->query("INSERT INTO Logs (id, value) VALUES ('messageDeleteEventLog', 'NONE')");
?>
