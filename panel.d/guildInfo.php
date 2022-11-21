<?php
  if($sharedGuildsArray[$_GET["guild"]]) {
    include './panel.d/guildDatabaseGet.php';
    
    $textChannels = '';
    $threadChannels = '';
    $voiceChannels = '';
    $debug = '<button class="guildChannelsButton" style="font-size: 2rem;">
                Edit Channels
              </button>';
              
    foreach($guildThreadCheck->threads as $guildThreadChannel) {
      $threadChannels .= '<button onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=channelView&channel=' . $guildThreadChannel->id . '&guild=' . $sharedGuildsArray[$_GET["guild"]]["id"] . '\';" class="threadChannelsButton">
                            ' . $guildThreadChannel->name . '<br>' . $guildThreadChannel->id . '
                          </button>'; 
    }
    
    foreach ($guildCheck as $guildChannels) {
      if($guildChannels->type == 0) {
        $textChannels .= '<button onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=channelView&channel=' . $guildChannels->id . '&guild=' . $sharedGuildsArray[$_GET["guild"]]["id"] . '\';" class="guildChannelsButton">
                            ' . $guildChannels->name . '<br>' . $guildChannels->id . '
                          </button>';             
      }
      
      if($guildChannels->type == 2) {
        $voiceChannels .=  '<button onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=channelView&channel=' . $guildChannels->id . '&guild=' . $sharedGuildsArray[$_GET["guild"]]["id"] . '\';" class="voiceChannelsButton">
                              ' . $guildChannels->name . '<br>' . $guildChannels->id . '
                            </button>';             
      }
    }
    
    if($sharedGuildsArray[$_GET["guild"]]["icon"]) $guildAvatar = 'https://cdn.discordapp.com/icons/' . $sharedGuildsArray[$_GET["guild"]]["id"] . '/' .  $sharedGuildsArray[$_GET["guild"]]["icon"] . '.png?size=2048';
    if(!$sharedGuildsArray[$_GET["guild"]]["icon"]) $guildAvatar = './images/icons/user.svg';
    
    $guildBanner = './images/backgrounds/2.png';
    
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
    
    $verMethodNames = [];
    $verMethodNames['NONE'] .= 'No Verification';
    $verMethodNames['helloMethod'] .= 'Hello Artemis Challenge';
    $verMethodNames['buttonMethod'] .= 'Button Click Challenge';
    $verMethodNames['discordMethod'] .= 'Discord Built-in Gateway';
    
    $guildInformation =  '<button class="guildSettingsCog" style="font-size: 2rem;">
                            Current Settings
                          </button>
                          
                          <button class="guildSettingsCog">
                            Verification Method<br>
                            ' . $verMethodNames[$verificationMethodSettings] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Default Member Role<br>
                            ' . $numNameRole[$memberRoleSettings] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Streamer Notification Channel<br>
                            ' . $numNameChan[$streamerChannelSettings] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Streamer Ping Role<br>
                            ' . $numNameRole[$streamerRoleSettings] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Join Event Log Channel<br>
                            ' . $numNameChan[$joinEventLog] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Leave Event Log Channel<br>
                            ' . $numNameChan[$leaveEventLog] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Username Change Event Log Channel<br>
                            ' . $numNameChan[$userNameChangeEventLog] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Nickname Change Event Log Channel<br>
                            ' . $numNameChan[$nickNameChangeEventLog] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Kick Event Log Channel<br>
                            ' . $numNameChan[$kickEventLog] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Ban Event Log Channel<br>
                            ' . $numNameChan[$banEventLog] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Timeout Event Log Channel<br>
                            ' . $numNameChan[$timeOutEventLog] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Message Edit Event Log Channel<br>
                            ' . $numNameChan[$messageEditEventLog] . '
                          </button>
                          
                          <button class="guildSettingsCog">
                            Message Delete Event Log Channel<br>
                            ' . $numNameChan[$messageDeleteEventLog] . '
                          </button>
                          ';
    
    $siteContext = '<div style="width: 100%; height: 25%; background-size: cover; background-repeat: no-repeat; overflow: hidden; background-position: center; background-image: url(\'' . $guildBanner . '\'); display: flex; place-items: center left;">
                      <img src="' . $guildAvatar . '" style="height: 25vh; border-radius: 500px; margin-left: 50px; box-shadow: 5px 5px 2px black;" /><h1 style="margin-left: 20px;" id="nameInUserPanel"> ' . $sharedGuildsArray[$_GET["guild"]]["name"] . '<br />' . $sharedGuildsArray[$_GET["guild"]]["id"] . '</h1>
                    </div>
                    <div style="width: 100%; height: 65%; background-color: rgba(255, 255, 255, 0.5); display: flex; place-items: center;">
                      <div style="width: 50%; height: 100%; overflow: auto;">' . $guildInformation . '</div>
                      <div style="width: 50%; height: 100%; overflow: auto;">' . $debug .  $textChannels . $voiceChannels . $threadChannels . '</div>
                    </div>
                    <div style="width: 100%; height: 10%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'./images/assets/project_artemis_background.svg\'); background-color: rgba(255, 255, 255, 0.7); display: grid; place-items: center;">
                      <!--Just a footer-->
                    </div>';
  } else { 
    echo '<script type="text/javascript">window.location = "https://artemis.rest/";</script>'; 
  }
?>
