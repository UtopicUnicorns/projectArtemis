/* Controllers */
let sizeFont = 1;
document.addEventListener('click', function (e) {
  if(e.target.id === 'zoomIn') {
    let selEl = document.getElementById('contentTarget');
    sizeFont = sizeFont + 1;
    selEl.style.fontSize = `${sizeFont}em`;
  }
  
  if(e.target.id === 'zoomOut') {
    if(sizeFont === 1) return;
    let selEl = document.getElementById('contentTarget');
    sizeFont = sizeFont - 1;
    selEl.style.fontSize = `${sizeFont}em`;  
  }
  
  if(e.target.id === 'dimLights'){
    let selEl = document.getElementById('contentTarget');
    if(selEl.style.backgroundColor === 'rgb(0, 0, 0)') {
      selEl.style.backgroundColor = 'rgba(0, 0, 0, 0)';
     } else {
      selEl.style.backgroundColor = 'rgba(0, 0, 0, 1)';
     }
  }
});

/* Pane drag */
let selectedElement = null;
let target = null;

document.addEventListener('dragstart', function (e) {
  if (e.target.classList.contains('dPane')) {
    selectedElement = e.target;
    selectedElement.classList.add('dragging');
  }
  
  if(e.target.parentNode && e.target.parentNode.classList.contains('dPane')) {
    selectedElement = e.target.parentNode;
    selectedElement.classList.add('dragging');
  }
});

document.addEventListener('dragover', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('dPane')) {
    target = e.target;
    target.classList.add('dropTarget');
  }
  
  if (e.target.parentNode && e.target.parentNode.classList.contains('dPane')) {
    target = e.target.parentNode;
    target.classList.add('dropTarget');
  }
});

document.addEventListener('dragleave', function (e) {
  if (e.target.classList.contains('dPane')) {
    e.target.classList.remove('dropTarget');
  }
  
  if (e.target.parentNode && e.target.parentNode.classList.contains('dPane')) {
    e.target.parentNode.classList.remove('dropTarget');
  }
});

document.addEventListener('drop', function (e) {
  if (selectedElement) {
    e.preventDefault();
    
    if (e.target.classList.contains('dPane')) {
      target = e.target;
      const tempInnerHTML = selectedElement.innerHTML;
      const tempColor = selectedElement.style.backgroundColor;

      selectedElement.innerHTML = target.innerHTML;
      selectedElement.style.backgroundColor = target.style.backgroundColor;

      target.innerHTML = tempInnerHTML;
      target.style.backgroundColor = tempColor;
    }
    
    if (e.target.parentNode && e.target.parentNode.classList.contains('dPane')) {
      target = e.target.parentNode;
      const tempInnerHTML = selectedElement.innerHTML;
      const tempColor = selectedElement.style.backgroundColor;

      selectedElement.innerHTML = target.innerHTML;
      selectedElement.style.backgroundColor = target.style.backgroundColor;

      target.innerHTML = tempInnerHTML;
      target.style.backgroundColor = tempColor;
    }
    
    selectedElement.classList.remove('dragging');
    target.classList.remove('dropTarget');
    selectedElement = null;
    target = null;
  }
});

/* Background paralax */
document.addEventListener('DOMContentLoaded', function () {
  const backgroundPatt = document.querySelector('.bgImage');
  const backgroundWall = document.querySelector('.bgPattern');

  const contentListen = document.querySelector('body');
  const windowWidth = window.innerWidth / 2;
  const windowHeight = window.innerHeight / 2;

  contentListen.addEventListener('mousemove', e => {
    const mouseX = e.clientX / windowWidth;
    const mouseY = e.clientY / windowHeight;

    backgroundPatt.style.transform = `translate3d(-${mouseY}%, -${mouseX}%, 0) scale(1.2)`;
    backgroundWall.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0) scale(1.2)`;
  });
});
