<?php
  //Not to be accessed
  if(count(get_included_files()) ==1) { 
    header('Location: https://artemis.rest/?message=403'); 
    exit();
  }
  
  //Start database connection
  $sessionDataBase = new mysqli('localhost', $sqlUser, $sqlPass);
  
  //Check if exists else create and reconnect
  $checkMainDatabase = $sessionDataBase->query("USE artemis;");
  if(!$checkMainDatabase) $sessionDataBase->query("CREATE DATABASE IF NOT EXISTS artemis;");
  $checkMainDatabase = $sessionDataBase->query("USE artemis;");
  
  //Check if table exists to hold guilds else create
  $sessionGuilds = $sessionDataBase->query("SELECT * FROM guildStatus;");
  if(!$sessionGuilds) $sessionDataBase->query("CREATE TABLE guildStatus (guildId varchar(100) NOT NULL, guildName varchar(255), guildIcon varchar(255), PRIMARY KEY (guildId))");
  $sessionGuilds = $sessionDataBase->query("SELECT * FROM guildStatus;");
  
  //Form avatar URI
  $userAvatar = 'https://cdn.discordapp.com/avatars/' . $decodedJson->id . '/' . $decodedJson->avatar . '.png?size=512';
  
  //Create logged in menu box
  $userLoggedIn = '
    <div class="loginAvatarBox">
      <div class="loginAvatarBoxImage" style="background-color: rgba(255, 255, 255, 0.5); border-radius: 100px;">
        <div class="loginAvatarBoxImage" style="border-radius: 100px; background-image: url(\''. $userAvatar .'\'); background-size: cover; background-repeat: no-repeat; background-position: center;">
        </div>
      </div>
    </div>
    '.$decodedJson->username.'#'.$decodedJson->discriminator.'<br \>'.$decodedJson->id.'
    <button class="secondaryMenuButton" onclick="document.getElementById(\'panel\').scrollIntoView();">CONTROL</button>
    <button class="secondaryMenuButton" onclick="goToSite(\'logoutLink\', false);">LOGOUT</button>
  ';
  
  //Pull guilds
  $panelPop = '';
  foreach($sessionGuilds as $sessionGuild) {
    //Globalize pop
    global $panelPop;
    
    //Check avatar status
    if($sessionGuild['guildIcon']) {
      $gAvatar = 'https://cdn.discordapp.com/icons/' . $sessionGuild['guildId'] . '/' .  $sessionGuild['guildIcon'] . '.png?size=128';
    } else {
      $gAvatar = './images/icons/user.svg';
    }
    
    //Populate panel
    $panelPop .= '
      <button class="inviteButton" onclick="goToSite(\'controlPane\', false, \''.$sessionGuild['guildId'].'\');">
        <img src=\''.$gAvatar.'\' style="border-radius: 25px 0px 25px 0px; width: 90%;" />
        <div style="position: relative; width: 20vh; max-width: 20vh; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'.$sessionGuild['guildName'].'</div>
      </button>
      
    ';
    //'.$sessionGuild['guildName'].'
    //$panelPop .= $sessionGuild['guildId'] . $sessionGuild['guildIcon'] . $sessionGuild['guildName'];
  }
  
  //Form home panel
  $panelCreate = '
    <div class="minusBoxBg"></div>
    <div class="minusBox" id="panel">
      <div class="boxContent" style="text-align: center; display: inline-block;">
        <div class="buttonHoldInvite" style="display: inline-block;">
        '. $panelPop .'
        </div>
      </div>
    </div>
  ';
?>
