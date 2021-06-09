import Form from "./form";
export default class Modal {
  constructor(id) {
    this.id = id;
    this.modalId = id + "Modal";
    this.template = `

    `;
  }

  getHTML() {
    return this.template;
  }
}
