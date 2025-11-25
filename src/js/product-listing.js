import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const category = getParam("category");
const catName = document.querySelector("#category");
catName.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
const ulElement = document.querySelector(".product-list");
const dataSource = new ExternalServices();
const prouctList = new ProductList(category, dataSource, ulElement);

loadHeaderFooter();
prouctList.init();
