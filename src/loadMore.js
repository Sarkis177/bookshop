const apiKey = "AIzaSyDYN6BzMhLTqiOfRK5RpIWRRK9yW__2KVY";
const apiUrl = "https://www.googleapis.com/books/v1/volumes?";
const bookList = document.querySelector(".books");
let active;
let cart;
let startIndex;
import { cropDescription } from "./index";
export function loadMore(e) {
  e.preventDefault();
  active = e.target;
  let activeCategory = active.textContent;

  startIndex = 6;
  let paramsString = new URLSearchParams({
    q: `subject: ${activeCategory}`,
    key: `${apiKey}`,
    printType: "books",
    startIndex: startIndex,
    maxResults: 6,
    langRestrict: "en"
  }).toString();

  let url = `${apiUrl}${paramsString}`;
  fetch(url)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      data.items.forEach(item => {

        let img = item.volumeInfo.imageLinks.thumbnail;

        function initImages(img) {
          if (!img) {
            let newImg = "https://орфографика.рф/800/600/http/i.pinimg.com/originals/11/56/95/115695b0016cd7c8a29f5e252ba917a7.jpg";
            return newImg;
          } else {
            return img;
          }
        }

        const bookTemplate =
          `<div class="books-list">
                          <div class="books-list__cover" >
                              <img class="book-image" src=${initImages(img)}></div>
                              <div class="books-list__description">
                                  <p class="authors">${initAuthors(item.volumeInfo.authors)}</p>
                                  <p class="title">${item.volumeInfo.title}</p>
                                  <div class="raiting">
                                  <div class="average-raiting" style ="width: ${initRate(item.volumeInfo.averageRating)}"></div>
                                  </div>
                                  <div class="count-raiting">${initReview(item.volumeInfo.ratingsCount)}</div>
                                  <div class="description">${cropDescription(item.volumeInfo.description)}</div>
                                  <p class="price">${initPrice(item.saleInfo.retailPrice)}</p>
                                  <div class="books-list__button">
                                      <button class="button button-buy">buy now</button>
                                  </div>
                              </div>
                          </div>
                      </div>`;

        bookList.innerHTML += bookTemplate;

        function initPrice(price) {
          if (!price) return "Нет в продаже";
          return `${price.amount} ${price.currencyCode}`;
        }

        function initReview(review) {
          if (!review) {
            return "";
          } else {
            return item.volumeInfo.ratingsCount + " review";
          }
        }

        function initAuthors(author) {
          if (!author) {
            return "Автор не найден";
          } else {
            return item.volumeInfo.authors;
          }
        }

        function initRate(rate) {
          if (!rate) return;
          let newWidth = rate / 5 * 100;
          return `${+newWidth}%`;
        }

        let counter = 0;
        let buttons = document.querySelectorAll(".button-buy");
        cart = document.querySelector(".shop-bag-add");

        function initAddingToCart(buttons) {
          if (buttons.classList.contains("button-buy")) {
            buttons.innerText = "in the cart";
            buttons.classList.remove("button-buy");
            cart.classList.add("cart-badge");
            counter++;
            cart.innerText = counter;
            buttons.classList.add("button-in-cart");
          } else if (buttons.classList.contains("button-in-cart")) {
            buttons.innerText = "buy now";
            counter--;
            cart.innerText = counter;
            buttons.classList.add("button-buy");
            buttons.classList.remove("button-in-cart");
          }
          if (cart.innerText == 0) {
            cart.classList.remove("cart-badge");
            cart.innerText = "";
          }
        }

        buttons.forEach((buttons) => {
          buttons.addEventListener("click", () => {
            initAddingToCart(buttons);
          });
        });
      });
    });
}