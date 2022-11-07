<?php
  foreach ($guildsWeShare as $guildLoop) {
    if ($_GET["guild"] == $guildLoop->id) {
      $permInt = $guildLoop->permissions;
      $needPerm = 1 << 5;
      $calcPerm = $permInt & $needPerm;
      if($calcPerm == $needPerm) {
        include './panel.d/guildDatabaseGet.php';
        if($_GET["verificationMethodSettings"]) $connection->query("UPDATE Settings SET value = '" . $_GET["verificationMethodSettings"] . "' WHERE id = 'verificationMethodSettings'");
        if($_GET["verificationChannelSettings"]) $connection->query("UPDATE Settings SET value = '" . $_GET["verificationChannelSettings"] . "' WHERE id = 'verificationChannelSettings'");
        if($_GET["memberRoleSettings"]) $connection->query("UPDATE Settings SET value = '" . $_GET["memberRoleSettings"] . "' WHERE id = 'memberRoleSettings'");
        
        if($_GET["streamerChannelSettings"]) $connection->query("UPDATE Settings SET value = '" . $_GET["streamerChannelSettings"] . "' WHERE id = 'streamerChannelSettings'");
        if($_GET["streamerRoleSettings"]) $connection->query("UPDATE Settings SET value = '" . $_GET["streamerRoleSettings"] . "' WHERE id = 'streamerRoleSettings'");
        
        if($_GET["joinEventLog"]) $connection->query("UPDATE Logs SET value = '" . $_GET["joinEventLog"] . "' WHERE id = 'joinEventLog'");
        if($_GET["leaveEventLog"]) $connection->query("UPDATE Logs SET value = '" . $_GET["leaveEventLog"] . "' WHERE id = 'leaveEventLog'");
        if($_GET["userNameChangeEventLog"]) $connection->query("UPDATE Logs SET value = '" . $_GET["userNameChangeEventLog"] . "' WHERE id = 'userNameChangeEventLog'");
        if($_GET["nickNameChangeEventLog"]) $connection->query("UPDATE Logs SET value = '" . $_GET["nickNameChangeEventLog"] . "' WHERE id = 'nickNameChangeEventLog'");
        if($_GET["kickEventLog"]) $connection->query("UPDATE Logs SET value = '" . $_GET["kickEventLog"] . "' WHERE id = 'kickEventLog'");
        if($_GET["banEventLog"]) $connection->query("UPDATE Logs SET value = '" . $_GET["banEventLog"] . "' WHERE id = 'banEventLog'");
        if($_GET["timeOutEventLog"]) $connection->query("UPDATE Logs SET value = '" . $_GET["timeOutEventLog"] . "' WHERE id = 'timeOutEventLog'");
        if($_GET["messageEditEventLog"]) $connection->query("UPDATE Logs SET value = '" . $_GET["messageEditEventLog"] . "' WHERE id = 'messageEditEventLog'");
        if($_GET["messageDeleteEventLog"]) $connection->query("UPDATE Logs SET value = '" . $_GET["messageDeleteEventLog"] . "' WHERE id = 'messageDeleteEventLog'");
        
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
        
        $joinSelectLog = '<option value="' . $joinEventLog . '" selected>' . $numNameChan[$joinEventLog] . '</option>';
        $joinSelectLog .= $bindChannels;
        
        $leaveSelectLog = '<option value="' . $leaveEventLog . '" selected>' . $numNameChan[$leaveEventLog] . '</option>';
        $leaveSelectLog .= $bindChannels;
        
        $nameSelectLog = '<option value="' . $userNameChangeEventLog . '" selected>' . $numNameChan[$userNameChangeEventLog] . '</option>';
        $nameSelectLog .= $bindChannels;
        
        $nickSelectLog = '<option value="' . $nickNameChangeEventLog . '" selected>' . $numNameChan[$nickNameChangeEventLog] . '</option>';
        $nickSelectLog .= $bindChannels;
        
        $kickSelectLog = '<option value="' . $kickEventLog . '" selected>' . $numNameChan[$kickEventLog] . '</option>';
        $kickSelectLog .= $bindChannels;
        
        $banSelectLog = '<option value="' . $banEventLog . '" selected>' . $numNameChan[$banEventLog] . '</option>';
        $banSelectLog .= $bindChannels;
        
        $timeoutSelectLog = '<option value="' . $timeOutEventLog . '" selected>' . $numNameChan[$timeOutEventLog] . '</option>';
        $timeoutSelectLog .= $bindChannels;
        
        $msgeditSelectLog = '<option value="' . $messageEditEventLog . '" selected>' . $numNameChan[$messageEditEventLog] . '</option>';
        $msgeditSelectLog .= $bindChannels;
        
        $msgdelSelectLog = '<option value="' . $messageDeleteEventLog . '" selected>' . $numNameChan[$messageDeleteEventLog] . '</option>';
        $msgdelSelectLog .= $bindChannels;
        
        $verMethodNames = [];
        $verMethodNames['NONE'] .= 'No Verification';
        $verMethodNames['helloMethod'] .= 'Hello Artemis Challenge';
        $verMethodNames['buttonMethod'] .= 'Button Click Challenge';
        $verMethodNames['discordMethod'] .= 'Discord Built-in Gateway';
        
        $verMethodSel = '<option value="' . $verificationMethodSettings . '" selected>' . $verMethodNames[$verificationMethodSettings] . '</option>';
        $verMethodSel .= '<option value="NONE">No Verification</option>
                          <option value="helloMethod">Hello Artemis Challenge</option>
                          <option value="buttonMethod">Button Click Challenge</option>
                          <option value="discordMethod">Discord Built-in Gateway</option>';
        
        $verChannelSel = '<option value="' . $verificationChannelSettings . '" selected>' . $numNameChan[$verificationChannelSettings] . '</option>';
        $verChannelSel .= $bindChannels;
        
        $defRoleSel = '<option value="' . $memberRoleSettings . '" selected>' . $numNameRole[$memberRoleSettings] . '</option>';
        $defRoleSel .= $bindRoles;
        
        $streamChannelSel = '<option value="' . $streamerChannelSettings . '" selected>' . $numNameChan[$streamerChannelSettings] . '</option>';
        $streamChannelSel .= $bindChannels;
        
        $streamRoleSel = '<option value="' . $streamerRoleSettings . '" selected>' . $numNameRole[$streamerRoleSettings] . '</option>';
        $streamRoleSel .= $bindRoles;
        $leftContent .=  '
                          <button class="guildSettingsCog" style="font-size: 2rem;">
                            General Settings
                          </button>
                          
                          <button class="guildSettingsCog">
                            Verification Method<br>
                            <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="verificationMethodSettings" id="verificationMethodSettings">
                              ' . $verMethodSel . '
                            </select>
                            <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="verificationChannelSettings" id="verificationChannelSettings">
                              ' . $verChannelSel . '
                            </select>
                          </button>
                          
                          <button class="guildSettingsCog">
                            Default Member Role<br>
                            <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="memberRoleSettings" id="memberRoleSettings">
                              ' . $defRoleSel . '
                            </select>
                          </button>
                          
                          <button class="guildSettingsCog">
                            Streamer Notification Channel<br>
                            <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="streamerChannelSettings" id="streamerChannelSettings">
                              ' . $streamChannelSel . '
                            </select>
                          </button>
                          
                          <button class="guildSettingsCog">
                            Streamer Ping Role<br>
                            <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="streamerRoleSettings" id="streamerRoleSettings">
                              ' . $streamRoleSel . '
                            </select>
                          </button>
                        ';
        $rightContent = '<button class="guildSettingsCog" style="font-size: 2rem;">
                          Log Settings
                         </button>
                        
                        <button class="guildSettingsCog">
                          Join Event Log Channel<br>
                          <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="joinEventLog" id="joinEventLog">
                            ' . $joinSelectLog . '
                          </select>
                        </button>
                        
                        <button class="guildSettingsCog">
                          Leave Event Log Channel<br>
                          <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="leaveEventLog" id="leaveEventLog">
                            ' . $leaveSelectLog . '
                          </select>
                        </button>
                        
                        <button class="guildSettingsCog">
                          Username Change Event Log Channel<br>
                          <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="userNameChangeEventLog" id="userNameChangeEventLog">
                            ' . $nameSelectLog . '
                          </select>
                        </button>
                        
                        <button class="guildSettingsCog">
                          Nickname Change Event Log Channel<br>
                          <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="nickNameChangeEventLog" id="nickNameChangeEventLog">
                            ' . $nickSelectLog . '
                          </select>
                        </button>
                        
                        <button class="guildSettingsCog">
                          Kick Event Log Channel<br>
                          <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="kickEventLog" id="joinEventLog">
                            ' . $kickSelectLog . '
                          </select>
                        </button>
                        
                        <button class="guildSettingsCog">
                          Ban Event Log Channel<br>
                          <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="banEventLog" id="joinEventLog">
                            ' . $banSelectLog . '
                          </select>
                        </button>
                        
                        <button class="guildSettingsCog">
                          Timeout Event Log Channel<br>
                          <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="timeOutEventLog" id="timeOutEventLog">
                            ' . $timeoutSelectLog . '
                          </select>
                        </button>
                        
                        <button class="guildSettingsCog">
                          Message Edit Event Log Channel<br>
                          <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="messageEditEventLog" id="messageEditEventLog">
                            ' . $msgeditSelectLog . '
                          </select>
                        </button>
                        
                        <button class="guildSettingsCog">
                          Message Delete Event Log Channel<br>
                          <select onchange="submitButton();" form="guildSettings" class="guildSettingsSelecting" name="messageDeleteEventLog" id="messageDeleteEventLog">
                            ' . $msgdelSelectLog . '
                          </select>
                        </button>';  
        
      
      
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
                          <form id="guildSettings" action="?">
                            <input type="hidden" id="page" name="page" value="guildSettings">
                            <input type="hidden" id="guild" name="guild" value="' . $guildLoop->id . '">
                          </form>
                          <div style="width: 50%; height: 100%; overflow: auto;">' .  $leftContent .  '</div>
                          <div style="width: 50%; height: 100%; overflow: auto;">' .  $rightContent .  '</div>
                          <div class="showSubmit" id="showSubmit">
                            <input form="guildSettings" class="submitButtonChannelView" type="submit" value="">
                          </div>
                        </div>
                        <div style="width: 100%; height: 10%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'./images/assets/project_artemis_background.svg\'); background-color: rgba(255, 255, 255, 0.7); display: grid; place-items: center;">
                          <!--Just a footer-->
                        </div>
                        <script type="text/javascript">
                            function submitButton() {
                              document.getElementById("showSubmit").style.width = "100px";
                              document.getElementById("showSubmit").style.height = "100px";
                              document.getElementById("showSubmit").style.opacity = "1";
                            }
                        </script>';
      } else {
        echo '<script type="text/javascript">
                window.location = "https://artemis.rest/panel.php";
              </script>';
      }
    }
  }
?>
