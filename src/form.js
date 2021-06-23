export default class Form {
  constructor() {
    this.template = `
    <form>
      <div class="form-group">
        <label for="formGroupExampleInput1">First Name</label>
        <input type="text" class="form-control" id="formGroupExampleInput1" value="{first_name}">
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Last Name</label>
        <input type="test" class="form-control" id="formGroupExampleInput2" value="{last_name}">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{email}">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
    </form>
    `;
  }

  getHTML() {
    return this.template;
  }
}
