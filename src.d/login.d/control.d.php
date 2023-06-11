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
    $responseToPost = '';
    //Check if get request is guild, else is user    
    if(isset($_GET['guild'])) {
      //Check if user has permissions for this guild
      if($userGuilds[$_GET['guild']]){
        //If method is post
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
          
          if (!empty($_POST['guild'])) {
            $guildTemp = $_POST['guild'];
            if($userGuilds[$guildTemp]) {
              $makeTempConn = new mysqli('localhost', $sqlUser, $sqlPass);
              $makeTempConn->query("USE g$guildTemp;");
              $makeTempConn->query("UPDATE Settings SET id='', value='".$_POST['']."' WHERE id = '';");
              if (!empty($_POST['hiChanSettings'])) $makeTempConn->query("UPDATE Settings SET id='hiChanSettings', value='".$_POST['hiChanSettings']."' WHERE id = 'hiChanSettings';");
              if (!empty($_POST['hiMsgSettings'])) $makeTempConn->query("UPDATE Settings SET id='hiMsgSettings', value='".$_POST['hiMsgSettings']."' WHERE id = 'hiMsgSettings';");
              if (!empty($_POST['memberRoleSettings'])) $makeTempConn->query("UPDATE Settings SET id='memberRoleSettings', value='".$_POST['memberRoleSettings']."' WHERE id = 'memberRoleSettings';");
              if (!empty($_POST['streamerChannelSettings'])) $makeTempConn->query("UPDATE Settings SET id='streamerChannelSettings', value='".$_POST['streamerChannelSettings']."' WHERE id = 'streamerChannelSettings';");
              if (!empty($_POST['streamerRoleSettings'])) $makeTempConn->query("UPDATE Settings SET id='streamerRoleSettings', value='".$_POST['streamerRoleSettings']."' WHERE id = 'streamerRoleSettings';");
              if (!empty($_POST['verificationChannelSettings'])) $makeTempConn->query("UPDATE Settings SET id='verificationChannelSettings', value='".$_POST['verificationChannelSettings']."' WHERE id = 'verificationChannelSettings';");
              if (!empty($_POST['verificationMethodSettings'])) $makeTempConn->query("UPDATE Settings SET id='verificationMethodSettings', value='".$_POST['verificationMethodSettings']."' WHERE id = 'verificationMethodSettings';");
              
              if (!empty($_POST['banEventLog'])) $makeTempConn->query("UPDATE Logs SET id='banEventLog', value='".$_POST['banEventLog']."' WHERE id = 'banEventLog';");
              if (!empty($_POST['kickEventLog'])) $makeTempConn->query("UPDATE Logs SET id='kickEventLog', value='".$_POST['kickEventLog']."' WHERE id = 'kickEventLog';");
              if (!empty($_POST['joinEventLog'])) $makeTempConn->query("UPDATE Logs SET id='joinEventLog', value='".$_POST['joinEventLog']."' WHERE id = 'joinEventLog';");
              if (!empty($_POST['leaveEventLog'])) $makeTempConn->query("UPDATE Logs SET id='leaveEventLog', value='".$_POST['leaveEventLog']."' WHERE id = 'leaveEventLog';");
              if (!empty($_POST['messageDeleteEventLog'])) $makeTempConn->query("UPDATE Logs SET id='messageDeleteEventLog', value='".$_POST['messageDeleteEventLog']."' WHERE id = 'messageDeleteEventLog';");
              if (!empty($_POST['messageEditEventLog'])) $makeTempConn->query("UPDATE Logs SET id='messageEditEventLog', value='".$_POST['messageEditEventLog']."' WHERE id = 'messageEditEventLog';");
              if (!empty($_POST['timeOutEventLog'])) $makeTempConn->query("UPDATE Logs SET id='timeOutEventLog', value='".$_POST['timeOutEventLog']."' WHERE id = 'timeOutEventLog';");
              if (!empty($_POST['nickNameChangeEventLog'])) $makeTempConn->query("UPDATE Logs SET id='nickNameChangeEventLog', value='".$_POST['nickNameChangeEventLog']."' WHERE id = 'nickNameChangeEventLog';");
              $responseToPost = '<div class="conPane" style="border-radius: 0; margin: 0; width: 100%; height: 5%;">SETTINGS RESPONSE</div><p>Success: Settings have been saved.</p>';
            } else {
              $responseToPost = '<div class="conPane" style="border-radius: 0; margin: 0; width: 100%; height: 5%;">SETTINGS RESPONSE</div><p>Warning: Selected server is not in your accessble serverlist.</p>';
            }
          } else {
            $responseToPost = '<div class="conPane" style="border-radius: 0; margin: 0; width: 100%; height: 5%;">SETTINGS RESPONSE</div><p>Warning: No guild was posted.</p>';
          } 
        }
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
        //echo json_encode($getGuildInfo->roles);
        //Fetch information
        $controllingSql = new mysqli('localhost', $sqlUser, $sqlPass);
        $controlInfo = $controllingSql->query("USE g$getGuildInfo->id;");
        if(!$controlInfo) die("control.d #\107");
        $settingsQuery = $controllingSql->query("SELECT * FROM Settings;");
        if(!$settingsQuery) die("control.d #\109");
        $logQuery = $controllingSql->query("SELECT * FROM Logs;");
        if(!$logQuery) die("control.d #\111");
        
        //Parse information
        $parsedSqlSettings = [];
        $parsedSqlLogs = [];
        $channelsSelect = '';
        $voiceSelect = '';
        $threadsSelect = '';
        $rolesParsed = [];
        $rolesSelect = '';
        
        foreach($getGuildInfo->roles as $role) {
          global $rolesParsed;
          $rolesParsed[$role->id]['id'] = $role->id;
          $rolesParsed[$role->id]['name'] = $role->name;
          $rolesSelect .= '<option value="'.$role->id.'">'.$role->name.'</option>';
        }
        
        foreach($guildChannels as $channels) {
          global $channelsSelect;
          if($channels['type'] == 'channel') $channelsSelect .= '<option value="'.$channels['id'].'">'.$channels['name'].'</option>';
          if($channels['type'] == 'voice') $voiceSelect .= '<option value="'.$channels['id'].'">'.$channels['name'].'</option>';
          if($channels['type'] == 'thread') $threadsSelect .= '<option value="'.$channels['id'].'">'.$channels['name'].'</option>';
        }
        
        foreach($settingsQuery as $sq) { 
          global $parsedSqlSettings;
          if($sq['id'] == 'hiChanSettings') {
            if($guildChannels[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$guildChannels[$sq['value']]['name'].'</option>';
            if(!$guildChannels[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="NONE" selected>Not set</option>';
          }
          
          if($sq['id'] == 'hiMsgSettings') {
            $parsedSqlSettings[$sq['id']] = $sq['value'];
          }
          
          if($sq['id'] == 'memberRoleSettings') {
            if($rolesParsed[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$rolesParsed[$sq['value']]['name'].'</option>';
            if(!$rolesParsed[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="NONE" selected>Not set</option>';
          }
          
          if($sq['id'] == 'streamerChannelSettings') {
            if($guildChannels[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$guildChannels[$sq['value']]['name'].'</option>';
            if(!$guildChannels[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="NONE" selected>Not set</option>';
          }
          
          if($sq['id'] == 'streamerRoleSettings') {
            if($rolesParsed[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$rolesParsed[$sq['value']]['name'].'</option>';
            if(!$rolesParsed[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="NONE" selected>Not set</option>';
          }
          
          if($sq['id'] == 'verificationChannelSettings') {
            if($guildChannels[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$guildChannels[$sq['value']]['name'].'</option>';
            if(!$guildChannels[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="NONE" selected>Not set</option>';
          }
          
          if($sq['id'] == 'verificationMethodSettings') {
            $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$sq['value'].'</option>';
          }
          
        };
        
        foreach($logQuery as $lq) {
          global $parsedSqlLogs;
          if($guildChannels[$lq['value']]['name']) $parsedSqlLogs[$lq['id']] = '<option value="'.$lq['value'].'" selected>'.$guildChannels[$lq['value']]['name'].'</option>';
          if(!$guildChannels[$lq['value']]['name']) $parsedSqlLogs[$lq['id']] = '<option value="NONE" selected>Not set</option>';
        };
        
        //Output information
        $controlContent = '
        <!-- stat panes -->
        <div class="conPaneHold">
          <div class="conPane" style="background: url(\'https://artemis.rest/img.d/user.svg\') no-repeat bottom center / contain;">'.$getGuildInfo->name.'<br />'.$getGuildInfo->id.'</div>
          <div class="conPane" style="background: url(\'https://cdn.discordapp.com/icons/' . $getGuildInfo->id . '/' .  $getGuildInfo->icon . '.png?size=1024\') no-repeat bottom center / contain;"></div>
          <div class="conPane" style="background: url(\'https://artemis.rest/img.d/people.svg\') no-repeat bottom center / contain;">Users: '.$getGuildInfo->approximate_member_count.'<br />Online: '.$getGuildInfo->approximate_presence_count.'</div>
          <div class="conPane" style="background: url(\'https://artemis.rest/img.d/channel.svg\') no-repeat bottom center / contain;">Channels:<br />'.count($guildChannels).'</div>
        </div>
        
        '.$responseToPost.'
        
        <!-- Init form -->
        <form method="post" action="'.$_SERVER['PHP_SELF'].'?guild='.$getGuildInfo->id.'" id="eventLogs"><br />
        
          <!-- General settings -->
          <div class="conPane" style="border-radius: 0; margin: 0; width: 100%; height: 5%;">General settings</div>
          <p><div class="tooltip">Welcoming channel &#x1F6C8;
              <span class="tooltiptext">
                Users will be greeted and identified by the bot when this channel is set.<br /><br />
                <img src="https://artemis.rest/img.d/controller.d/welcomeChan.png" />
              </span>
            </div></p>
            <select name="hiChanSettings" id="hiChanSettings">
              <optgroup label="Current">
                '.$parsedSqlSettings['hiChanSettings'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
          
          <p><div class="tooltip">Welcoming message &#x1F6C8;
              <span class="tooltiptext">
                When set to anything but NONE, a button will be attached to the greeting with the welcome text.<br /><br />
                <img src="https://artemis.rest/img.d/controller.d/welcomeMsg.png" />
              </span>
            </div></p>
            <textarea id="hiMsgSettings" name="hiMsgSettings" maxlength="1500" rows="5" cols="33">'.$parsedSqlSettings['hiMsgSettings'].'</textarea><br /><br />
          
          <p><div class="tooltip">Member role &#x1F6C8;
              <span class="tooltiptext">This role will be given to users when they join the server, when they get it depends on the verification method.</span>
            </div></p>
            <select name="memberRoleSettings" id="memberRoleSettings">
              <optgroup label="Current">
                '.$parsedSqlSettings['memberRoleSettings'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable role</option>
              </optgroup>
              <optgroup label="Roles">
                '.$rolesSelect.'
              </optgroup>
            </select><br /><br />
          
          <p><div class="tooltip">Streamer channel &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="streamerChannelSettings" id="streamerChannelSettings">
              <optgroup label="Current">
                '.$parsedSqlSettings['streamerChannelSettings'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
          
          <p><div class="tooltip">Streaming ping role &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="streamerRoleSettings" id="streamerRoleSettings">
              <optgroup label="Current">
                '.$parsedSqlSettings['streamerRoleSettings'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable role</option>
              </optgroup>
              <optgroup label="Roles">
                '.$rolesSelect.'
              </optgroup>
            </select><br /><br />
          
          <p><div class="tooltip">Verification channel &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="verificationChannelSettings" id="verificationChannelSettings">
              <optgroup label="Current">
                '.$parsedSqlSettings['verificationChannelSettings'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
          
          <p><div class="tooltip">Verification method &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="verificationMethodSettings" id="verificationMethodSettings">
              <optgroup label="Current">
                '.$parsedSqlSettings['verificationMethodSettings'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable method</option>
              </optgroup>
              <optgroup label="Method">
                <option value="rules">Rules accept</option>
                <option value="native">Discord native gating</option>
                <option value="button">Button</option>
                <option value="hello">Hello Artemis</option>
              </optgroup>
            </select><br /><br />
          
          <!-- Logs settings -->
          <div class="conPane" style="border-radius: 0; margin: 0; width: 100%; height: 5%;">Logs settings</div>
            <p><div class="tooltip">Ban event channel &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="banEventLog" id="banEventLog">
              <optgroup label="Current">
                '.$parsedSqlLogs['banEventLog'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
            
            <p><div class="tooltip">Join event channel &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="joinEventLog" id="joinEventLog">
              <optgroup label="Current">
                '.$parsedSqlLogs['joinEventLog'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
            
            <p><div class="tooltip">Kick event channel &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="kickEventLog" id="kickEventLog">
              <optgroup label="Current">
                '.$parsedSqlLogs['kickEventLog'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
            
            <p><div class="tooltip">Leave event channel &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="leaveEventLog" id="leaveEventLog">
              <optgroup label="Current">
                '.$parsedSqlLogs['leaveEventLog'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
            
            <p><div class="tooltip">Message delete event channel &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="messageDeleteEventLog" id="messageDeleteEventLog">
              <optgroup label="Current">
                '.$parsedSqlLogs['messageDeleteEventLog'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
            
            <p><div class="tooltip">Message edit event channel &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="messageEditEventLog" id="messageEditEventLog">
              <optgroup label="Current">
                '.$parsedSqlLogs['messageEditEventLog'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
            
            <p><div class="tooltip">Timeout event channel &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="timeOutEventLog" id="timeOutEventLog">
              <optgroup label="Current">
                '.$parsedSqlLogs['timeOutEventLog'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
            
            <p><div class="tooltip">Nickname change event channel &#x1F6C8;
              <span class="tooltiptext">Tooltip text</span>
            </div></p>
            <select name="nickNameChangeEventLog" id="nickNameChangeEventLog">
              <optgroup label="Current">
                '.$parsedSqlLogs['nickNameChangeEventLog'].'
              </optgroup>
              <optgroup label="Disable">
                <option value="NONE">Disable log</option>
              </optgroup>
              <optgroup label="Channels">
                '.$channelsSelect.'
              </optgroup>
              <optgroup label="Voice Channels">
                '.$voiceSelect.'
              </optgroup>
              <optgroup label="Threads">
                '.$threadsSelect.'
              </optgroup>
            </select><br /><br />
          <input type="hidden" id="guild" name="guild" value="'.$getGuildInfo->id.'" />
          <input type="submit" class="submit" value="Save options">
          <br /><br /><br /><br /><br /><br /><br /><br />
        <!-- End form -->
        </form>
          ';
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

