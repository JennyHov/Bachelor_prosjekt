import DownArrowImage from '../../assets/images/application/arrow-down-sign-to-navigate.png';
import UpArrowImage from '../../assets/images/application/arrow-up-sign-to-navigate.png';

export function myFunction() {
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = `<img src="${DownArrowImage}" alt="Read More">`;
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = `<img src="${UpArrowImage}" alt="Read Less">`;
    moreText.style.display = "inline";
  }
}  