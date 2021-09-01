import Card from "./card";
import Form from "./form";
import { processTemplate } from "./util.js";

import "./styles.css";

let app = document.getElementById("app");

let myConfirmModal;

const updateData = (id, name) => {
  axios
    .put("https://reqres.in/api/users/" + id, {
      name: "name"
    })
    .then((response) => {
      console.log(response);
    });
};

const deleteUser = (id) => {
  axios.delete("https://reqres.in/api/users/" + id).then((response) => {
    console.log(response);
    var card = document.getElementById("card" + id);
    card.remove();

    myConfirmModal.hide();
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

      const deleteButton = document.querySelector("#deleteButton" + data.id);

      deleteButton.addEventListener("click", () => {
        //var result = confirm("Are you sure you want to delete the profile?");
        //if (result === true) {
        //  deleteUser(data.id);
        //}

        if (!myConfirmModal) {
          myConfirmModal = new bootstrap.Modal(
            document.getElementById("myConfirmModal")
          );
        }

        myConfirmModal.show();

        let deleteConfirmButton = document.querySelector(
          "#deleteConfirmButton"
        );

        deleteConfirmButton.addEventListener(
          "click",
          (event) => {
            deleteUser(data.id);
          },
          { once: true }
        );
      });
    }
  });
};

showUserCards();
