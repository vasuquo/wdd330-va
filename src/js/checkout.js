import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const orderElement = document.querySelector(".order-summary");
const zipcode = document.getElementById("zip");
const submitOrder = document.getElementById("submit-order");
const checkoutProcess = new CheckoutProcess("so-cart", orderElement);
loadHeaderFooter();
checkoutProcess.init();
zipcode.addEventListener("change", () => {
    checkoutProcess.calculateOrderTotal();
});

submitOrder.addEventListener("click", (e) => {
    e.preventDefault();   
    checkoutProcess.checkout();
});

