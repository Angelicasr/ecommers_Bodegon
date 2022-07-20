const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
{
    id: 1,
    title: "gold label",
    price: 119,
    colors: [
    {
        code: "lightgray",
        img: "imagen/gold label.png",
    },
    {
        code: "green",
        img: "imagen/black label.png",
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
        img: "/imagen/vodka absolut.jpg",
    },
    {
        code: "green",
        img: "/imagen/absolut raspbery.png",
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
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
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