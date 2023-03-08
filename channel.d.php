<?php include './login.d/watch.d.php'; ?>
<head>
  <!--Stylesheet-->
  <link rel="stylesheet" href="./style.css" />
  <link rel="stylesheet" href="./styleCell.css" />
</head>
<body style="background: none; overflow: hidden;">
  <div style="width: 100%; height: 100%; text-align: left; overflow: hidden;">
    <?php 
      echo $chanHead;
      echo "
        <!--Edit Channel Form-->
        <form id=\"editChannel\" action=\"?\">
          <input type=\"hidden\" id=\"channel\" name=\"channel\" value=\"{$getChannel->id}\">
          <input type=\"hidden\" id=\"guild\" name=\"guild\" value=\"{$_GET['guild']}\">
          <input type=\"hidden\" id=\"formType\" name=\"formType\" value=\"editChannel\">
        </form>
        
        <!--Begin channel name change-->
        <button class=\"voiceButton\" style=\"background-image: none; height: 5vh;\">
          <div style=\"width: 90vw; float:right; font-size: 1.5rem; text-align: left;\">📛 Edit channel name</div>
        </button>
        
        <!--Change Channel Name-->
        <input type=\"text\" style=\"width: 100%; height: 5vh; padding: 1vh; background-color: rgba(255, 255, 255, 0.5);\" form=\"editChannel\" id=\"channelName\" name=\"channelName\" placeholder=\"Enter channel name\" value=\"{$getChannel->name}\">
        
        <!--Begin Channel Topic Change-->
        <button class=\"voiceButton\" style=\"background-image: none; height: 5vh; margin-top: 1vh;\">
          <div style=\"width: 90vw; float:right; font-size: 1.5rem; text-align: left;\">📰 Edit channel topic</div>
        </button>
        
        <!--Change Channel Topic-->
        <textarea form=\"editChannel\" id=\"channelTopic\" name=\"channelTopic\" placeholder=\"Enter channel topic\" style=\"width: 100%; height: 10vh; padding: 1vh; background-color: rgba(255, 255, 255, 0.5);\">{$getChannel->topic}</textarea>
        
        <!--Begin Channel Slowmode-->
        <button class=\"voiceButton\" style=\"background-image: none; height: 5vh; margin-top: 1vh;\">
          <div style=\"width: 90vw; float:right; font-size: 1.5rem; text-align: left;\">⌛ Edit channel slowmode</div>
        </button>
        
        <!--Change Channel Slowmode-->
        <input form=\"editChannel\" type=\"number\" value=\"{$getChannel->rate_limit_per_user}\" id=\"channelSlowmode\" name=\"channelSlowmode\" placeholder=\"Enter number\" style=\"width: 100%; height: 5vh; padding: 1vh; background-color: rgba(255, 255, 255, 0.5);\"/>
        
        <!--Submit Channel Edit-->
        <input id=\"submitChannelEdit\" form=\"editChannel\" class=\"voiceButton\" style=\"background-image: none; background-color: rgba(0, 255, 0, 0.5); height: 0vh; padding-left: 7.5vw; float:right; font-size: 1.5rem; text-align: left;\" type=\"submit\" value=\"💾 Save changes\">
        
        <!--Send Message Form-->
        <form id=\"chatMessage\" action=\"?\">
          <input type=\"hidden\" id=\"channel\" name=\"channel\" value=\"{$getChannel->id}\">
          <input type=\"hidden\" id=\"guild\" name=\"guild\" value=\"{$_GET['guild']}\">
          <input type=\"hidden\" id=\"formType\" name=\"formType\" value=\"sendMessage\">
        </form>
        
        <!--View Past Chat-->
        <textarea placeholder=\"Past channel chat\" style=\"margin-top: 5vh; width: 100%; height: 20vh; padding: 1vh; background-color: rgba(255, 255, 255, 0.5);\">{$textMessages}</textarea>
        
        <!--Send Message Text-->
        <input type=\"text\" style=\"width: 100%; height: 5vh; padding: 1vh; background-color: rgba(255, 255, 255, 0.5);\" form=\"chatMessage\" id=\"chatMessage\" name=\"chatMessage\" placeholder=\"Enter chat message\" value=\"\">
        
        <!--Submit Channel Message-->
        <input form=\"chatMessage\" class=\"voiceButton\" style=\"background-image: none; background-color: rgba(0, 255, 255, 0.5); height: 5vh; padding-left: 7.5vw; float:right; font-size: 1.5rem; text-align: left;\" type=\"submit\" value=\"📨 Send message\">
      ";
    ?>
    
    <!--Alerts-->
    <div class="alerts" id="alerts" style="width: 100%;">
      <?php 
        if($throwToDiscord === 'editFail') {
          echo '<div class="danger" onclick="this.style.display=\'none\';">
                  <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
                  <strong>Too bad!</strong> Channel changes not applied.
                </div>';
        }
        
        if($throwToDiscord === 'editSucc') {
          echo '<div class="success" onclick="this.style.display=\'none\';">
                  <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
                  <strong>Completed!</strong> Channel has been edited.
                </div>';
        }
        
        if($throwToDiscord === 'msgFail') {
          echo '<div class="danger" onclick="this.style.display=\'none\';">
                  <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
                  <strong>Too bad!</strong> Message did not send.
                </div>';
        }
        
        if($throwToDiscord === 'msgSucc') {
          echo '<div class="success" onclick="this.style.display=\'none\';">
                  <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
                  <strong>Completed!</strong> Message has been send.
                </div>';
        }
      ?>
    </div>
  
  <script>
    function submitButton() {
      document.getElementById("submitChannelEdit").style.height = "5vh";
    }
    var nameWatch = document.getElementById("channelName");
    var topicWatch = document.getElementById("channelTopic");
    var slowmodeWatch = document.getElementById("channelSlowmode");
    const nw = nameWatch.value;
    const tw = topicWatch.value;
    const smw = slowmodeWatch.value;
    nameWatch.oninput = function() {
      if(this.value !== nw) submitButton();
    }
    topicWatch.oninput = function() {
      if(this.value !== tw) submitButton();
    }
    slowmodeWatch.oninput = function() {
      if(this.value !== smw) submitButton();
    }

  </script>
</body>
