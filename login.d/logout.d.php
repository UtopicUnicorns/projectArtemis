<?php
  //If logout was triggered by error
  if(isset($_GET["error"])) {
    //Remove cookie and redirect to mainpage with error
    echo '<script type="text/javascript">
            function removeItem(sKey, sPath, sDomain) {
              document.cookie = encodeURIComponent(sKey) + 
                            "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + 
                            (sDomain ? "; domain=" + sDomain : "") + 
                            (sPath ? "; path=" + sPath : "");
            }
          
            removeItem("setCode", "/");
            window.location = "https://artemis.rest?message=forceLogged";
          </script>';
  } else { //If not triggered by an error
    //Remove cookie and redirect without error
    echo '<script type="text/javascript">
            function removeItem(sKey, sPath, sDomain) {
              document.cookie = encodeURIComponent(sKey) + 
                            "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + 
                            (sDomain ? "; domain=" + sDomain : "") + 
                            (sPath ? "; path=" + sPath : "");
            }
          
            removeItem("setCode", "/");
            window.location = "https://artemis.rest?message=loggedout";
          </script>';
  }
?>
