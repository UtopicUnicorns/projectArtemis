<?php
  //Not to be accessed
  if(count(get_included_files()) ==1) { 
    header('Location: https://artemis.rest/oops.php'); 
    exit();
  }
  
  if($flow) {
    //Initiate curl request
    $curl_h = curl_init('https://discord.com/api/v10/users/@me');
    curl_setopt($curl_h, CURLOPT_HTTPHEADER, array('authorization: Bearer ' . $_SESSION['uselessToken'],));
    curl_setopt($curl_h, CURLOPT_RETURNTRANSFER, true);
    
    //Execute curl request
    $response = curl_exec($curl_h);
    
    //Expect json, decode
    $userGot = json_decode($response, false);
    
    //If not logged in, but token is set, or token is expired
    if(isset($userGot->message)) {
      header('Location: https://artemis.rest/login.d/logout.d.php');
      die();
    }
    
    //Parse bot guilds
    $sysGuilds = [];
    foreach($botGuilds as $guild) {
      //Write to global
      global $sysGuilds;
      
      //Set values
      $sysGuilds[$guild[guildId]]['id'] = $guild[guildId];
      $sysGuilds[$guild[guildId]]['name'] = $guild[guildName];
      $sysGuilds[$guild[guildId]]['icon'] = $guild[guildIcon];
    }
    
    //Get user guilds
    $userGuilds = [];
    $userGuildsFetch = urlGet("https://discord.com/api/v10/users/@me/guilds?limit=200", 'authorization: Bearer ' . $_SESSION['uselessToken']);
    foreach($userGuildsFetch as $guild) {
      //Checks
      $uP = $guild->permissions;
      $mP = 1 << 5;
      $dP = $uP & $mP;
      
      if($dP == $mP) {
        if(isset($sysGuilds[$guild->id])) {
          //Write to global
          global $userGuilds;
          
          //Set values
          $userGuilds[$guild->id]['id'] = $guild->id;
          $userGuilds[$guild->id]['name'] = $guild->name;
          $userGuilds[$guild->id]['icon'] = $guild->icon;
          $userGuilds[$guild->id]['permissions'] = $guild->permissions;
        }
      }
    };
    
    //Check if get request is guild, else is user    
    if(isset($_GET['guild'])) {
      //Check if user has permissions for this guild
      if($userGuilds[$_GET['guild']]){
        //Get guild channels, info, threads
        $getGuildInfo = urlGet("https://discord.com/api/v10/guilds/{$_GET['guild']}?with_counts=true", 'authorization: Bot ' . $botToken);
        $getGuildChannels = urlGet("https://discord.com/api/v10/guilds/{$_GET['guild']}/channels", 'authorization: Bot ' . $botToken);
        $getGuildThreads = urlGet("https://discord.com/api/v10/guilds/{$_GET['guild']}/threads/active", 'authorization: Bot ' . $botToken);
        
        //Parse/order channels
        $guildChannels = [];
        foreach($getGuildThreads->threads as $thread) {
          //Write to global
          global $guildChannels;
          
          //Set values
          $guildChannels[$thread->id]['id'] = $thread->id;
          $guildChannels[$thread->id]['name'] = $thread->name;
          $guildChannels[$thread->id]['type'] = 'thread';
        };
        
        foreach($getGuildChannels as $channel) {
          //Write to global
          global $guildChannels;
          
          //Set values
          if($channel->type == 0) {
            $guildChannels[$channel->id]['id'] = $channel->id;
            $guildChannels[$channel->id]['name'] = $channel->name;
            $guildChannels[$channel->id]['type'] = 'channel';
          }
          
          if($channel->type == 2) {
            $guildChannels[$channel->id]['id'] = $channel->id;
            $guildChannels[$channel->id]['name'] = $channel->name;
            $guildChannels[$channel->id]['type'] = 'voice';
          }
        };
        
        //echo json_encode($guildChannels);
        //Content for page in state
        //$controlContent = json_encode($getGuildInfo);
        //roles {$getGuildInfo->roles}
        //emotes {$getGuildInfo->emojis}
        //stickers {$getGuildInfo->stickers}
        $controlContent = '
        <div class="conPaneHold">
          <div class="conPane" style="background: url(\'https://artemis.rest/img.d/user.svg\') no-repeat bottom center / contain;">'.$getGuildInfo->name.'<br />'.$getGuildInfo->id.'</div>
          <div class="conPane" style="background: url(\'https://cdn.discordapp.com/icons/' . $getGuildInfo->id . '/' .  $getGuildInfo->icon . '.png?size=1024\') no-repeat bottom center / contain;"></div>
          <div class="conPane" style="background: url(\'https://artemis.rest/img.d/people.svg\') no-repeat bottom center / contain;">Users: '.$getGuildInfo->approximate_member_count.'<br />Online: '.$getGuildInfo->approximate_presence_count.'</div>
          <div class="conPane" style="background: url(\'https://artemis.rest/img.d/channel.svg\') no-repeat bottom center / contain;">Channels:<br />'.count($guildChannels).'</div>
        </div>
        <br />';
      } else {
        //Content for page in state
        $controlContent = 'Bye';
      }
    } else {
      //Create guild list for user to click on.
      $guildList = '';
      foreach($userGuilds as $guild) { $guildList .= '<a href="control.d.php?guild='.$guild['id'].'" style="background: url(\'https://cdn.discordapp.com/icons/' . $guild['id'] . '/' .  $guild['icon'] . '.png?size=128\') no-repeat bottom right; background-size: contain;">'.$guild['name'].'</a><br />'; };
      
      //Content for page in state
      $controlContent = '
          <div class=\'guildSelector\'>    
            <p>Hover to select guild to edit</p>
            <div class=\'guildSelectorBlock\'>   
              '.$guildList.'
            </div>     
          </div>';
    }
    
  } else {
    //Reject page visit from non-users
    header('Location: https://artemis.rest/oops.php'); 
    exit();
  }
?>

