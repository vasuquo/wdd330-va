import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
      <h2 class="card__brand">${product.NameWithoutBrand}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`
}
export default class ProductList {
    constructor(category, sourceData, listElement) {
        this.category = category;
        this.sourceData = sourceData;
        this.listElement = listElement;
    }

    async init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
        const list = await this.sourceData.getData();
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}