function getData() {
  var xhr = new XMLHttpRequest();        
  xhr.onload = function() {   
    if(xhr.status === 200) {
      let parsedData = JSON.parse(xhr.responseText);
      var canvas = document.getElementById('stat_hold');
      var percentage = parsedData.sysMemPerc;
      var radius;
      var total = parsedData.totalSysMem;
      var now = parsedData.sysMemInUse;
      var func = 'Server';
      radius = stat_hold.height / 4 ;
      if (percentage < 1) var percentage = 1;
      drawPercentageCircle(percentage, radius, canvas, total, now, func);
      
      var canvas = document.getElementById('stat_hold2');
      var percentage = parsedData.botMemPerc;
      var radius;
      var total = parsedData.totalSysMem;
      var now = parsedData.botMemInUse;
      var func = 'Bot';
      radius = stat_hold.height / 4;
      if (percentage < 1) var percentage = 1;
      drawPercentageCircle(percentage, radius, canvas, total, now, func); 
    }
  };
  xhr.open('GET', 'sys.json', true);
  xhr.send(null);
}   
setInterval(getData, 1000);
