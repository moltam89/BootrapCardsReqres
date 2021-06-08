import Form from "./form";
export default class Modal {
  constructor(id) {
    this.id = id;
    this.modalId = id + "Modal";
    this.template =
      `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#` +
      this.modalId +
      `">
      Profile
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="` +
      this.modalId +
      `" tabindex="-1" aria-labelledby="` +
      this.modalId +
      `Label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="` +
      this.modalId +
      `Label">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div id="` +
      this.id +
      `form" class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  getHTML() {
    return this.template;
  }
}
