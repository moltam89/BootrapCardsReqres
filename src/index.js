import Card from "./card";
import Form from "./form";
import { processTemplate } from "./util.js";

import "./styles.css";

let app = document.getElementById("app");

const updateData = (id, name) => {
  axios
    .put("https://reqres.in/api/users/" + id, {
      name: "name"
    })
    .then((response) => {
      console.log(response);
    });
};

const showUserCards = () => {
  axios.get("https://reqres.in/api/users").then((response) => {
    for (let x in response.data.data) {
      const data = response.data.data[x];
      let card = new Card(app, data);
      app.insertAdjacentHTML("beforeend", card.getHTML());

      const button = document.querySelector("#button" + data.id);

      button.addEventListener("click", () => {
        const myModal = new bootstrap.Modal(document.getElementById("myModal"));
        const myModalBody = document.querySelector(".modal-body");
        const form = new Form();
        myModalBody.innerHTML = processTemplate(form.getHTML(), data);
        myModal.show();

        let saveButton = document.querySelector("#saveButton");

        saveButton.addEventListener(
          "click",
          () => {
            let first_name = document.querySelector("#formGroupExampleInput1")
              .value;
            let last_name = document.querySelector("#formGroupExampleInput2")
              .value;
            let email = document.querySelector("#exampleInputEmail1").value;

            if (first_name != "") {
              data.first_name = first_name;
            }

            if (last_name != "") {
              data.last_name = last_name;
            }

            if (email != "") {
              data.email = email;
            }

            data.name = data.first_name + ` ` + data.last_name;

            let oldCard = document.querySelector("#card" + data.id);
            debugger;
            oldCard.querySelector("h5").innerHTML = data.name;

            if (first_name != "" || last_name != "") {
              updateData(data.id, data.name);
            }

            myModal.hide();
          },
          { once: true }
        );
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
