const ids = ["aboutMe","Skills","Portfolio","contacts","cv"];
for (let i = 0; i < 5; i++) {
  document.getElementsByTagName("span")[i].addEventListener("click", () => {
    changeColor(i);
    showInfo(i);
  });
}

const changeColor = (i) => {
  for (let j = 0; j < document.getElementsByTagName("span").length; j++) {
    document.getElementsByTagName("span")[j].style.color = "black";
  }
  document.getElementsByTagName("span")[i].style.color = "rgb(1, 149, 149)";
};
const showInfo = (i) => {
    for(let k = 0; k < ids.length;k++){
        document.getElementById(ids[k]).style.display = "none";
    }
    document.getElementById(ids[i]).style.display = "block";
    let left = 900;
    document.getElementById(ids[i]).style.left = "1000px";
    let timer = setInterval(() => {
      left -= 30;
      
      document.getElementById(ids[i]).style.left = left + "px";
      if (left <= 30) {
        document.getElementById(ids[i]).style.left = "5px";
        clearInterval(timer);
      }

    }, 10);  
};
