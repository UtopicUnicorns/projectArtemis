<?php
  if($yourInformation->avatar) $userAvatar = 'https://cdn.discordapp.com/avatars/' . $yourInformation->id . '/' .  $yourInformation->avatar. '.png?size=2048';
  if(!$yourInformation->avatar) $userAvatar = './images/icons/user.svg';
    
  if($yourInformation->banner) $userBanner = 'https://cdn.discordapp.com/banners/' . $yourInformation->id . '/' . $yourInformation->banner . '.png?size=2048';
  if(!$yourInformation->banner) $userBanner = './images/backgrounds/2.png';
    
  $commonGuilds = '';
  
  foreach($sharedGuildsArray as $guild) {
    $commonGuilds .= '<button style="background-image: url(\'https://cdn.discordapp.com/icons/' . $guild["id"] . '/' . $guild["icon"] . '.png?size=256\')" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=guildInfo&guild=' . $guild["id"] . '\';" class="guildChannelsButton">
                        ' . $guild["name"] . '
                      </button>'; 
  }
  
  $siteContext = '<div style="width: 100%; height: 25%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'' . $userBanner . '\'); display: flex; place-items: center left;">
                    <img src="' . $userAvatar . '" style="height: 25vh; border-radius: 500px; margin-left: 50px; box-shadow: 5px 5px 2px black;" /><h1 style="margin-left: 20px;" id="nameInUserPanel"> ' . $yourInformation->username . '#' . $yourInformation->discriminator . '<br />' . $yourInformation->id . '</h1>
                  </div>
                  <div style="width: 100%; height: 65%; background-color: rgba(255, 255, 255, 0.5); display: flex; place-items: center;">
                    <div style="width: 50%; height: 100%; overflow: auto;"></div>
                    <div style="width: 50%; height: 100%; overflow: auto;">' .  $commonGuilds .  '</div>
                  </div>
                  <div style="width: 100%; height: 10%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'./images/assets/project_artemis_background.svg\'); background-color: rgba(255, 255, 255, 0.7); display: grid; place-items: center;">
                    <!--Just a footer-->
                  </div>';
?>
