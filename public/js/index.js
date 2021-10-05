
let x = document.querySelector(".hamburger");
var y = document.querySelector(".nav-mobile");
var z = document.querySelector(".close-btn");
let mobileLinks = document.querySelectorAll(".mobile-links");

x.addEventListener("click", () => {
    y.classList.toggle("toggleNav");
    console.log(y);
});

// document.addEventListener("scroll" , () => {
//     y.classList.remove("toggleNav");
// });

z.addEventListener("click" , () => {
    y.classList.remove("toggleNav");
});



for (let index = 0; index < mobileLinks.length; index++) {
    mobileLinks[index].addEventListener( "click" , (e) => {
        y.classList.remove("toggleNav");    
    });
    
}