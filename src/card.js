import Form from "./form.js";
import Modal from "./modal.js";
import { processTemplate } from "./util.js";
export default class Card {
  constructor(parent, data) {
    this.id = data.id;
    this.parent = parent;
    this.data = data;
    this.data.name = this.data.first_name + ` ` + this.data.last_name;
    this.template = `
    <div class="card" style="width: 18rem;">
      <img src="{avatar}" class="card-img-top" alt="{first_name}">
      <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <!-- Button trigger modal -->
        <button id="button{id}" type="button" class="btn btn-primary profileButton">
          Profile
        </button>
      </div>
    </div>
    `;
  }

  getHTML() {
    return processTemplate(this.template, this.data);
  }
}
