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
      //Form a new line for every entry
      if($counter % 2 == 0) {
        $hugeDong .= '
          <details style="background-color: rgba(255,0,255, 0.1);">
            <summary>
              <div style="display:flex; align-items: center; justify-content: center; width: 100%;">
                <div style="text-align:left; width: 50%;">
                  '.$qSelected["username"].' 
                </div>
                <div style="text-align:right; width: 25%;">
                  Points: '.$qSelected["points"].'
                </div>
                <div style="text-align:right; width: 25%;">
                  Rank: #'.$counter.'
                </div>
              </div>
            </summary>
            <pre class="detailsText"></pre>
          </details>
        ';
      } else {
        $hugeDong .= '
          <details style="background-color: rgba(0,255,255,0.1);">
            <summary>
              <div style="display:flex; align-items: center; justify-content: center; width: 100%;">
                <div style="text-align:left; width: 50%;">
                  '.$qSelected["username"].' 
                </div>
                <div style="text-align:right; width: 25%;">
                  Points: '.$qSelected["points"].'
                </div>
                <div style="text-align:right; width: 25%;">
                  Rank: #'.$counter.'
                </div>
              </div>
            </summary>
            <pre class="detailsText"></pre>
          </details>
        ';
      }
    }
    
    //Prepare for more info
    $moreInfo = $guildConn->query("USE artemis;");
    $selectStuffs = $guildConn->query("SELECT * FROM guildStatus WHERE guildId='{$_GET['guild']}'")->fetch_object();

    $smollDong = '<a class="foot" style="background-color: rgba(0, 255, 0, 0.1); background: url(\'https://cdn.discordapp.com/icons/'.$selectStuffs->guildId.'/'.$selectStuffs->guildIcon.'.png?size=1024\') no-repeat center right / contain;">'.$selectStuffs->guildName.'<br />'.$selectStuffs->guildId.'</a>';
  } else { //If guild not found
    $smollDong = '<a class="foot" style="background-color: rgba(0, 255, 0, 0.1);"></a>';
    $hugeDong = '
    <form action="'.$_SERVER['PHP_SELF'].'" style="height: 100%; display: grid; align-content: center; place-items: center;">
      <p>Enter guild ID</p>
      <input type="text" class="submit" placeholder="Guild ID here..." id="guild" name="guild">
      <input type="submit" class="submit" value="Search guild">
    </form>
    ';
  }
?>
