<?php
  foreach ($guildsWeShare as $guildLoop) {
    if ($_GET["guild"] == $guildLoop->id) {
      $permInt = $guildLoop->permissions;
      $needPerm = 1 << 5;
      $calcPerm = $permInt & $needPerm;
      if($calcPerm == $needPerm) {
        $guildCheck = urlGet("https://discord.com/api/v10/guilds/" . $guildLoop->id . "/channels", 'authorization: Bot ' . $botToken);
        $guildThreadCheck = urlGet("https://discord.com/api/v10/guilds/" . $guildLoop->id . "/threads/active", 'authorization: Bot ' . $botToken);
        
        $bindChannels = '<option value="NONE">NONE/UNBIND</option>';
        
        foreach ($guildCheck as $guildChannels) {
          if($guildChannels->type == 0) {
            $bindChannels .= '<option value="' . $guildChannels->id . '"># ' . $guildChannels->name . '</option>';  
          }
        }
        
        foreach($guildThreadCheck->threads as $guildThreadChannel) {
          $bindChannels .=  '<option value="' . $guildThreadChannel->id . '">⌥ ' . $guildThreadChannel->name . '</option>'; 
        }
        
        $leftContent = '';
        //include './panel.d/configd.php';
        // Create connection
        $conn = mysqli_connect('localhost', $sqlUser, $sqlPass, 'artemis');
        
        // Check connection
        if (!$conn) {
          die("Connection failed: " . mysqli_connect_error());
        }
        
         $leftContent .= $conn->query("SELECT 'username' FROM 'gundefined' WHERE 'username' LIKE '.initrd'");
        //$leftContent .= "Connected successfully";

        $rightContent = '<button class="guildSettingsCog" style="font-size: 2rem;">
                           Log Settings
                         </button>
                         
                         <button class="guildSettingsCog">
                          Join Event Log Channel<br>
                          <select class="guildSettingsSelecting" name="joinEventLog" id="joinEventLog">
                            ' . $bindChannels . '
                          </select>
                         </button>
                         
                         <button class="guildSettingsCog">
                          Leave Event Log Channel<br>
                          <select class="guildSettingsSelecting" name="leaveEventLog" id="leaveEventLog">
                            ' . $bindChannels . '
                          </select>
                         </button>
                         
                         <button class="guildSettingsCog">
                          Username Change Event Log Channel<br>
                          <select class="guildSettingsSelecting" name="userNameChangeEventLog" id="userNameChangeEventLog">
                            ' . $bindChannels . '
                          </select>
                         </button>
                         
                         <button class="guildSettingsCog">
                          Nickname Change Event Log Channel<br>
                          <select class="guildSettingsSelecting" name="nickNameChangeEventLog" id="nickNameChangeEventLog">
                            ' . $bindChannels . '
                          </select>
                         </button>
                         
                         <button class="guildSettingsCog">
                          Kick Event Log Channel<br>
                          <select class="guildSettingsSelecting" name="kickEventLog" id="joinEventLog">
                            ' . $bindChannels . '
                          </select>
                         </button>
                         
                         <button class="guildSettingsCog">
                          Ban Event Log Channel<br>
                          <select class="guildSettingsSelecting" name="banEventLog" id="joinEventLog">
                            ' . $bindChannels . '
                          </select>
                         </button>
                         
                         <button class="guildSettingsCog">
                          Timeout Event Log Channel<br>
                          <select class="guildSettingsSelecting" name="timeOutEventLog" id="timeOutEventLog">
                            ' . $bindChannels . '
                          </select>
                         </button>
                         
                         <button class="guildSettingsCog">
                          Message Edit Event Log Channel<br>
                          <select class="guildSettingsSelecting" name="messageEditEventLog" id="messageEditEventLog">
                            ' . $bindChannels . '
                          </select>
                         </button>
                         
                         <button class="guildSettingsCog">
                          Message Delete Event Log Channel<br>
                          <select class="guildSettingsSelecting" name="messageDeleteEventLog" id="messageDeleteEventLog">
                            ' . $bindChannels . '
                          </select>
                         </button>';  
        
      }
      
      if($guildLoop->icon) {
          $guildAvatar = 'https://cdn.discordapp.com/icons/' . $guildLoop->id . '/' .  $guildLoop->icon. '.png?size=256';
        } else {
          $guildAvatar = './images/icons/user.svg';
        }
        
      $guildBanner = './images/backgrounds/2.png';
        
      if($guildLoop->owner == true) {
          $ownedGuild =  '<div style="background-color: rgba(255, 255, 255, 0.7); transform: rotate(45deg); position: relative; top: 0px; right: 0px; display: grid; place-items: center; height: 20%; width: 100%;">
                            <a id="nameInUserPanel">YOUR GUILD</a>
                          </div>';
        } else {
          $ownedGuild = '';
        }
        
      $siteContext = '<div style="width: 100%; height: 25%; background-size: cover; background-repeat: no-repeat; overflow: hidden; background-position: center; background-image: url(\'' . $guildBanner . '\'); display: flex; place-items: center left;">
                        <img src="' . $guildAvatar . '" style="height: 25vh; border-radius: 500px; margin-left: 50px; box-shadow: 5px 5px 2px black;" /><h1 style="margin-left: 20px;" id="nameInUserPanel"> ' . $guildLoop->name . '<br />' . $guildLoop->id . '</h1>
                        '. $ownedGuild .'
                      </div>
                      <div style="width: 100%; height: 65%; background-color: rgba(255, 255, 255, 0.5); display: flex; place-items: center;">
                        <div style="width: 50%; height: 100%; overflow: auto;">' .  $leftContent .  '</div>
                        <div style="width: 50%; height: 100%; overflow: auto;">' .  $rightContent .  '</div>
                      </div>
                      <div style="width: 100%; height: 10%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'./images/assets/project_artemis_background.svg\'); background-color: rgba(255, 255, 255, 0.7); display: grid; place-items: center;">
                        <!--Just a footer-->
                      </div>';
    }
  }
?>
