<?php
  $userMenu =  '<details open>
                  <summary>
                    👤&ensp;' . $decodedJson->username . '#' . $decodedJson->discriminator . '
                  </summary>
                  <p>
                    <button class="codeDocs" onclick="location.href=\'./panel.php?page=userInfo\';">
                      ℹ️&ensp;User Info
                    </button>
                  </p>
                  <p>
                    <button class="codeDocs" onclick="location.href=\'./panel.php?page=userSettings\';">
                      ⚙️&ensp;User Settings
                    </button>
                  </p>
                  <p>
                    <button class="codeDocs" onclick="location.href=\'./panel.php?page=logout\';">
                      🚪&ensp;Log Me Out
                    </button>
                  </p>
                </details><br />';
  foreach($decodedJson2 as $guild) {
              if ($_GET["guild"] == $guild->id) {
                $userMenu .= '<details open>
                        <summary >🌐&ensp;' . $guild->name . '</summary>
                        <p><button class="codeDocs" onclick="location.href=\'./panel.php?page=guildInfo&guild=' . $guild->id . '\';">ℹ️&ensp;Guild Info</button></p>
                        <p><button class="codeDocs" onclick="location.href=\'./panel.php?page=guildSettings&guild=' . $guild->id . '\';">⚙️&ensp;Guild Settings</button></p>
                       </details><br />';
              } else {
                $userMenu .= '<details>
                        <summary >🌐&ensp;' . $guild->name . '</summary>
                        <p><button class="codeDocs" onclick="location.href=\'./panel.php?page=guildInfo&guild=' . $guild->id . '\';">ℹ️&ensp;Guild Info</button></p>
                        <p><button class="codeDocs" onclick="location.href=\'./panel.php?page=guildSettings&guild=' . $guild->id . '\';">⚙️&ensp;Guild Settings</button></p>   
                      </details><br />';
              }
            }
?>
