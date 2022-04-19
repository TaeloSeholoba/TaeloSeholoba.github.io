document.getElementsByTagName('button')[0].addEventListener("click", (e) => { changeColor(e.target) })
const links = document.getElementsByTagName("a");
for (el in links) {
  if (parseInt(el) || parseInt(el) === 0) {
    links[el].addEventListener("click", (e) => {
      changeColor(e.target)
    })
  }
}
const changeColor = (event) => {
  for (el in links) {
    if (parseInt(el) || parseInt(el) === 0) {
      links[el].style.color = "black"
    }
  }
  if (event.innerHTML === "Place an Order") {
    document.getElementById("Order").style.color = "rgb(8, 182, 226)";
    return
  }
  event.style.color = "rgb(8, 182, 226)";
}