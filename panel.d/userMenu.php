<?php
  $userMenu =  '<details open>
                  <summary>
                    👤&ensp;' . $yourInformation->username . '#' . $yourInformation->discriminator . '
                  </summary>
                  <p>
                    <button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=userInfo\';">
                      ℹ️&ensp;User Info
                    </button>
                  </p>
                  <p>
                    <button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=userSettings\';">
                      ⚙️&ensp;User Settings
                    </button>
                  </p>
                  <p>
                    <button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=logout\';">
                      🚪&ensp;Log Me Out
                    </button>
                  </p>
                </details><br />';
  foreach($sharedGuildsArray as $guild) {
    if ($_GET["guild"] == $guild["id"]) {
      $userMenu .= '<details open>
                      <summary >🌐&ensp;' . $guild["name"] . '</summary>
                      <p><button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=guildInfo&guild=' . $guild["id"] . '\';">ℹ️&ensp;Guild Info</button></p>
                      <p><button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=guildSettings&guild=' . $guild["id"] . '\';">⚙️&ensp;Guild Settings</button></p>
                      <p><button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=guildStreamers&guild=' . $guild["id"] . '\';">📺&ensp;Guild Streamers</button></p>
                      <p><button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=guildTopics&guild=' . $guild["id"] . '\';">📍&ensp;Guild Topics</button></p>
                    </details><br />';
    } else {
      $userMenu .= '<details>
                      <summary >🌐&ensp;' . $guild["name"] . '</summary>
                      <p><button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=guildInfo&guild=' . $guild["id"] . '\';">ℹ️&ensp;Guild Info</button></p>
                      <p><button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=guildSettings&guild=' . $guild["id"] . '\';">⚙️&ensp;Guild Settings</button></p>   
                      <p><button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=guildStreamers&guild=' . $guild["id"] . '\';">📺&ensp;Guild Streamers</button></p>
                      <p><button class="codeDocs" onclick="document.getElementById(\'load\').style.display=\'grid\'; location.href=\'./panel.php?page=guildTopics&guild=' . $guild["id"] . '\';">📍&ensp;Guild Topics</button></p>
                    </details><br />';
    }
  }
?>
