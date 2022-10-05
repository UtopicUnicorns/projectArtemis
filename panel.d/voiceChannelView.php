<?php
  foreach ($guildsWeShare as $guildLoop) {
    if ($_GET["guild"] == $guildLoop->id) {
      $permInt = $guildLoop->permissions;
      $needPerm = 1 << 5;
      $calcPerm = $permInt & $needPerm;
      if($calcPerm == $needPerm) {
        $guildCheck = urlGet("https://discord.com/api/v10/guilds/" . $guildLoop->id . "/channels", 'authorization: Bot ' . $botToken);
        $channelName = '';
        $guildChannelId = '';
        $channelTopic = '';
        $channelSlowDown = '';
        
        foreach ($guildCheck as $guildChannels) {
          if($guildChannels->id == $_GET["channel"]) {
            $guildChannelId = $guildChannels->id;
            if($_GET["changeRequest"]) {
              $formJson = '';
              if($_GET["channelName"]) $formJson->name = $_GET["channelName"];
              if($_GET["channelTopic"]) $formJson->topic = $_GET["channelTopic"];
              if($_GET["channelSlowDown"]) {
                if($_GET["channelSlowDown"] == -1 ) {
                  $formJson->rate_limit_per_user = 0;
                } else {
                  $formJson->rate_limit_per_user = $_GET["channelSlowDown"];
                }
              }
              $dataToSend = json_encode($formJson);
              $responseMe = urlPatch( "https://discord.com/api/v10/channels/" . $guildChannelId, 
                                      array('Content-Type: application/json', 'authorization: Bot ' . $botToken), 
                                      $dataToSend );
            }
            if($_GET["chatMessage"]) {
              $guildChannelId = $guildChannels->id;
              $formJson->content = $_GET["chatMessage"];
              $dataToSend = json_encode($formJson);
              $responseMe = urlPost( "https://discord.com/api/v10/channels/" . $guildChannelId . "/messages", 
                                      array('Content-Type: application/json', 'authorization: Bot ' . $botToken), 
                                      $dataToSend );        
            }
          
            $channelName = $guildChannels->name;
            $channelTopic = $guildChannels->topic;
            $channelSlowDown = $guildChannels->rate_limit_per_user;
            if($_GET["channelName"]) $channelName = $_GET["channelName"];
            if($_GET["channelTopic"]) $channelTopic = $_GET["channelTopic"];
            if($_GET["channelSlowDown"]) $channelSlowDown = $_GET["channelSlowDown"];          
          }
        }
        
        $guildAvatar = './images/icons/user.svg';
        if($guildLoop->icon) $guildAvatar = 'https://cdn.discordapp.com/icons/' . $guildLoop->id . '/' .  $guildLoop->icon. '.png?size=256';
        $guildBanner = './images/backgrounds/2.png';
        if($guildLoop->banner) $guildBanner = 'https://cdn.discordapp.com/banners/' . $guildLoop->id . '/' . $guildLoop->banner . '.png?size=256';
        $siteContext = '<div style="width: 100%; height: 25%; background-size: cover; background-repeat: no-repeat; overflow: hidden; background-position: center; background-image: url(\'' . $guildBanner . '\'); display: flex; place-items: center left;">
                          <img src="' . $guildAvatar . '" style="height: 25vh; border-radius: 500px; margin-left: 50px; box-shadow: 5px 5px 2px black;" /><h1 style="margin-left: 20px;" id="nameInUserPanel"> ' . $guildLoop->name . '<br />' . $guildLoop->id . '</h1>
                        </div>
                        <div style="width: 100%; height: 65%; background-color: rgba(255, 255, 255, 0.5);">
                          <form id="channelSettings" action="?">
                            <input type="hidden" id="page" name="page" value="voiceChannelView">
                            <input type="hidden" id="channel" name="channel" value="' . $guildChannelId . '">
                            <input type="hidden" id="guild" name="guild" value="' . $guildLoop->id . '">
                            <input type="hidden" id="changeRequest" name="changeRequest" value="changeRequest">
                          </form>
                          
                          <form id="chatMessage" action="?">
                            <input type="hidden" id="page" name="page" value="voiceChannelView">
                            <input type="hidden" id="channel" name="channel" value="' . $guildChannelId . '">
                            <input type="hidden" id="guild" name="guild" value="' . $guildLoop->id . '">
                          </form>
                          
                          <div class="voiceChannelViewNameAndId" style="height: 15%; width: inherit; overflow: hidden;">
                            <input type="text" form="channelSettings" id="channelName" name="channelName" value="' . $channelName . '"><br />
                              ' . $guildChannelId . '<br /> 
                          </div>
                          
                          <div style="display: grid; place-items: center; height: 15%; width: inherit; overflow: hidden;">
                            <textarea form="channelSettings" style="width: 100%; height: 100%;" id="channelTopic" name="channelTopic">' . $channelTopic . '</textarea>
                          </div>
                          
                          <div style="display: grid; place-items: center; height: 15%; width: inherit; overflow: hidden;">
                            <input form="channelSettings" type="range" min="-1" max="21600" value="'.$channelSlowDown.'" class="slider" id="channelSlowDown" name="channelSlowDown">
                            <div id="chanSlowDown"></div>
                          </div>
                          
                          <div style="display: grid; place-items: center; height: 50%; width: inherit; overflow: hidden;">
                            <textarea form="chatMessage" placeholder="Chat channel message..." style="width: 100%; height: 100%;" id="chatMessage" name="chatMessage"></textarea>
                          </div> 
                          
                          <div style="display: grid; place-items: center; height: 5%; width: inherit; overflow: hidden;">
                            <input form="chatMessage" style="width: 100%; height: 100%;" class="submitChatButtonChannelView" type="submit" value="Send Message">
                          </div> 
                          
                          <div class="showSubmit" id="showSubmit">
                            <input form="channelSettings" class="submitButtonChannelView" type="submit" value="">
                          </div>
                          
                        </div>
                        <div id="errText" style="overflow: hidden; text-shadow: 1px 1px 1px black; font-size: 1rem; color: white; width: 100%; height: 10%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'./images/assets/project_artemis_background.svg\'); background-color: rgba(255, 255, 255, 0.7); display: grid; place-items: center;">
                          <!--Just a footer-->
                          '.$responseMe.'
                        </div>
                        
                        <script type="text/javascript">
                          function submitButton() {
                            document.getElementById("showSubmit").style.width = "100px";
                            document.getElementById("showSubmit").style.height = "100px";
                            document.getElementById("showSubmit").style.opacity = "1";
                          }
                          var nameWatch = document.getElementById("channelName");
                          var topicWatch = document.getElementById("channelTopic");
                          var slowmodeWatch = document.getElementById("channelSlowDown");
                          const nw = nameWatch.value;
                          const tw = topicWatch.value;
                          const smw = slowmodeWatch.value;
                          nameWatch.oninput = function() {
                            if(this.value !== nw) submitButton();
                          }
                          topicWatch.oninput = function() {
                            if(this.value !== tw) submitButton();
                          }
                          
                          console.log(nameWatch, topicWatch, slowmodeWatch);
                          
                          var slider = document.getElementById("channelSlowDown");
                          var output = document.getElementById("chanSlowDown");
                          if(slider.value <= 0) { 
                            output.innerHTML = `Slowmode: OFF`;
                            slider.value = "-1";
                          } else {
                            if(slider.value <= 1) {
                              output.innerHTML = `Slowmode: ${slider.value} second`;
                            } else {
                              output.innerHTML = `Slowmode: ${slider.value} seconds`;
                            }
                          }
                          slider.oninput = function() {
                            if(this.value !== smw) submitButton();
                            if(this.value <= 0) {
                              output.innerHTML = `Slowmode: OFF`;
                              slider.value = "-1";
                            } else {
                              if(this.value <= 1) {
                                output.innerHTML = `Slowmode: ${this.value} second`;
                              } else {
                                output.innerHTML = `Slowmode: ${this.value} seconds`;
                              }
                            }
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
