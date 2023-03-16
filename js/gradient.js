var items = document.querySelectorAll(".timeline li");

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if(!items[i].classList.contains("in-view")){
        items[i].classList.add("in-view");
      }
    } else if(items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
    }
  }
}
 
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);

const animeTitle = (element) => {
    onetime = true;
	const arrayText = element.innerHTML.split("");
	element.innerHTML = "";
	arrayText.forEach((letter, indice) => {
		setTimeout(() => (element.innerHTML += letter), 135 * indice);
	});
	element.classList.add("animate__shakeY");

};

const h1 = document.querySelector("h1.title");
let onetime = false;
function mouseover() {
    if(onetime) {
        animeTitle(h1);
    }
    // animeTitle(h1);
}


// var _window = window,Splitting = _window.Splitting,ScrollOut = _window.ScrollOut;
// Splitting();
// ScrollOut({
//   targets: '.word',
//   scrollingElement: 'body' });

// // Open email popup when clicking a button or link
// document.getElementById("open-email-popup-btn").addEventListener("click", function() {
//   document.getElementById("email-popup").style.display = "block";
// });

// // Close email popup when clicking the close button or outside the popup
// document.getElementById("email-popup").addEventListener("click", function(event) {
//   if (event.target === this || event.target.id === "close-btn") {
//     document.getElementById("email-popup").style.display = "none";
//   }
// });

// // Send email logic
// document.getElementById("email-form").addEventListener("submit", function(event) {
//   event.preventDefault(); // prevent form submission
//   var email = document.getElementById("email-input").value;
//   // code to send email using email variable
//   // ...
//   alert("Thank you for subscribing!");
//   document.getElementById("email-popup").style.display = "none"; // close popup after submission
// });
