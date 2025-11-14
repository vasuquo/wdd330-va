import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const ulElement = document.querySelector(".product-list");
const products = new ProductList("tents", dataSource, ulElement);
loadHeaderFooter();
products.init();