<?php
  //Not to be accessed
  if(count(get_included_files()) ==1) { 
    header('Location: https://artemis.rest/oops.php'); 
    exit();
  }
  
  if($flow) {
    //Initiate curl request
    $curl_h = curl_init('https://discord.com/api/v10/users/@me');
    curl_setopt($curl_h, CURLOPT_HTTPHEADER, array('authorization: Bearer ' . $_SESSION['uselessToken'],));
    curl_setopt($curl_h, CURLOPT_RETURNTRANSFER, true);
    
    //Execute curl request
    $response = curl_exec($curl_h);
    
    //Expect json, decode
    $userGot = json_decode($response, false);
    
    //If not logged in, but token is set, or token is expired
    if(isset($userGot->message)) {
      header('Location: https://artemis.rest/login.d/logout.d.php');
      die();
    }
    
    $loginField = ' <a href="https://artemis.rest/control.d.php" style="background-color: rgba(0, 255, 255, 0.2);"><div class="imgBut" style="background-image: url(\'https://artemis.rest/img.d/icon.d/pulse.svg\');"/>control</div></a>
                    <a href="https://artemis.rest//login.d/logout.d.php" style="font-size: 1em; background-color: rgba(255, 255, 255, 0.1);">
                      <div class="imgBut" style="background-image: url(\'https://artemis.rest/img.d/icon.d/user.svg\'); font-size: 1em;"/>
                        '.$userGot->username.'<br />
                        ('.$userGot->id.')</br>
                        Logout
                      </div>
                    </a>';
  } else { 
    $loginField = '<a style="background: url(\'https://artemis.rest/img.d/logo.png\') no-repeat center; background-size: contain;"></a>
                   <a href="https://discord.com/api/v10/oauth2/authorize?client_id=440892659264126997&redirect_uri=https%3A%2F%2Fartemis.rest%2F&response_type=code&scope=identify%20guilds%20guilds.members.read"><div class="imgBut" style="background-image: url(\'https://artemis.rest/img.d/icon.d/user.svg\');"/>login</div></a>';
  }
?>

