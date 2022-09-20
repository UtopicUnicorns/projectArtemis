<?php
function str_starts_with(string $string, string $substring): bool {
  $len = strlen($substring);
  if ($len == 0)  { return true; }
  return substr($string, 0, $len) === $substring;
}
if($_COOKIE["setCode"]) {
    include './panel.d/loginFlow.php';
    include './panel.d/userMenu.php';
    if ($_GET["page"] == 'guildSettings' && $_GET["guild"]) include './panel.d/guildSettings.php';
    if ($_GET["page"] == 'guildInfo' && $_GET["guild"]) include './panel.d/guildInfo.php';
    if ($_GET["page"] == 'userInfo') include './panel.d/userInfo.php';
    if ($_GET["page"] == 'userSettings') include './panel.d/userSettings.php';
    if ($_GET["page"] == 'logout') include './panel.d/logout.php';
    if (!$_GET["page"]) include './panel.d/userInfo.php';
  } else {
    echo '<script type="text/javascript">window.location = "https://artemis.rest/";</script>';
  }
?>
