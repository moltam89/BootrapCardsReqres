import Form from "./form.js";
import Modal from "./modal.js";
import { processTemplate } from "./util.js";
export default class Card {
  constructor(parent, data) {
    this.id = "_" + data.id;
    this.parent = parent;
    this.data = data;
    this.data.name = this.data.first_name + ` ` + this.data.last_name;
    this.template =
      `
    <div class="card" style="width: 18rem;">
      <img src="{avatar}" class="card-img-top" alt="{first_name}">
      <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <div id="` +
      this.id +
      `"><div/>
      </div>
    </div>
    `;
  }

  create() {
    this.parent.innerHTML += processTemplate(this.template, this.data);

    let modalDiv = document.getElementById(this.id);

    modalDiv.innerHTML = new Modal(this.id).getHTML();

    let formDiv = document.getElementById(this.id + "form");

    formDiv.innerHTML = processTemplate(new Form(this.id).getHTML(), this.data);
  }
}
