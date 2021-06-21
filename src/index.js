import Card from "./card";
import Form from "./form";
import { processTemplate } from "./util.js";

import "./styles.css";

let app = document.getElementById("app");

const sendData = () => {
  axios
    .post("https://reqres.in/api/register", {
      email: "eve.holt@reqres.in",
      password: "pistol"
    })
    .then((response) => {
      console.log(response);
    });
};

const updateData = () => {
  axios
    .put("https://reqres.in/api/users/2", {
      name: "morepheus",
      job: "zion resident"
    })
    .then((response) => {
      console.log(response);
    });
};

sendData();
updateData();

const showUserCards = () => {
  axios.get("https://reqres.in/api/users").then((response) => {
    for (let x in response.data.data) {
      const data = response.data.data[x];
      let card = new Card(app, data);
      app.insertAdjacentHTML("beforeend", card.getHTML());

      const button = document.querySelector("#button" + data.id);

      button.addEventListener("click", () => {
        console.log("profile");
        const myModal = new bootstrap.Modal(document.getElementById("myModal"));
        const myModalBody = document.querySelector(".modal-body");
        const form = new Form();
        myModalBody.innerHTML = processTemplate(form.getHTML(), data);
        myModal.show();
      });
    }
    /*const buttons = document.querySelectorAll(".profileButton");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        console.log("profile");
        const myModal = new bootstrap.Modal(document.getElementById("myModal"));
        const myModalBody = document.querySelector(".modal-body");
        const form = new Form();
        myModalBody.innerHTML = processTemplate(form.getHTML(), this.data);
        myModal.show();
      });
    });*/
  });
};

showUserCards();
