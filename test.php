<?php
  include './panel.d/configd.php';
  
  $personalConnection = new mysqli('localhost', $sqlUser, $sqlPass);
  $getDb = $personalConnection->query("SHOW DATABASES LIKE 'g%';");
  
  foreach($getDb as $parseDb) {
    $dbName = $parseDb["Database (g%)"];
    $chanPull = $personalConnection->query("SHOW TABLES FROM " . $dbName . " LIKE 'c%';");
    foreach($chanPull as $chansOut) {
      echo $chansOut["Tables_in_{$dbName} (c%)"] . "<br>";
    }
  }
?>
