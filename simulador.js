const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}

function start() {
    addEvents();
}

function update() {
    addEvents();
    updateTotal();
}

function addEvents() {

    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
    });

    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
    });

    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
    });

    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}

let itemsAdded = [];

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".sliderTitle").innerHTML;
    let price = product.querySelector(".sliderPrice").innerHTML;
    let imgSrc = product.querySelector(".sliderImg").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
    title,
    price,
    imgSrc,
    };


    if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
    } else {
    itemsAdded.push(newToAdd);
    }


    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}

function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
    (el) =>
        el.title !=
        this.parentElement.querySelector(".cart-product-title").innerHTML
    );

    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
    }
  this.value = Math.floor(this.value); // to keep it integer

    update();
}

function handle_buyOrder() {
    if (itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Your Order is Placed Successfully :)");
    itemsAdded = [];

    update();
}


function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
    });

    total = total.toFixed(2);



    totalElement.innerHTML = "$" + total;
}

function CartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

const products = [
{
    id: 1,
    title: "gold label",
    price: 119,
    colors: [
    {
        code: "lightgray",
        img: "/imagen/gold label.png",
    },
    {
        code: "green",
        img: "/imagen/black label.png",
    },
    ],
},
    {
    id: 2,
    title: "vodka absolut",
    price: 149,
    colors: [
    {
        code: "lightgray",
        img: "/imagen/absolud_vodka.png",
    },
    {
        code: "green",
        img: "/imagen/absolut_raspbery-removebg-preview.png",
    },
    ],
    },
    {
    id: 3,
    title: "ron",
    price: 109,
    colors: [
    {
        code: "lightgray",
        img: "/imagen/ron diplomatico.png",
    },
    {
        code: "green",
        img: "/imagen/ron caldas.png",
    },
    ],
    },
    {
    id: 4,
    title: "vinos",
    price: 129,
    colors: [
    {
        code: "black",
        img: "/imagen/vino concha y toro.png",
    },
    {
        code: "lightgray",
        img: "/imagen/vino abadal.png",
    },
    ],
    },
    {
    id: 5,
    title: "cervezas",
    price: 99,
    colors: [
    {
        code: "gray",
        img: "/imagen/cerveza-andes-cerveza-online-612382.png",
    },
    {
        code: "black",
        img: "/imagen/cerveza brahma.png",
    },
    ],
    },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    choosenProduct = products[index];

    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    currentProductColors.forEach((color, index) => {
        color.style.backgroundColor = choosenProduct.colors[index].code;
    });
    });
});

currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
    });
});

currentProductSizes.forEach((size, index) => {
    size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
        size.style.backgroundColor = "white";
        size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
    });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
    payment.style.display = "flex";
});

close.addEventListener("click", () => {
    payment.style.display = "none";
});

