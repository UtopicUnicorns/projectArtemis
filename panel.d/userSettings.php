<?php
  if($yourInformation->avatar) {
    $res = str_starts_with($yourInformation->avatar, "a_");
      if($res == true) {
        $userAvatar = 'https://cdn.discordapp.com/avatars/' . $yourInformation->id . '/' .  $yourInformation->avatar . '.png?size=256';
      } else {
        $userAvatar = 'https://cdn.discordapp.com/avatars/' . $yourInformation->id . '/' .  $yourInformation->avatar. '.png?size=256';
      }
    } else {
      $userAvatar = './images/icons/user.svg';
    }
  if($yourInformation->banner) {
      $res2 = str_starts_with($yourInformation->banner, "a_");
      if($res2 == true) {
        $userBanner = 'https://cdn.discordapp.com/banners/' . $yourInformation->id . '/' . $yourInformation->banner . '.png?size=256';
      } else {
        $userBanner = 'https://cdn.discordapp.com/banners/' . $yourInformation->id . '/' . $yourInformation->banner . '.png?size=256';
      }
    } else {
      $userBanner = './images/backgrounds/2.png';
    }
  $siteContext = '<div style="width: 100%; height: 25%; background-size: cover; background-repeat: no-repeat; background-position: center; box-shadow: 0px 5px 2px black; background-image: url(\'' . $userBanner . '\'); display: flex; place-items: center left;">
                    <img src="' . $userAvatar . '" style="height: 80%; border-radius: 500px; margin-left: 50px; box-shadow: 5px 5px 2px black;" /><h1 style="margin-left: 20px;" id="nameInUserPanel"> ' . $yourInformation->username . '#' . $yourInformation->discriminator. '<br />' . $yourInformation->id . ' </h1>
                  </div>
                  <div style="width: 100%; height: 65%; background-color: rgba(255, 255, 255, 0.5); display: grid; place-items: center;">
                    <!--Fill-->
                  </div>
                  <div style="width: 100%; height: 10%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'./images/assets/project_artemis_background.svg\'); background-color: rgba(255, 255, 255, 0.7); display: grid; place-items: center;">
                    <!--Just a footer-->
                  </div>';
?>
