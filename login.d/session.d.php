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
  
  //Start new database connection
  $sessionUserDataBase = new mysqli('localhost', $sqlUser, $sqlPass);
  
  //Select data for user activity
  //Data collection pool
  $pointValues = [];
  $countTotalPoints = 0;
  
  //Fetch guilds
  $userNeedGuilds = $sessionUserDataBase->query("SHOW DATABASES LIKE 'g%';");
  
  //Loop fetched guilds
  foreach($userNeedGuilds as $selectedUserDatabase) {
    //Simplify looped guild id
    $guVal = $selectedUserDatabase["Database (g%)"];
    
    //Use database
    $sessionUserDataBase->query("USE {$guVal};");
    
    //Fetch channels from selected database
    $gtuVal = $sessionUserDataBase->query("SHOW TABLES FROM " . $guVal . " LIKE 'c%';");
    
    //For each channel
    foreach($gtuVal as $utSel) {
      //Simplify channel id
      $utsVal = $utSel["Tables_in_{$guVal} (c%)"];
      
      //Select data from channel table
      $gyuvSel = $sessionUserDataBase->query("SELECT value FROM {$utsVal} WHERE id = {$decodedJson->id} LIMIT 1;");
      
      //If any returned data
      if($gyuvSel) {
        //Parse into val
        $fetchedInfo = $gyuvSel->fetch_object();
        
        //If value is set
        if(isset($fetchedInfo->value)) {
          //Process numbers
          $stripChanId = substr($utsVal, 1);
          $stripGuildId = substr($guVal, 1);
          
          $pointValues["{$stripChanId}"] = $fetchedInfo->value;
          $countTotalPoints = $countTotalPoints + $fetchedInfo->value;
        }
      }  
    }
  }
  
  //Sort point values
  arsort($pointValues);
  
  //Process point values
  $topUsedChannels = '';
  $countLoopsVals = 0;
  foreach($pointValues as $chanNum => $chanPointVal) {
    $countLoopsVals++;
    if($countLoopsVals <= 5) {
      //Get channel
      $getLoopedChannel = urlGet("https://discord.com/api/v10/channels/{$chanNum}", 'authorization: Bot ' . $botToken);
      if(!isset($getLoopedChannel->message)) {
        if($getLoopedChannel->type === 0) $topUsedChannels .= "<button class=\"channelButton\">
                                                                <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\">{$chanPointVal}</div>
                                                                <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getLoopedChannel->name}<br />{$chanNum}</div>
                                                                <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"><center>Messages send</center></div>
                                                              </button>";
        if($getLoopedChannel->type === 2) $topUsedChannels .= "<button class=\"voiceButton\">
                                                                  <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\">{$chanPointVal}</div>
                                                                  <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getLoopedChannel->name}<br />{$chanNum}</div>
                                                                  <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"><center>Messages send</center></div>
                                                                </button>";
        if($getLoopedChannel->type === 10) $topUsedChannels .= "<button class=\"threadButton\">
                                                                  <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\">{$chanPointVal}</div>
                                                                  <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getLoopedChannel->name}<br />{$chanNum}</div>
                                                                  <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"><center>Messages send</center></div>
                                                                </button>";
        if($getLoopedChannel->type === 11) $topUsedChannels .= "<button class=\"threadButton\">
                                                                  <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\">{$chanPointVal}</div>
                                                                  <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getLoopedChannel->name}<br />{$chanNum}</div>
                                                                  <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"><center>Messages send</center></div>
                                                                </button>";
        if($getLoopedChannel->type === 12) $topUsedChannels .= "<button class=\"threadButton\">
                                                                  <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\">{$chanPointVal}</div>
                                                                  <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getLoopedChannel->name}<br />{$chanNum}</div>
                                                                  <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"><center>Messages send</center></div>
                                                                </button>";
        if($getLoopedChannel->type === 13) $topUsedChannels .= "<button class=\"voiceButton\">
                                                                  <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\">{$chanPointVal}</div>
                                                                  <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getLoopedChannel->name}<br />{$chanNum}</div>
                                                                  <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"><center>Messages send</center></div>
                                                                </button>";
      } else {
        $countLoopsVals--;
      }
    }
  }
  
  //Form user data
  $gatherData = "
    <div class=\"boxFirst\" id=\"home\" style=\"background: none;\">
      <div class=\"boxContent\" style=\"background: none;\">
        <button class=\"voiceButton\" style=\"text-align: center; height: 5vh; background-image: none;\">
          Top most participated channels<br />A.K.A your filthy records ( ͡° ͜ʖ ͡°)
        </button>
        {$topUsedChannels}
        <button class=\"voiceButton\" style=\"text-align: center; height: 5vh; background-image: none;\">
          Total messages send<br />
          {$countTotalPoints}
        </button>
      </div>
    </div>
  ";
  
?>
