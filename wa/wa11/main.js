const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imgfilenames = ["./images/Anthony.png","./images/IMG_6036.jpg", "./images/IMG_6049.jpg", "./images/IMG_6052.jpg", "./images/IMG_6062.jpg"];

/* Declaring the alternative text for each image file */
const imgaltnames = ["My beautiful face","List of female music patrons of the 19th century", "A collection of stick-figure poses for a stop-motion animation", "A large black mutt and a small white chihuahua sleeping together on a blanket", "Buttface"]

/* Looping through images */

let loops = 0;
for (let i of imgfilenames) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', i);
    newImage.setAttribute('alt', imgaltnames[loops]);
    newImage.addEventListener('click', () => {
        displayedImage.setAttribute('src',newImage.src)
        displayedImage.setAttribute('alt',newImage.alt)
    });
    thumbBar.appendChild(newImage);

    loops++;
}
/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
if (btn.getAttribute("class") === "dark"){
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
} else if (btn.getAttribute("class") === "light"){
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
}});
