
let x = document.querySelector(".hamburger");
var y = document.querySelector(".nav-mobile");
var z = document.querySelector(".close-btn");
var bar1 = document.querySelector(".bar1")
var bar2 = document.querySelector(".bar2")
var bar3 = document.querySelector(".bar3")
let mobileLinks = document.querySelectorAll(".mobile-links");

x.addEventListener("click", () => {
    y.classList.toggle("toggleNav");
    bar1.classList.toggle("bar1__rotate");
    bar2.classList.toggle("bar2__fade");
    bar3.classList.toggle("bar3__rotate");
});

document.addEventListener("scroll", () => {
    y.classList.remove("toggleNav");
    bar1.classList.remove("bar1__rotate");
    bar2.classList.remove("bar2__fade");
    bar3.classList.remove("bar3__rotate");
});

z.addEventListener("click", () => {
    y.classList.remove("toggleNav");
    bar1.classList.toggle("bar1__rotate");
    bar2.classList.toggle("bar2__fade");
    bar3.classList.toggle("bar3__rotate");
});



for (let index = 0; index < mobileLinks.length; index++) {
    mobileLinks[index].addEventListener("click", (e) => {
        y.classList.remove("toggleNav");
    });

}