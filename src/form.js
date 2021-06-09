export default class Form {
  constructor() {
    this.template = `
    <form>
      <div class="form-group">
        <label for="exampleInputPassword1">First Name</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="{first_name}">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Last Name</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="{last_name}">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="{email}">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
    </form>
    `;
  }

  getHTML() {
    return this.template;
  }
}
