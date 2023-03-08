<?php
  if($sharedGuildsArray[$_GET["guild"]]) {
    $getChannel = urlGet("https://discord.com/api/v10/channels/" . $_GET["channel"], 'authorization: Bot ' . $botToken);
    $throwToDiscord = '';
    if($getChannel->guild_id == $sharedGuildsArray[$_GET["guild"]]["id"]) {
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
        $responseMe = urlPatch( "https://discord.com/api/v10/channels/" . $_GET["channel"], 
                                array('Content-Type: application/json', 'authorization: Bot ' . $botToken), 
                                $dataToSend );
        
        if(json_decode($responseMe)->message) $throwToDiscord .= '<a style="font-size: 3rem; color: white;">Changes were not made.</a>';
        if(!json_decode($responseMe)->message) $throwToDiscord .= '<a style="font-size: 3rem; color: white;">Changes applied.</a>'; 
      }
      
      if($_GET["chatMessage"]) {
        $formJson->content = $_GET["chatMessage"];
        
        $dataToSend = json_encode($formJson);
        $responseMe = urlPost( "https://discord.com/api/v10/channels/" . $_GET["channel"] . "/messages", 
                                array('Content-Type: application/json', 'authorization: Bot ' . $botToken), 
                                $dataToSend );
        
        if(json_decode($responseMe)->message) $throwToDiscord .= '<a style="font-size: 3rem; color: white;">Message was not send.</a>'; 
        if(!json_decode($responseMe)->message) $throwToDiscord .= '<a style="font-size: 3rem; color: white;">Message was send.</a>'; 
      }
      
      if($getChannel->type == 0) $classSelectByType = 'channelViewNameAndId';
      if($getChannel->type == 2) $classSelectByType = 'voiceChannelViewNameAndId';
      if($getChannel->type == 11) $classSelectByType = 'threadChannelViewNameAndId';
      
      $channelName = $getChannel->name;
      $channelTopic = $getChannel->topic;
      $channelSlowDown = $getChannel->rate_limit_per_user;
      if($_GET["channelName"]) $channelName = $_GET["channelName"];
      if($_GET["channelTopic"]) $channelTopic = $_GET["channelTopic"];
      if($_GET["channelSlowDown"]) $channelSlowDown = $_GET["channelSlowDown"];
      
      if($sharedGuildsArray[$_GET["guild"]]["icon"]) $guildAvatar = 'https://cdn.discordapp.com/icons/' . $sharedGuildsArray[$_GET["guild"]]["id"] . '/' .  $sharedGuildsArray[$_GET["guild"]]["icon"] . '.png?size=2048';
      if(!$sharedGuildsArray[$_GET["guild"]]["icon"]) $guildAvatar = './images/icons/user.svg';
      $guildBanner = './images/backgrounds/2.png';
      
      $siteContext = '<div style="width: 100%; height: 25%; background-size: cover; background-repeat: no-repeat; overflow: hidden; background-position: center; background-image: url(\'' . $guildBanner . '\'); display: flex; place-items: center left;">
                        <img src="' . $guildAvatar . '" style="height: 25vh; border-radius: 500px; margin-left: 50px; box-shadow: 5px 5px 2px black;" /><h1 style="margin-left: 20px;" id="nameInUserPanel"> ' . $sharedGuildsArray[$_GET["guild"]]["name"] . '<br />' . $sharedGuildsArray[$_GET["guild"]]["id"] . '</h1>
                      </div>
                      <div style="width: 100%; height: 65%; background-color: rgba(255, 255, 255, 0.5);">
                        <form id="channelSettings" action="?">
                          <input type="hidden" id="page" name="page" value="channelView">
                          <input type="hidden" id="channel" name="channel" value="' . $_GET["channel"] . '">
                          <input type="hidden" id="guild" name="guild" value="' . $sharedGuildsArray[$_GET["guild"]]["id"] . '">
                          <input type="hidden" id="changeRequest" name="changeRequest" value="changeRequest">
                        </form>
                        
                        <form id="chatMessage" action="?">
                          <input type="hidden" id="page" name="page" value="channelView">
                          <input type="hidden" id="channel" name="channel" value="' . $_GET["channel"] . '">
                          <input type="hidden" id="guild" name="guild" value="' . $sharedGuildsArray[$_GET["guild"]]["id"] . '">
                        </form>
                        
                        <div class="' . $classSelectByType . '" style="height: 15%; width: inherit; overflow: hidden;">
                          <input type="text" form="channelSettings" id="channelName" name="channelName" value="' . $channelName . '"><br />
                          ' . $_GET["channel"] . '<br /> 
                        </div>
                        
                        <div style="display: grid; place-items: center; height: 15%; width: inherit; overflow: hidden;">
                          <textarea form="channelSettings" style="width: 100%; height: 100%;" id="channelTopic" name="channelTopic">' . $channelTopic . '</textarea>
                        </div>
                        
                        <div style="display: grid; place-items: center; height: 15%; width: inherit; overflow: hidden;">
                          Slowmode:
                          <select onchange="submitButton();" form="channelSettings" class="guildSettingsSelecting" name="channelSlowDown" id="channelSlowDown">
                            <option value="' . $channelSlowDown . '">CURRENT: ' . $channelSlowDown . ' Seconds</option>
                            <option value="-1">Off</option>
                            <option value="1">1 Second</option>
                            <option value="2">2 Seconds</option>
                            <option value="5">5 Seconds</option>
                            <option value="10">10 Seconds</option>
                            <option value="20">20 Seconds</option>
                            <option value="30">30 Seconds</option>
                            <option value="60">1 Minute</option>
                            <option value="120">2 Minutes</option>
                            <option value="180">3 Minutes</option>
                            <option value="240">4 Minutes</option>
                            <option value="300">5 Minutes</option>
                            <option value="600">10 Minutes</option>
                            <option value="750">15 Minutes</option>
                            <option value="1200">20 Minutes</option>
                            <option value="1800">30 Minutes</option>
                            <option value="3600">1 Hour</option>
                            <option value="7200">2 Hours</option>
                            <option value="10800">3 Hours</option>
                            <option value="14400">4 Hours</option>
                            <option value="18000">5 Hours</option>
                            <option value="21600">6 Hours</option>
                          </select>
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
                        '.$responseMeTo.'
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
                      </script>';
    } else { 
      echo '<script type="text/javascript">window.location = "https://artemis.rest/";</script>'; 
    }
  } else { 
    echo '<script type="text/javascript">window.location = "https://artemis.rest/";</script>'; 
  }
?>
