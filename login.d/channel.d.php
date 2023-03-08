<?php
  //Not to be accessed
  if(count(get_included_files()) ==1) { 
    header('Location: https://artemis.rest/?message=403'); 
    exit();
  }
  
  //If no guild
  if(!isset($_GET["guild"])) {
    header('Location: https://artemis.rest/?message=403'); 
    exit();
  }
  
  //If no channel
  if(!isset($_GET["channel"])) {
    header('Location: https://artemis.rest/?message=403'); 
    exit();
  }
  
  //If not bot owner
  if($decodedJson->id !== $ownerId) {
    //If guild not known in userlist
    if(!isset($userGuildFetch[$_GET["guild"]])) {
      header('Location: https://artemis.rest/?message=403'); 
      exit();
    }
    
    //If no permissions at all
    if(!isset($userGuildFetch[$_GET["guild"]]["permissions"])) {
      header('Location: https://artemis.rest/?message=403'); 
      exit();
    }
    
    //Get user permission int
    $yourGuildPermissions = $userGuildFetch[$_GET["guild"]]["permissions"];
    
    //Get required permission(manage_guild)
    $guildManagePermissions = 1 << 5;
    
    //Calc
    $doMathForGuildPermissions = $yourGuildPermissions & $guildManagePermissions;
    
    //If permissions do not add up
    if($doMathForGuildPermissions !== $guildManagePermissions) {
      header('Location: https://artemis.rest/?message=403'); 
      exit();
    }
  }
  
  $throwToDiscord = '';
  
  if(isset($_GET["formType"])) {
    if($_GET["formType"] === "editChannel") {
      $patchChannel = new stdClass();
      
      if(isset($_GET["channelName"])) {
        $patchChannel->name = $_GET["channelName"];
      }
      
      if(isset($_GET["channelTopic"])) {
        $patchChannel->topic = $_GET["channelTopic"];
      }
      
      if(isset($_GET["channelSlowmode"])) {
        $patchChannel->rate_limit_per_user = $_GET["channelSlowmode"];
      }
      
      $patchToSend = json_encode($patchChannel);
      
      $patchResponse = urlPatch(
        "https://discord.com/api/v10/channels/{$_GET["channel"]}", 
        array(
          'Content-Type: application/json', 
          'authorization: Bot ' . $botToken
        ), 
        $patchToSend 
      );
      
      if(isset(json_decode($patchResponse)->message)) $throwToDiscord .= 'editFail';
      if(!isset(json_decode($patchResponse)->message)) $throwToDiscord .= 'editSucc';
    }
    
    if($_GET["formType"] === "sendMessage") {
      $sendChannel = new stdClass();
      
      if(isset($_GET["chatMessage"])) {
        $sendChannel->content = $_GET["chatMessage"];
      }
      
      $sendMessage = json_encode($sendChannel);
      $messageReply = urlPost(
        "https://discord.com/api/v10/channels/{$_GET['channel']}/messages", 
        array(
          'Content-Type: application/json', 
          'authorization: Bot ' . $botToken
        ), 
        $sendMessage
      );
      
      if(isset(json_decode($messageReply)->message)) $throwToDiscord .= 'msgFail';
      if(!isset(json_decode($messageReply)->message)) $throwToDiscord .= 'msgSucc';
    }
  }
  
  //Get selected channel
  $getChannel = urlGet("https://discord.com/api/v10/channels/{$_GET['channel']}", 'authorization: Bot ' . $botToken);
  
  //Get messages from selected channel
  $getChannelMessages = urlGet("https://discord.com/api/v10/channels/{$_GET['channel']}/messages", 'authorization: Bot ' . $botToken);
  
  //Placeholder for header button
  $chanHead = '';
  
  //Placeholder for messages
  $textMessages = '';
  
  //Loop trough messages
  foreach($getChannelMessages as $getChannelMessage) {
    $textMessages .= "
{$getChannelMessage->author->username}#{$getChannelMessage->author->discriminator} ()
{$getChannelMessage->content}
{$getChannelMessage->timestamp}
    ";
  }
  
  //Select right head depending on type
  if($getChannel->type === 0) $chanHead .= "
      <button class=\"channelButton\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getChannel->name}<br />{$getChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
    
    if($getChannel->type === 2) $chanHead .= "
      <button class=\"voiceButton\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getChannel->name}<br />{$getChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
    
    if($getChannel->type === 10) $chanHead .= "
      <button class=\"threadButton\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getChannel->name}<br />{$getChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
    
    if($getChannel->type === 11) $chanHead .= "
      <button class=\"threadButton\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getChannel->name}<br />{$getChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
    
    if($getChannel->type === 12) $chanHead .= "
      <button class=\"threadButton\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getChannel->name}<br />{$getChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
    
    if($getChannel->type === 13) $chanHead .= "
      <button class=\"voiceButton\">
        <div style=\"width: auto; float:left; padding-left: 6vw; font-size: 2rem;\"></div>
        <div style=\"width: auto; float:right; font-size: 1.5rem;\">{$getChannel->name}<br />{$getChannel->id}</div>
        <div style=\"width: auto; float:left; padding-left: 1vw; font-size: 1rem;\"></div>
      </button>
    ";
?>
