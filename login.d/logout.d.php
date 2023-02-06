<script type="text/javascript">
  function removeItem(sKey, sPath, sDomain) {
    document.cookie = encodeURIComponent(sKey) + 
                  "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + 
                  (sDomain ? "; domain=" + sDomain : "") + 
                  (sPath ? "; path=" + sPath : "");
  }

  removeItem("setCode", "/");
  window.location = "https://artemis.rest/testPage.php";
</script>

