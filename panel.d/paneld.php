<?php
function str_starts_with(string $string, string $substring): bool {
  $len = strlen($substring);
  if ($len == 0)  { return true; }
  return substr($string, 0, $len) === $substring;
}
if($_COOKIE["setCode"]) {
    include './panel.d/configd.php';
    $yourInformation = urlGet("https://discord.com/api/users/@me", 'authorization: Bearer ' . $_COOKIE["setCode"]);
    $guildsWeShare = urlGet("https://discord.com/api/users/@me/guilds", 'authorization: Bearer ' . $_COOKIE["setCode"]);
    include './panel.d/userMenu.php';
    if ($_GET["page"] == 'guildSettings' && $_GET["guild"]) include './panel.d/guildSettings.php';
    if ($_GET["page"] == 'guildInfo' && $_GET["guild"]) include './panel.d/guildInfo.php';
    if ($_GET["page"] == 'guildStreamers' && $_GET["guild"]) include './panel.d/guildStreamers.php';
    if ($_GET["page"] == 'guildTopics' && $_GET["guild"]) include './panel.d/guildTopics.php';
    if ($_GET["page"] == 'userInfo') include './panel.d/userInfo.php';
    if ($_GET["page"] == 'userSettings') include './panel.d/userSettings.php';
    if ($_GET["page"] == 'logout') include './panel.d/logout.php';
    if ($_GET["page"] == 'textChannelView' && $_GET["channel"] && $_GET["guild"]) include './panel.d/textChannelView.php';
    if ($_GET["page"] == 'threadChannelView' && $_GET["channel"] && $_GET["guild"]) include './panel.d/threadChannelView.php';
    if ($_GET["page"] == 'voiceChannelView' && $_GET["channel"] && $_GET["guild"]) include './panel.d/voiceChannelView.php';
    if (!$_GET["page"]) include './panel.d/userInfo.php';
  } else {
    echo '<script type="text/javascript">window.location = "https://artemis.rest/";</script>';
  }
?>
