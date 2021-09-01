export default class ConfirmModal {
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
