<?php
  if(isset($_GET["message"])) {
    if($_GET["message"] == 'loggedin') {
      echo '<div class="success" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>Logged in!</strong> Welcome citizen.
            </div>';
    }
    
    if($_GET["message"] == 'loggedout') {
      echo '<div class="success" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>Logged out!</strong> Bad job izma.
            </div>';
    }
    
    if($_GET["message"] == 'forceLogged') {
      echo '<div class="danger" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>FORCE LOGGED!</strong> Your login expired or was invalid, you have been logged out.
            </div>';
    }
    
    if($_GET["message"] == '400') {
      echo '<div class="danger" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>400 Bad Request!</strong> The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).
            </div>';
    }
    
    if($_GET["message"] == '401') {
      echo '<div class="warning" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>401 Unauthorized</strong> unauthorised.
            </div>';
    }
    
    if($_GET["message"] == '403') {
      echo '<div class="danger" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>403 Forbidden!</strong> The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed). This code is also typically used if the request provided authentication by answering the WWW-Authenticate header field challenge, but the server did not accept that authentication. The request should not be repeated.
            </div>';
    }
    
    if($_GET["message"] == '404') {
      echo '<div class="notification" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>404 Not Found!</strong> The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
            </div>';
    }
    
    if($_GET["message"] == '405') {
      echo '<div class="notification" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>405 Method Not Allowed!</strong> A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
            </div>';
    }
    
    if($_GET["message"] == '500') {
      echo '<div class="danger" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>500 Internal Server Error!</strong> A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
            </div>';
    }
    
    if($_GET["message"] == '502') {
      echo '<div class="warning" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>502 Bad Gateway!</strong> The server was acting as a gateway or proxy and received an invalid response from the upstream server.
            </div>';
    }
    
    if($_GET["message"] == '503') {
      echo '<div class="notification" onclick="this.style.display=\'none\';">
              <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>
              <strong>503 Service Unavailable!</strong> The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state.
            </div>';
    }
  } 
?>
