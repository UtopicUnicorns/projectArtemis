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
</script>
