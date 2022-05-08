const hide = () => {
  document.getElementsByTagName("nav")[0].style.animationName = "hide";
  setTimeout(()=>{document.getElementsByClassName("menu")[0].style.visibility = "visible"},500)
}

const show = () => {
  const navStyle = document.getElementsByTagName("nav")[0].style;
  navStyle.display = "block";
  navStyle.animationName = "show";
  document.getElementsByClassName("menu")[0].style.visibility = "hidden"
  
}