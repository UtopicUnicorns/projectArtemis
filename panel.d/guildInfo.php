<?php
  foreach ($decodedJson2 as $guildLoop) {
    if ($_GET["guild"] == $guildLoop->id) {
      if($guildLoop->icon) {
          $res = str_starts_with($guildLoop->icon, "a_");
          if($res == true) {
            $guildAvatar = 'https://cdn.discordapp.com/icons/' . $guildLoop->id . '/' .  $guildLoop->icon . '.gif?size=4096';
          } else {
            $guildAvatar = 'https://cdn.discordapp.com/icons/' . $guildLoop->id . '/' .  $guildLoop->icon. '.png?size=4096';
          }
        } else {
          $guildAvatar = './images/icons/user.svg';
        }
      if($guildLoop->banner) {
          $res2 = str_starts_with($guildLoop->banner, "a_");
          if($res2 == true) {
            $guildBanner = 'https://cdn.discordapp.com/banners/' . $guildLoop->id . '/' . $guildLoop->banner . '.gif?size=4096';
          } else {
            $guildBanner = 'https://cdn.discordapp.com/banners/' . $guildLoop->id . '/' . $guildLoop->banner . '.png?size=4096';
          }
        } else {
          $guildBanner = './images/backgrounds/2.png';
        }
      if($guildLoop->owner == true) {
          $ownedGuild =  '<div style="background-color: rgba(255, 255, 255, 0.7); transform: rotate(45deg); position: relative; top: 0px; right: 0px; display: grid; place-items: center; height: 20%; width: 100%;">
                            <a id="nameInUserPanel">YOUR GUILD</a>
                          </div>';
        } else {
          $ownedGuild = '';
        }
      $siteContext = '<div style="width: 100%; height: 25%; background-size: cover; background-repeat: no-repeat; overflow: hidden; background-position: center; box-shadow: 0px 5px 2px black; background-image: url(\'' . $guildBanner . '\'); display: flex; place-items: center left;">
                        <img src="' . $guildAvatar . '" style="height: 80%; border-radius: 500px; margin-left: 50px; box-shadow: 5px 5px 2px black;" /><h1 style="margin-left: 20px;" id="nameInUserPanel"> ' . $guildLoop->name . '<br />' . $guildLoop->id . '</h1>
                        '. $ownedGuild .'
                      </div>
                      <div style="width: 100%; height: 65%; background-color: rgba(255, 255, 255, 0.5); display: grid; place-items: center;">
                        <br />Permissions: ' . $guildLoop->permissions . '
                        <br />permissionsNew: ' . $guildLoop->permissions_new . '
                      </div>
                      <div style="width: 100%; height: 10%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'./images/assets/project_artemis_background.svg\'); background-color: rgba(255, 255, 255, 0.7); display: grid; place-items: center;">
                        <!--Just a footer-->
                      </div>';
    }
  }
?>
