<?php
  //Not to be accessed
  if(count(get_included_files()) ==1) { 
    header('Location: https://artemis.rest/?message=403'); 
    exit();
  }
  
  //If no guild
  if(!isset($_GET["guild"])) {
    header('Location: https://artemis.rest/?message=403'); 
    exit();
  }
  
  //If not bot owner
  if($decodedJson->id !== $ownerId) {
    //If guild not known in userlist
    if(!isset($userGuildFetch[$_GET["guild"]])) {
      header('Location: https://artemis.rest/?message=403'); 
      exit();
    }
    
    //If no permissions at all
    if(!isset($userGuildFetch[$_GET["guild"]]["permissions"])) {
      header('Location: https://artemis.rest/?message=403'); 
      exit();
    }
    
    //Get user permission int
    $yourGuildPermissions = $userGuildFetch[$_GET["guild"]]["permissions"];
    
    //Get required permission(manage_guild)
    $guildManagePermissions = 1 << 5;
    
    //Calc
    $doMathForGuildPermissions = $yourGuildPermissions & $guildManagePermissions;
    
    //If permissions do not add up
    if($doMathForGuildPermissions !== $guildManagePermissions) {
      header('Location: https://artemis.rest/?message=403'); 
      exit();
    }
  }
  
  //Get guild
  $getGuildInfo = urlGet("https://discord.com/api/v10/guilds/{$_GET['guild']}?with_counts=true", 'authorization: Bot ' . $botToken);
    
  //Get guild channels
  $getGuildChannels = urlGet("https://discord.com/api/v10/guilds/{$_GET['guild']}/channels", 'authorization: Bot ' . $botToken);
  
  //Get guild active threads
  $getGuildThreads = urlGet("https://discord.com/api/v10/guilds/{$_GET['guild']}/threads/active", 'authorization: Bot ' . $botToken);
  
  //Loop trough channels
  $channelTextHTML = '';
  $channelVoiceHTML = '';
  $channelThreadHTML = '';
  foreach($getGuildChannels as $getGuildChannel) {
    if($getGuildChannel->type === 0) $channelTextHTML .= "
      <button class=\"channelButton\" onclick=\"loadChannel('{$getGuildChannel->id}', '{$_GET['guild']}');\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getGuildChannel->name}<br />{$getGuildChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
    
    if($getGuildChannel->type === 2) $channelVoiceHTML .= "
      <button class=\"voiceButton\" onclick=\"loadChannel('{$getGuildChannel->id}', '{$_GET['guild']}');\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getGuildChannel->name}<br />{$getGuildChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
    
    if($getGuildChannel->type === 10) $channelThreadHTML .= "
      <button class=\"threadButton\" onclick=\"loadChannel('{$getGuildChannel->id}', '{$_GET['guild']}');\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getGuildChannel->name}<br />{$getGuildChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
    
    if($getGuildChannel->type === 11) $channelThreadHTML .= "
      <button class=\"threadButton\" onclick=\"loadChannel('{$getGuildChannel->id}', '{$_GET['guild']}');\"
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getGuildChannel->name}<br />{$getGuildChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
    
    if($getGuildChannel->type === 12) $channelThreadHTML .= "
      <button class=\"threadButton\" onclick=\"loadChannel('{$getGuildChannel->id}', '{$_GET['guild']}');\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getGuildChannel->name}<br />{$getGuildChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
    
    if($getGuildChannel->type === 13) $channelVoiceHTML .= "
      <button class=\"voiceButton\" onclick=\"loadChannel('{$getGuildChannel->id}', '{$_GET['guild']}');\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getGuildChannel->name}<br />{$getGuildChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
  }
  
  foreach($getGuildThreads->threads as $getGuildThread) {
    $channelThreadHTML .= "
      <button class=\"threadButton\" onclick=\"loadChannel('{$getGuildThread->id}', '{$_GET['guild']}');\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getGuildThread->name}<br />{$getGuildThread->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
  }

  $a = json_encode($getGuildChannels);
  $b = json_encode($getGuildThreads);
  $d = json_encode($getGuildInfo);
  //roles {$getGuildInfo->roles}
  //emotes {$getGuildInfo->emojis}
  //stickers {$getGuildInfo->stickers}
  $homeBox = "
    <div class=\"boxFirst\" style=\"background: none;\" id=\"home\">
      <div class=\"boxContent\">
        Id: {$getGuildInfo->id} <br />
        Name: {$getGuildInfo->name} <br />
        Icon: {$getGuildInfo->icon} <br />
        Description: {$getGuildInfo->description} <br />
        Banner image: {$getGuildInfo->banner} <br />
        Splash image: {$getGuildInfo->splash} <br />
        Total members: {$getGuildInfo->approximate_member_count} <br />
        Online: {$getGuildInfo->approximate_presence_count} <br />
      </div>
    </div>
  ";
  $infoBox = "
    <div class=\"boxContent\" style=\"background: none; overflow: hidden;\">
      <div style=\"width: 90vw; height: 45vh; overflow: hidden; display: flex;\">
        <div style=\"width: 45vw; height: 45vh; overflow: auto; margin: 1vh;\">
          <button class=\"channelButton\" style=\"background-image: none; height: 5vh;\">
            <div style=\"width: 45vw; float:right; font-size: 1.5rem; text-align: center;\">Main Settings</div>
          </button>
          Default Member Role<br />
          Streamer Notification Channel<br />
          Role to Ping for Streamer Notifications<br />
          Verification Method<br />
          Verification Channel<br />
        </div>
        <div style=\"width: 45vw; height: 45vh; overflow: auto; margin: 1vh;\">
          <button class=\"threadButton\" style=\"background-image: none; height: 5vh;\">
            <div style=\"width: 45vw; float:right; font-size: 1.5rem; text-align: center;\">Log Channels</div>
          </button>
          Ban Logs<br />
          Join Logs<br />
          Leave Logs<br />
          Kick Logs<br />
          Message Deletion Log<br />
          Message Edit Log<br />
          NickName Change Log<br />
          Name Change Log<br />
          TimeOut Log<br />
        </div>
      </div>
      <div style=\"width: 90vw; height: 45vh; overflow: hidden; display: flex;\">
        <div style=\"width: 45vw; height: 45vh; overflow: auto; margin: 1vh;\">
          <button class=\"channelButton\" style=\"background-image: none; height: 5vh;\">
            <div style=\"width: 45vw; float:right; font-size: 1.5rem; text-align: center;\">Topics</div>
          </button>
          Summary?<br />
          Summary?<br />
        </div>
        <div style=\"width: 45vw; height: 45vh; overflow: auto; margin: 1vh;\">
          <button class=\"threadButton\" style=\"background-image: none; height: 5vh;\">
            <div style=\"width: 45vw; float:right; font-size: 1.5rem; text-align: center;\">Streamers</div>
          </button>
          Streamer 1<br />
          Streamer 2<br />
        </div>
      </div>
    </div>
  ";
  $settingBox = "
    <div class=\"boxContent\">
      
    </div>
  ";
  $channelBox = "
    <div class=\"boxContent\" style=\"background: none; overflow: hidden;\">
      <div style=\"width: 89vw; height: 28vh; overflow: auto;\">
        <button class=\"voiceButton\" style=\"background-image: none; height: 5vh;\">
          <div style=\"width: 90vw; float:right; font-size: 1.5rem; text-align: center;\">Voice Channels</div>
        </button>
        {$channelVoiceHTML}
      </div>
      <div style=\"width: 90vw; height: 65vh; overflow: hidden; display: flex;\">
        <div style=\"width: 45vw; height: 65vh; overflow: auto; margin: 1vh;\">
          <button class=\"channelButton\" style=\"background-image: none; height: 5vh;\">
            <div style=\"width: 45vw; float:right; font-size: 1.5rem; text-align: center;\">Text Channels</div>
          </button>
          {$channelTextHTML}
        </div>
        <div style=\"width: 45vw; height: 65vh; overflow: auto; margin: 1vh;\">
          <button class=\"threadButton\" style=\"background-image: none; height: 5vh;\">
            <div style=\"width: 45vw; float:right; font-size: 1.5rem; text-align: center;\">Thread Channels</div>
          </button>
          {$channelThreadHTML}
        </div>
      </div>
    </div>
  ";
?>
