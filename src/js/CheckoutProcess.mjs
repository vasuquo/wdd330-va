import { formatCurrency, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function packageItems(items) {
  const simpleItems = items.map((item) => {
    return {
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: 1,
    };    
  });      
  
  return simpleItems;
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.outputSelector = outputSelector;
        this.key = key;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce((accum, item) => accum + item.FinalPrice, 0);
        const subtotal = document.querySelector(`.${this.outputSelector.className} #subtotal`);
        subtotal.innerText = `Subtotal:  $${formatCurrency(this.itemTotal)}`;        
    }

    calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
       this.tax = (this.itemTotal * .06);
       this.shipping = 10 + (this.list.length-1) * 2; 
       this.orderTotal = this.itemTotal + this.shipping + this.tax;

    // display the totals.
       this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`.${this.outputSelector.className} #tax`);
    tax.innerText = `Tax:  $${formatCurrency(this.tax)}`;
    
    const shipping = document.querySelector(`.${this.outputSelector.className} #shipping`);
    shipping.innerText = `Shipping:  $${formatCurrency(this.shipping)}`;

    const order = document.querySelector(`.${this.outputSelector.className} #order`);
    order.innerText = `Order Total:  $${formatCurrency(this.orderTotal)}`;

  }

  async checkout() {
    const orderForm = document.forms["orderForm"];
    const orders = formDataToJSON(orderForm);
    const orderDate = new Date().toDateString();
    orders.orderDate = orderDate;
    orders.orderTotal = this.orderTotal;
    orders.tax = this.tax;
    orders.shipping = this.shipping;
    orders.items = packageItems(this.list);

    try {
      const response = await services.checkout(orders);
      location.assign("../checkout/success.html");
      setLocalStorage(this.key, []);
      console.log(response);
    } catch (err) {
      console.log(err);
    }


    
  }
    
}

