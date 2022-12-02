<?php
  if($yourInformation->avatar) $userAvatar = 'https://cdn.discordapp.com/avatars/' . $yourInformation->id . '/' .  $yourInformation->avatar. '.png?size=2048';
  if(!$yourInformation->avatar) $userAvatar = './images/icons/user.svg';
    
  if($yourInformation->banner) $userBanner = 'https://cdn.discordapp.com/banners/' . $yourInformation->id . '/' . $yourInformation->banner . '.png?size=2048';
  if(!$yourInformation->banner) $userBanner = './images/backgrounds/2.png';
  
  $personalConnection = new mysqli('localhost', $sqlUser, $sqlPass);
  $getDb = $personalConnection->query("SHOW DATABASES LIKE 'g%';");
  $gatherChannels = [];
  $gatherPoints = [];
  $keysSort = [];
  
  foreach($getDb as $parseDb) {
    $dbName = $parseDb["Database (g%)"];
    $chanPull = $personalConnection->query("SHOW TABLES FROM " . $dbName . " LIKE 'c%';");
    foreach($chanPull as $chansOut) {
      $tableName = $chansOut["Tables_in_{$dbName} (c%)"];
      $gatherData = $personalConnection->query("USE ${dbName};");
      $gatherMoreData = $personalConnection->query("SELECT value FROM {$tableName} WHERE id = {$yourInformation->id};")->fetch_object()->value;
      if($gatherMoreData) {
        $newTableName = substr($tableName, 1);
        $newDBName = substr($dbName, 1);
        $keysSort[$newTableName] = $gatherMoreData;
      }
    }
  }
  
  arsort($keysSort);
  $cLoop = 0;
  $arrExtra = [];
  foreach($keysSort as $keySorted => $valueSorted) {
    if($cLoop == 5) break;
    $cLoop++;
    $gChannel = urlGet("https://discord.com/api/v10/channels/{$keySorted}", 'authorization: Bot ' . $botToken);
    if($gChannel->type == 11) array_push($gatherChannels, '⌥ ' . $gChannel->name);
    if($gChannel->type !== 11) array_push($gatherChannels, '# ' . $gChannel->name);
    array_push($gatherPoints, $valueSorted);
  }
  echo json_encode($arrExtra);
  $siteContext = '<div style="width: 100%; height: 25%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'' . $userBanner . '\'); display: flex; place-items: center left;">
                    <img src="' . $userAvatar . '" style="height: 25vh; border-radius: 500px; margin-left: 50px; box-shadow: 5px 5px 2px black;" /><h1 style="margin-left: 20px;" id="nameInUserPanel"> ' . $yourInformation->username . '#' . $yourInformation->discriminator . '<br />' . $yourInformation->id . '</h1>
                  </div>
                  <div style="width: 100%; height: 65%; background-color: rgba(255, 255, 255, 0.5); display: flex; place-items: center;">
                    <div style="width: 100%; height: 100%; overflow: auto;text-align: center; display: grid; place-items: center;">
                      <script src="./scripts/chart.js"></script>
                      <canvas id="myChart" style="width:50%; height: 50%;"></canvas>

                      <script>
                      var xValues = '.json_encode($gatherChannels).';
                      var yValues = '.json_encode($gatherPoints).';
                      var barColors = [
                        "#b91d47",
                        "#00aba9",
                        "#2b5797",
                        "#e8c3b9",
                        "#1e7145"
                      ];
                      
                      new Chart("myChart", {
                        type: "doughnut",
                        data: {
                          labels: xValues,
                          datasets: [{
                            backgroundColor: barColors,
                            data: yValues
                          }]
                        },
                        options: {
                          title: {
                            display: true,
                            text: "Top Channel Activity, messages send based"
                          }
                        }
                      });
                      </script>
                    </div>
                  </div>
                  <div style="width: 100%; height: 10%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'./images/assets/project_artemis_background.svg\'); background-color: rgba(255, 255, 255, 0.7); display: grid; place-items: center;">
                    <!--Just a footer-->
                  </div>';
?>
