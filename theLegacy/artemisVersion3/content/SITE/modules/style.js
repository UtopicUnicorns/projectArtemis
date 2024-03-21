function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let styleCheck = getCookie("style");
  if (styleCheck == "vaporwave") {
    setStyleSheet("./modules/vapor.css");
  }
}

function restore() {
  let styleCheck = getCookie("style");
  if (styleCheck) {
    setCookie("style", "vaporwave", 0);
  }

  var stylesheet = document.getElementById("stylesheet");
  stylesheet.setAttribute("href", "./modules/style.css");
  document.getElementById("stylechange").setAttribute("onClick", "setStyleSheet('./modules/vapor.css');");
  document.getElementById("com").src = "./images/icons/command.png";
  document.getElementById("pay").src = "./images/icons/paypal.png";
  document.getElementById("git").src = "./images/icons/github.png";
  document.getElementById("add").src = "./images/icons/add.png";
  document.getElementById("dis").src = "./images/icons/discord.png";
  document.getElementById("hom").src = "./images/icons/art.png";
}

function setStyleSheet(url) {
  let styleCheck = getCookie("style");
  if (!styleCheck) {
    setCookie("style", "vaporwave", 30);
    var audio = new Audio("./modules/G.wav");
    audio.play();
  }

  var stylesheet = document.getElementById("stylesheet");
  stylesheet.setAttribute("href", url);
  document.getElementById("stylechange").setAttribute("onClick", "restore();");
  document.getElementById("com").src = "./images/icons/commandg.png";
  document.getElementById("pay").src = "./images/icons/paypalg.png";
  document.getElementById("git").src = "./images/icons/githubg.png";
  document.getElementById("add").src = "./images/icons/addg.png";
  document.getElementById("dis").src = "./images/icons/discordg.png";
  document.getElementById("hom").src = "./images/icons/artg.png";
}
