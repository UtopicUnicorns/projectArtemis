<?php
  
?>

<script>
  const backgroundPatt = document.querySelector('.backgroundPatt');
  const backgroundWall = document.querySelector('.backgroundWall');
  const contentPane = document.querySelector('.contentPane');
  const contentListen = document.querySelector('body');
  const windowWidth = window.innerWidth / 2;
  const windowHeight = window.innerHeight / 2;
  
  contentListen.addEventListener('mousemove', e => {
    const mouseX = e.clientX / windowWidth;
    const mouseY = e.clientY / windowHeight;
    
    //contentPane.style.transform = `translate3d(-${mouseY}%, -${mouseX}%, 0)`;
    backgroundPatt.style.transform = `translate3d(-${mouseY}%, -${mouseX}%, 0)`;
    backgroundWall.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
  });

  const inputVal = document.getElementById("hiMsgSettings");
  const autCom = document.getElementById("complete");
  
  inputVal.addEventListener("input", updateValue);
  
  function rSel(car, val) {
    let boxVal = document.getElementById("hiMsgSettings").value;
    let testVal = boxVal.substring(0, car - 1) + boxVal.substring(car, boxVal.length);    
    let newVal = [testVal.slice(0, car), val, testVal.slice(car)].join('');
    
    document.getElementById("complete").style.height = '0vh';
    document.getElementById("hiMsgSettings").value = newVal;
    document.getElementById("complete").innerHTML = ``;
  }
  
  function cSel(car, val) {
    let boxVal = document.getElementById("hiMsgSettings").value;
    let testVal = boxVal.substring(0, car - 1) + boxVal.substring(car, boxVal.length);    
    let newVal = [testVal.slice(0, car), val, testVal.slice(car)].join('');
    
    document.getElementById("complete").style.height = '0vh';
    document.getElementById("hiMsgSettings").value = newVal;
    document.getElementById("complete").innerHTML = ``;
  }

  function updateValue(e) {
    const carretPos = this.selectionStart;
    const boxVal = e.target.value;
  
    if(boxVal[carretPos-1] == ' ' || boxVal[carretPos-1] !== '@' || boxVal[carretPos-1] !== '#') {
      document.getElementById("complete").style.height = '0vh';
      autCom.innerHTML = ``;
    }
    
    if(boxVal[carretPos-1] == '#') { 
      document.getElementById("complete").style.height = '10vh';
      let buildChans = [];
      for (let i of autoChan) {
        buildChans.push(`<button class="chanAutoSel" onclick="cSel(${carretPos}, '<#${i.id}> ')">${i.name}</button>`);
      }
      
      autCom.innerHTML = `${buildChans.join(' ')}`;
    }
    
    if(boxVal[carretPos-1] == '@') {
      document.getElementById("complete").style.height = '10vh';
      let buildRoles = [];
      for (let i of autoRole) {
        buildRoles.push(`<button class="roleAutoSel" onclick="rSel(${carretPos}, '<@&${i.id}> ')">${i.name}</button>`);
      }
      
      autCom.innerHTML = `${buildRoles.join(' ')}`;
    }
  } 
</script>
