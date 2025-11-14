import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cartItems = getLocalStorage("so-cart");
const cartElement = document.querySelector(".product-list")

const shoppingCart = new ShoppingCart(cartItems, cartElement);

loadHeaderFooter();
shoppingCart.init();
