export default class Card {
  constructor(parent, data) {
    this.parent = parent;
    this.data = data;
  }

  //<div class="card" style="width: 18rem;">
  //	<img src="https://reqres.in/img/faces/2-image.jpg" class="card-img-top" alt="">
  //	<div class="card-body">
  //		<h5 class="card-title">Card title</h5>
  //		<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  //		<a href="#" class="btn btn-primary">Go somewhere</a>
  //	</div>
  //</div>

  create() {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.style = "width: 18rem;";

    this.parent.appendChild(divCard);

    let img = document.createElement("img");
    img.classList.add("card-img-to");
    img.src = this.data.avatar;
    img.alt = this.data.first_name;
    divCard.appendChild(img);

    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    divCard.appendChild(divCardBody);

    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerHTML = this.data.first_name + " " + this.data.last_name;
    divCard.appendChild(h5);

    let p = document.createElement("p");
    p.classList.add("card-text");
    p.innerHTML =
      "Some quick example text to build on the card title and make up the bulk of the card's content.";
    divCard.appendChild(p);

    let a = document.createElement("a");
    a.href = "#";
    a.innerHTML = "Go somewhere";
    divCard.appendChild(a);
  }
}
