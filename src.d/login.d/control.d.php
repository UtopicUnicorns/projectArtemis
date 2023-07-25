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
      $sysGuilds[$guild['guildId']]['id'] = $guild['guildId'];
      $sysGuilds[$guild['guildId']]['name'] = $guild['guildName'];
      $sysGuilds[$guild['guildId']]['icon'] = $guild['guildIcon'];
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
              //$makeTempConn->query("UPDATE Settings SET id='', value='".$_POST['']."' WHERE id = '';");
              if (!empty($_POST['hiChanSettings'])) $makeTempConn->query("UPDATE Settings SET id='hiChanSettings', value='".$_POST['hiChanSettings']."' WHERE id = 'hiChanSettings';");
              if (!empty($_POST['hiMsgSettings'])) $makeTempConn->query("UPDATE Settings SET id='hiMsgSettings', value='".$makeTempConn -> real_escape_string($_POST['hiMsgSettings'])."' WHERE id = 'hiMsgSettings';");
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
        
        //Fetch information
        $controllingSql = new mysqli('localhost', $sqlUser, $sqlPass);
        $controlInfo = $controllingSql->query("USE g$getGuildInfo->id;");
        if(!$controlInfo) die("control.d # 107<br />Guild was not found, or not yet made in database.<br /><a href=\"https://artemis.rest\">Go back to home page</a>");
        $settingsQuery = $controllingSql->query("SELECT * FROM Settings;");
        if(!$settingsQuery) die("control.d # 109");
        $logQuery = $controllingSql->query("SELECT * FROM Logs;");
        if(!$logQuery) die("control.d # 111");
        
        //Parse information
        $parsedSqlSettings = [];
        $parsedSqlLogs = [];
        $channelsSelect = '';
        $voiceSelect = '';
        $threadsSelect = '';
        $rolesParsed = [];
        $rolesSelect = '';
        $chanAutocomplete = [];
        $roleAutocomplete = [];
        
        foreach($getGuildInfo->roles as $role) {
          global $rolesParsed;
          global $roleAutocomplete;
          array_push($roleAutocomplete, array('id' => $role->id, 'name' => $role->name));
          $rolesParsed[$role->id]['id'] = $role->id;
          $rolesParsed[$role->id]['name'] = $role->name;
          $rolesSelect .= '<option value="'.$role->id.'">'.$role->name.'</option>';
        }
        
        foreach($guildChannels as $channels) {
          global $channelsSelect;
          global $chanAutocomplete;
          array_push($chanAutocomplete, array('id' => $channels['id'], 'name' => $channels['name']));
          if($channels['type'] == 'channel') $channelsSelect .= '<option value="'.$channels['id'].'">'.$channels['name'].'</option>';
          if($channels['type'] == 'voice') $voiceSelect .= '<option value="'.$channels['id'].'">'.$channels['name'].'</option>';
          if($channels['type'] == 'thread') $threadsSelect .= '<option value="'.$channels['id'].'">'.$channels['name'].'</option>';
        }
        
        foreach($settingsQuery as $sq) { 
          global $parsedSqlSettings;
          if($sq['id'] == 'hiChanSettings') {
            if($sq['value'] !== 'NONE') if($guildChannels[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$guildChannels[$sq['value']]['name'].'</option>';
            if($sq['value'] == 'NONE') $parsedSqlSettings[$sq['id']] = '<option value="NONE" selected>Not set</option>';
          }
          
          if($sq['id'] == 'hiMsgSettings') {
            $parsedSqlSettings[$sq['id']] = $sq['value'];
          }
          
          if($sq['id'] == 'memberRoleSettings') {
            if($sq['value'] !== 'NONE') if($rolesParsed[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$rolesParsed[$sq['value']]['name'].'</option>';
            if($sq['value'] == 'NONE') $parsedSqlSettings[$sq['id']] = '<option value="NONE" selected>Not set</option>';
          }
          
          if($sq['id'] == 'streamerChannelSettings') {
            if($sq['value'] !== 'NONE') if($guildChannels[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$guildChannels[$sq['value']]['name'].'</option>';
            if($sq['value'] == 'NONE') $parsedSqlSettings[$sq['id']] = '<option value="NONE" selected>Not set</option>';
          }
          
          if($sq['id'] == 'streamerRoleSettings') {
            if($sq['value'] !== 'NONE') if($rolesParsed[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$rolesParsed[$sq['value']]['name'].'</option>';
            if($sq['value'] == 'NONE') $parsedSqlSettings[$sq['id']] = '<option value="NONE" selected>Not set</option>';
          }
          
          if($sq['id'] == 'verificationChannelSettings') {
            if($sq['value'] !== 'NONE') if($guildChannels[$sq['value']]['name']) $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$guildChannels[$sq['value']]['name'].'</option>';
            if($sq['value'] == 'NONE') $parsedSqlSettings[$sq['id']] = '<option value="NONE" selected>Not set</option>';
          }
          
          if($sq['id'] == 'verificationMethodSettings') {
            $parsedSqlSettings[$sq['id']] = '<option value="'.$sq['value'].'" selected>'.$sq['value'].'</option>';
          }
          
        };
        
        foreach($logQuery as $lq) {
          global $parsedSqlLogs;
          if($lq['value'] !== 'NONE') if($guildChannels[$lq['value']]['name']) $parsedSqlLogs[$lq['id']] = '<option value="'.$lq['value'].'" selected>'.$guildChannels[$lq['value']]['name'].'</option>';
          if($lq['value'] == 'NONE') $parsedSqlLogs[$lq['id']] = '<option value="NONE" selected>Not set</option>';
        };
        
        //Output information
        $controlContent = '
          <a class="contentBoxed" style="padding: 1vh; background-color: rgba(255, 0, 0, 0.1);">
            '.$responseToPost.'
        
            <!-- Init form -->
            <form method="post" action="'.$_SERVER['PHP_SELF'].'?guild='.$getGuildInfo->id.'" id="guildStuff"><br />
            
              <!-- General settings -->
              <div class="conPane" style="border-radius: 0; margin: 0; width: 100%; height: 5%;">General settings</div>
              <p><div class="tooltip">Welcoming channel &#x1F6C8;
                  <span class="tooltiptext">
                    Users will be greeted and identified by the bot when this channel is set.
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
                    When set to anything but NONE, a button will be attached to the greeting with the welcome text.
                  </span>
                </div></p>
                <textarea id="hiMsgSettings" name="hiMsgSettings" maxlength="1500" rows="5" cols="33">'.$parsedSqlSettings['hiMsgSettings'].'</textarea>
                <script>let autoChan = '.JSON_encode($chanAutocomplete).'; let autoRole = '.JSON_encode($roleAutocomplete).';</script>
                <div class="stickToText" id="complete"></div>
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
                  <span class="tooltiptext">When you have streamers in your server settings, then the bot will accounce it here when they go online.</span>
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
                  <span class="tooltiptext">This role will be pinged when a streamer in your server goes online</span>
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
                  <span class="tooltiptext">If you use either the Hello method or the Button method, then this channel will be used for verification</span>
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
                  <span class="tooltiptext">
                    Rules accept: User gets member role when user accepts discord\'s native rule gate.<br /><br />
                    Button: In the verification channel new users will need to press a button to get verified.<br /><br />
                    Hello Artemis: The classic Hello Artemis challenge, upon completion the user is verified.
                  </span>
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
                    <option value="button">Button</option>
                    <option value="hello">Hello Artemis</option>
                  </optgroup>
                </select><br /><br />
              
              <!-- Logs settings -->
              <div class="conPane" style="border-radius: 0; margin: 0; width: 100%; height: 5%;">Logs settings</div>
                <p><div class="tooltip">Ban event channel &#x1F6C8;
                  <span class="tooltiptext">When a user gets banned it will be displayed in this channel.</span>
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
                  <span class="tooltiptext">When a joins your server it will be displayed in this channel.</span>
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
                  <span class="tooltiptext">When a user gets kicked it will be displayed in this channel.</span>
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
                  <span class="tooltiptext">When an user leaves your server it will be displayed in this channel.</span>
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
                  <span class="tooltiptext">When a message gets deleted it will be emit information about the message in this channel. (No message contents)</span>
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
                  <span class="tooltiptext">Message edits will be displayed here.</span>
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
                  <span class="tooltiptext">When a user gets timed-out it will be displayed in this channel.</span>
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
                  <span class="tooltiptext">When an user changed their nickname it will be displayed here.</span>
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
            <!-- End form -->
            </form>
          </a>
          <a href="https://artemis.rest/control.d.php" class="foot" style="background-color: rgba(0, 255, 0, 0.1);">Back to guild list</a>
          
          <a style="background-color: rgba(255, 0, 0, 0.1);"><div class="imgBut" style="background-image: url(\'https://artemis.rest/img.d/icon.d/user.svg\');"/>'.$getGuildInfo->name.'<br />'.$getGuildInfo->id.'</div></a>
          <a class="foot" style="background-color: rgba(0, 255, 0, 0.1); background: url(\'https://cdn.discordapp.com/icons/' . $getGuildInfo->id . '/' .  $getGuildInfo->icon . '.png?size=1024\') no-repeat bottom center / contain;"></a>
          <a style="background-color: rgba(0, 0, 255, 0.1);"><div class="imgBut" style="background-image: url(\'https://artemis.rest/img.d/icon.d/people.svg\');"/>Users: '.$getGuildInfo->approximate_member_count.'<br />Online: '.$getGuildInfo->approximate_presence_count.'</div></a>
          <a style="background-color: rgba(0, 255, 255, 0.1);"><div class="imgBut" style="background-image: url(\'https://artemis.rest/img.d/icon.d/channel.svg\');"/>Channels:<br />'.count($guildChannels).'</div></a>
          <a style="background-color: rgba(255, 0, 255, 0.1);"><input type="submit" class="sepSave" form="guildStuff" value="Save"/></a>
          <a href="https://artemis.rest/index.php" style="background-color: rgba(255, 255, 255, 0.1);"><div class="imgBut" style="background-image: url(\'https://artemis.rest/img.d/icon.d/home.svg\');"/>home</div></a>';
      } else {
        //Content for page in state
        $controlContent = 'Bye';
      }
    } else {
      //Create guild list for user to click on.
      $guildList = '';
      foreach($userGuilds as $guild) { $guildList .= '<form action="https://artemis.rest/control.d.php"><input type="hidden" id="guild" name="guild" value="'.$guild['id'].'" /><input class="gSelB" style="background: url(\'https://cdn.discordapp.com/icons/' . $guild['id'] . '/' .  $guild['icon'] . '.png?size=128\') no-repeat bottom right; background-size: contain;" type="submit" value="'.$guild['name'].'"></form><br />'; };
      
      //Content for page in state
      $controlContent = '
        <a class="contentBoxed" style="padding: 1vh; background-color: rgba(255, 0, 0, 0.1);">
          '.$guildList.'             
        </a>
        <a class="foot" style="background-color: rgba(0, 255, 0, 0.1);"></a>
        
        <a class="secondPane" style="background-color: rgba(255, 0, 0, 0.1);"></a>
        <a class="secondPane" style="background-color: rgba(0, 255, 0, 0.1);"></a>
        <a class="secondPane" style="background-color: rgba(0, 0, 255, 0.1);"></a>
        <a class="secondPane" style="background-color: rgba(0, 255, 255, 0.1);"></a>
        <a class="secondPane" style="background-color: rgba(255, 0, 255, 0.1);"></a>
        <a href="https://artemis.rest/index.php" style="background-color: rgba(255, 255, 255, 0.1);"><div class="imgBut" style="background-image: url(\'https://artemis.rest/img.d/icon.d/home.svg\');"/>home</div></a>';
    }
    
  } else {
    //Reject page visit from non-users
    header('Location: https://artemis.rest/oops.php'); 
    exit();
  }
?>

