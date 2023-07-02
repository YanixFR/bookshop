/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 396:
/***/ (function() {

let array = ["../img/banner.png", "../img/banner-2.png", "../img/banner-3.png"];
let sliderImages = document.querySelector(".slider__body");
let i = 0;
sliderImages.innerHTML = `<img src = "${array[i]}" alt = "slider-image">`;
let interval = setInterval(() => {
  i++;
  if (i >= array.length) {
    i = 0;
  }
  sliderImages.innerHTML = `<img src ="${array[i]}" alt = "slider-image">`;
}, 5000);
function initDots() {
  const dotsContainer = document.querySelector(".slider__controls");
  for (let i = 0; i < 3; i++) {
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(396);
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_slider_js__WEBPACK_IMPORTED_MODULE_0__);


document.addEventListener("DOMContentLoaded", function () {
  let startIndex = 0;
  const maxResults = 6;
  let currentCategory = "architecture";
  const apiKey = "AIzaSyBg9lCtHqghYy2OYvWKraB8rPJ1WnboZPk";
  function fetchBooks(category) {
    const bookList = document.querySelector(".books__list");
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;
    fetch(url).then(response => response.json()).then(data => {
      bookList.innerHTML = "";
      data.items.forEach(item => {
        const book = document.createElement("div");
        book.className = "book";
        const bookImage = document.createElement("img");
        if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
          bookImage.src = item.volumeInfo.imageLinks.thumbnail;
        } else {
          bookImage.src = "../img/placeholder1.png";
          bookImage.style.width = '200px';
          bookImage.style.height = '300px';
        }
        book.appendChild(bookImage);
        const bookInfo = document.createElement("div");
        bookInfo.className = "book__details";
        if (item.volumeInfo.authors) {
          const bookAuthors = document.createElement("p");
          bookAuthors.className = "book__author";
          bookAuthors.textContent = `${item.volumeInfo.authors.join(", ")}`;
          bookInfo.appendChild(bookAuthors);
        }
        const bookTitle = document.createElement("h3");
        bookTitle.className = "book__title";
        bookTitle.textContent = item.volumeInfo.title;
        bookInfo.appendChild(bookTitle);
        if (item.volumeInfo.averageRating && item.volumeInfo.ratingsCount) {
          const rating = Math.round(item.volumeInfo.averageRating);
          const ratingsCount = item.volumeInfo.ratingsCount;
          const bookRating = document.createElement("p");
          bookRating.className = "book__rating--stars";
          const MAX_RATING = 5;
          const YELLOW_STARS = rating;
          const GRAY_STARS = MAX_RATING - rating;
          const yellowStars = "★".repeat(YELLOW_STARS);
          const grayStars = "☆".repeat(GRAY_STARS);
          bookRating.innerHTML = `<span style="color: #F2C94C">${yellowStars}</span><span style="color: gray">${grayStars}</span> <span style ="color: #5C6A79">${ratingsCount} reviews </span>`;
          bookInfo.appendChild(bookRating);
        }
        if (item.volumeInfo.description) {
          const description = item.volumeInfo.description.length > 150 ? `${item.volumeInfo.description.substring(0, 150)}...` : item.volumeInfo.description;
          const bookDescription = document.createElement("p");
          bookDescription.className = "book__description";
          bookDescription.textContent = description;
          bookInfo.appendChild(bookDescription);
        }
        if (item.saleInfo && item.saleInfo.listPrice && item.saleInfo.listPrice.amount) {
          const price = item.saleInfo.retailPrice.amount;
          const currencyCode = item.saleInfo.retailPrice.currencyCode;
          const bookPrice = document.createElement("p");
          bookPrice.className = "book__price";
          bookPrice.textContent = `${price} ${currencyCode}`;
          bookInfo.appendChild(bookPrice);
        } else {
          const notForSale = document.createElement("p");
          notForSale.className = "not-for-sale";
          notForSale.textContent = "Not for sale";
          bookInfo.appendChild(notForSale);
        }
        const buyButton = document.createElement("button");
        buyButton.className = "btn__buy";
        buyButton.href = "#";
        buyButton.textContent = "Buy now";
        bookInfo.appendChild(buyButton);
        book.appendChild(bookInfo);
        bookList.appendChild(book);
        const bookId = item.id;
        if (isBookInCart(bookId)) {
          buyButton.classList.add("added");
          buyButton.textContent = "In the cart";
        }
        buyButton.addEventListener("click", () => {
          if (buyButton.classList.contains("added")) {
            removeBookFromCart(bookId);
            buyButton.classList.remove("added");
            buyButton.textContent = "Buy now";
          } else {
            addBookToCart(bookId);
            buyButton.classList.add("added");
            buyButton.textContent = "In the cart";
          }
          updateCartCount();
        });
      });
      startIndex += maxResults;
    }).catch(error => {
      console.error("Error:", error);
    });
  }
  function loadMore() {
    fetchBooks(currentCategory);
  }
  function changeCategory(event) {
    const clickedCategory = event.target.dataset.category;
    if (clickedCategory && clickedCategory !== currentCategory) {
      const activeCategory = document.querySelector(".sidebar__link--active");
      activeCategory.classList.remove("sidebar__link--active");
      event.target.classList.add("sidebar__link--active");
      currentCategory = clickedCategory;
      startIndex = 0;
      fetchBooks(currentCategory);
    }
  }
  function addBookToCart(bookId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (!cartItems.includes(bookId)) {
      cartItems.push(bookId);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }
  function removeBookFromCart(bookId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.includes(bookId)) {
      cartItems = cartItems.filter(item => item !== bookId);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }
  function isBookInCart(bookId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return cartItems.includes(bookId);
  }
  function updateCartCount() {
    const circle = document.querySelector(".basket__items");
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    circle.textContent = cartItems.length;
  }
  const loadMoreBtn = document.querySelector(".books__load");
  const categoryList = document.querySelector(".sidebar__category");
  loadMoreBtn.addEventListener("click", loadMore);
  categoryList.addEventListener("click", changeCategory);
  window.addEventListener("load", function () {
    updateCartCount();
    fetchBooks(currentCategory);
  });
});
}();
/******/ })()
;