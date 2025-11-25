import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cartItems = getLocalStorage("so-cart");
const cartElement = document.querySelector(".cart-list");
const totalElement = document.querySelector(".cart-footer");

const shoppingCart = new ShoppingCart(cartItems, cartElement, totalElement);

loadHeaderFooter();
shoppingCart.init();
