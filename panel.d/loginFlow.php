<?php
  // User Information
  $curl_h = curl_init('https://discord.com/api/users/@me');
  curl_setopt($curl_h, CURLOPT_HTTPHEADER, array('authorization: Bearer ' . $_COOKIE["setCode"],));
  curl_setopt($curl_h, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($curl_h);
  $decodedJson = json_decode($response, false);
  
  // User Guilds
  $curl_h2 = curl_init('https://discord.com/api/users/@me/guilds');
  curl_setopt($curl_h2, CURLOPT_HTTPHEADER, array('authorization: Bearer ' . $_COOKIE["setCode"],));
  curl_setopt($curl_h2, CURLOPT_RETURNTRANSFER, true);
  $response2 = curl_exec($curl_h2);
  $decodedJson2 = json_decode($response2, false);
?>
