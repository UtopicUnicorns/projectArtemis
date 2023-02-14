<?php
  //Not to be accessed
  if(count(get_included_files()) ==1) { 
    header('Location: https://artemis.rest/?message=403'); 
    exit();
  }
  
  //Load config codes
  include './login.d/codes.d.php';
  
  //Create connection to database
  $guildConn = new mysqli('localhost', $sqlUser, $sqlPass);
  
  //Select database from URI
  $infoGuild = $guildConn->query("USE g{$_GET["guild"]}");
  
  //If guild was found
  if($infoGuild) {
    //Select all info about the guild
    $selectShit = $guildConn->query("SELECT * FROM User ORDER BY points DESC");
    
    //Loose variables
    $hugeDong = '';
    $counter = 0;
    
    //Loop trough database results
    foreach($selectShit as $qSelected) {
      //Increase counter for rank
      $counter++;
      
      //Broken get avatar functions
      if($qSelected["avatar"]) $avatar = 'https://cdn.discordapp.com/avatars/' . $qSelected["id"] . '/' . $qSelected["avatar"] . '.png?size=128';
      if($qSelected["avatar"]) $avatarLink = 'https://cdn.discordapp.com/avatars/' . $qSelected["id"] . '/' . $qSelected["avatar"] . '.png?size=2048';
      if(!$qSelected["avatar"]) $avatar = "data:image/svg+xml,%3Csvg style='color: white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3C!--! Font Awesome Free 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0  Fonts: SIL OFL 1.1  Code: MIT License) Copyright 2022 Fonticons  Inc. --%3E%3Cpath d='M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z' fill='white'%3E%3C/path%3E%3C/svg%3E";
      
      //Form a new line for every entry
      $hugeDong .= '<button onclick="window.open(\''. $avatarLink .'\', \'_blank\')" target="_blank" class="userBoardButton" style="background-image: url(\''. $avatar .'\')">
                      <div style="width: auto; float:left; padding-left: 6vw; font-size: 2rem;">'.$qSelected["points"].'</div>
                      <div style="width: auto; float:right; padding-right: 5vw; font-size: 1.5rem;">'.$qSelected["username"].'#'.$qSelected["discriminator"].'</div>
                      <div style="width: auto; float:left; padding-left: 1vw; font-size: 1rem;"><center>Rank: #'.$counter.'</center></div>
                    </button>';
    }
  } else { //If guild not found
    $hugeDong = '';
  }
?>
