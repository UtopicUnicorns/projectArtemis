<?php
  foreach ($guildsWeShare as $guildLoop) {
    if ($_GET["guild"] == $guildLoop->id) {
      $permInt = $guildLoop->permissions;
      $needPerm = 1 << 5;
      $calcPerm = $permInt & $needPerm;
      if($calcPerm == $needPerm) {
        $guildCheck = urlGet("https://discord.com/api/v10/guilds/" . $guildLoop->id . "/channels", 'authorization: Bot ' . $botToken);
        $guildThreadCheck = urlGet("https://discord.com/api/v10/guilds/" . $guildLoop->id . "/threads/active", 'authorization: Bot ' . $botToken);
        $textChannels = '';
        $threadChannels = '';
        $voiceChannels = '';
        $debug = '<button class="guildChannelsButton" style="font-size: 2rem;">
                    Edit Channels
                  </button>';
        foreach($guildThreadCheck->threads as $guildThreadChannel) {
          $threadChannels .= '<button onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=threadChannelView&channel=' . $guildThreadChannel->id . '&guild=' . $guildLoop->id . '\';" class="threadChannelsButton">
                                 ' . $guildThreadChannel->name . '<br>' . $guildThreadChannel->id . '
                               </button>'; 
        }
        
        foreach ($guildCheck as $guildChannels) {
          if($guildChannels->type == 0) {
            $textChannels .= '<button onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=textChannelView&channel=' . $guildChannels->id . '&guild=' . $guildLoop->id . '\';" class="guildChannelsButton">
                                ' . $guildChannels->name . '<br>' . $guildChannels->id . '
                              </button>';             
          }
         
          if($guildChannels->type == 2) {
            $voiceChannels .= '<button onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=voiceChannelView&channel=' . $guildChannels->id . '&guild=' . $guildLoop->id . '\';" class="voiceChannelsButton">
                                 ' . $guildChannels->name . '<br>' . $guildChannels->id . '
                               </button>';             
          }
        }
      } else {
        $textChannels = '';
        $voiceChannels = '';
        $threadChannels = '';
        $debug = '';
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
                        <div style="width: 50%; height: 100%; overflow: auto;"><!--TOBEFILLED--></div>
                        <div style="width: 50%; height: 100%; overflow: auto;">' . $debug .  $textChannels . $voiceChannels . $threadChannels . '</div>
                      </div>
                      <div style="width: 100%; height: 10%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'./images/assets/project_artemis_background.svg\'); background-color: rgba(255, 255, 255, 0.7); display: grid; place-items: center;">
                        <!--Just a footer-->
                      </div>';
    }
  }
?>
