const shops = [
  {
    name: "McDonalds",
    className: "McDonalds",
    dishes: [
      {
        name: "BigMack",
        src: "./img/mcDon/images(0).jpg",
        price: "140",
        shopName: "McDonalds",
      },
      {
        name: "BigTaste",
        src: "./img/mcDon/images(1).jpg",
        price: "150",
        shopName: "McDonalds",
      },
      {
        name: "Double Chessburger",
        src: "./img/mcDon/images(2).jpg",
        price: "100",
        shopName: "McDonalds",
      },
      {
        name: "Chessburger",
        src: "./img/mcDon/images(3).jpg",
        price: "90",
        shopName: "McDonalds",
      },
    ],
  },
  {
    name: "KFC",
    className: "KFC",
    dishes: [
      {
        name: "chicken wings",
        src: "./img/kfc/images(0).jpg",
        price: "300",
        shopName: "KFC",
      },
      {
        name: "good shoes",
        src: "./img/kfc/images(1).jpg",
        price: "1000",
        shopName: "KFC",
      },
    ],
  },
  {
    name: "Taco House",
    className: "tacoHouse",
    dishes: [
      {
        name: "signature taco",
        src: "./img/taco/images(4).jpg",
        price: "170",
        shopName: "tacoHouse",
      },
      {
        name: "double taco",
        src: "./img/taco/images(0).jpg",
        price: "100",
        shopName: "tacoHouse",
      },
      {
        name: "vegan taco",
        src: "./img/taco/images(1).jpg",
        price: "150",
        shopName: "tacoHouse",
      },
      {
        name: "taco set",
        src: "./img/taco/images(2).jpg",
        price: "300",
        shopName: "tacoHouse",
      },
      {
        name: "beef taco",
        src: "./img/taco/images(3).jpg",
        price: "200",
        shopName: "tacoHouse",
      },
    ],
  },
];

const cartData = [];
/////////////////////////////////////////

const saveLocalStorage = function (name="cart", item=cartData) {
  localStorage.setItem(name, JSON.stringify(item));
};
document.addEventListener("DOMContentLoaded", function() {
   const data = JSON.parse(localStorage.getItem("cart"));
   cartData.push(...data)
});

/////////////////////////////////////////////////////

const shoppingBtn = document.querySelector(".shopBtn");
const cartBtn = document.querySelector(".cartBtn");
const cartCont = document.querySelector(".cart");
const shopingCont = document.querySelector(".shoping");
const menu = document.querySelector(".menu");
const navbar = document.querySelector(".navbar");
const submitForm = document.querySelector("form");
const total = document.querySelector(".total");


//////////////// total price
total.textContent = 1000;
const mathTotal = function (cart) {
  const sum = cart.reduce((acc, cur) => {
    return acc + cur.price * cur.counter;
  }, 0);
  total.textContent = sum;
  //    total.textContent = 1000
};
/////////////  poopupWindow

const popupWindow = function (text) {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.backgroundColor = "#FFD700";
  popup.style.padding = "10px";
  popup.style.borderRadius = "5px";
  popup.innerHTML = text;

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "×";
  closeButton.style.float = "right";
  closeButton.style.cursor = "pointer";
  closeButton.onclick = function () {
    popup.remove();
  };

  popup.appendChild(closeButton);
  document.body.appendChild(popup);

  setTimeout(function () {
    popup.remove();
  }, 5000);
};

/////////////////////////////////////// CART

const parrentEl = document.querySelector(".order");

const generateOrderView = function (cart) {
  cart.forEach((e, i) => {
    const className = e.name.replaceAll(" ", "");
    const markup = `
        <div class="eachOrder border">
                <img
                  src="${e.src}"
                  alt="${e.name}"
                  class="imgInCart "
                />
                <h4>${e.name}</h4>
                <p  class="parag${className}">${e.price * e.counter}₴</p>
                <input type="number" name="count" id="counter" max="10" value="${
                  e.counter
                }" class="${className}" />
              </div>
        `;
    parrentEl.insertAdjacentHTML("beforeend", markup);
    const input = document.querySelector(`.eachOrder .${className}`);
    const parag = document.querySelector(`.eachOrder .parag${className}`);
    parag.textContent = `${e.price * e.counter}₴`;
    input.addEventListener("input", function () {
      e.counter = input.value;
      if (e.counter <= 0) {
        delete cart[i];
        saveLocalStorage();
        const div = input.parentElement;
        div.remove();
      }
      saveLocalStorage();
      mathTotal(cartData);
    });
  });
};

///////////////////////////// listeners
const goToShopPage = function () {
  parrentEl.innerHTML = "";
  cartCont.classList.add("hidden");
  cartBtn.classList.add("noDecoration");

  shopingCont.classList.remove("hidden");
  shoppingBtn.classList.remove("noDecoration");
};
shoppingBtn.addEventListener("click", goToShopPage);

cartBtn.addEventListener("click", function () {
  shopingCont.classList.add("hidden");
  shoppingBtn.classList.add("noDecoration");

  cartCont.classList.remove("hidden");
  cartBtn.classList.remove("noDecoration");
  generateOrderView(cartData);
  mathTotal(cartData);
});
submitForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (cartData.length === 0 || !cartData[0]) {
    popupWindow("you must buy something for delivery ❗❗❗");
  } else if (
    !cartData.every((e) => {
      return e.shopName === cartData[0].shopName;
    })
  ) {
    popupWindow("you must buy everything from one shop ❗❗❗");
  } else {
    cartData = [];
    saveLocalStorage();
    menu.insertAdjacentElement = "<h2>Chose a restaurant</h2>";
    popupWindow("🎉🎊🎉 your order is on its way to you 🏃‍♂️🏃‍♀️");
    goToShopPage();
  }
});

//////////////////////////////

const showMenu = function (obj) {
  menu.innerHTML = "";

  obj.dishes.forEach((element) => {
    const classOfElem = element.name.replaceAll(" ", "");
    const markup = `        
        <div class="dishContainer">
            <img
            src="${element.src}"
            alt="${element.name} PHOTO"
            class="pictureOfDish"
            />
        <div class="dishDescription"><h4>${element.name}</h4> <span>${element.price}₴</span></div>
        <button class="${classOfElem}">add to Card</button>
      </div>`;

    menu.insertAdjacentHTML("afterbegin", markup);

    document
      .querySelector(`.${classOfElem}`)
      .addEventListener("click", function () {
        if (
          cartData.some((e) => {
            return e.name === element.name;
          })
        ) {
          cartData.at(-1).counter += 1;
        } else {
          cartData.push(element);
          element.counter = 1;
        }
        saveLocalStorage()
      });
  });
};

const generateNavbar = function (data) {
  data.forEach((element) => {
    const markup = `
        <button class="${element.className}">${element.name}</button>
        `;
    navbar.insertAdjacentHTML("beforeend", markup);
    const restaurant = document.querySelector(`.${element.className}`);
    restaurant.addEventListener("click", showMenu.bind(null, element));
  });
};
generateNavbar(shops);
