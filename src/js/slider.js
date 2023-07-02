
let array = [ 
  "../img/banner.png" ,
  "../img/banner-2.png",
  "../img/banner-3.png"
];

let sliderImages = document.querySelector(".slider__body");
let i = 0;

sliderImages.innerHTML = `<img src = "${array[i]}" alt = "slider-image">`;

let interval = setInterval(() => {
  i++;
  if (i >= array.length) {
    i = 0;
  }
  sliderImages.innerHTML =  `<img src ="${array[i]}" alt = "slider-image">`;
}, 5000);

function initDots() {
  const dotsContainer = document.querySelector(".slider__controls");

  for (let i= 0; i < 3; i++){
    const dot = document.createElement("button");
    dot.classList.add("slider__dot");
    dotsContainer.appendChild(dot);
  }
}

initDots(); 

function showMessage(message) {
  console.log(message);
}

let dots = document.querySelectorAll(".slider__dot");
let currentDotIndex = i;

dots.forEach((dot, index) => {
dot.addEventListener("click", () => {
  currentDotIndex = index;
  showImage(currentDotIndex);
});
});

function showImage(index) {
sliderImages.innerHTML = `<img src="${array[index]}" alt="slider-image">`;
dots.forEach((dot, i) => {
  if (i === index) {
    dot.classList.add("slider__dot__active");
  } else {
    dot.classList.remove("slider__dot__active");
  }
});
}

showImage(currentDotIndex);