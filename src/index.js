import Card from "./card";
import Form from "./form";
import { processTemplate } from "./util.js";

import "./styles.css";

let app = document.getElementById("app");
showUserCards();

async function deleteUser(id, confirmModal) {
  let response = await axios.delete("https://reqres.in/api/users/" + id);

  console.log(response);
  var card = document.getElementById("card" + id);

  if (card) {
    card.remove();
  }

  if (confirmModal) {
    confirmModal.hide();
  }
}

function openDeleteModal(data) {
  let confirmModal = new bootstrap.Modal(
    document.getElementById("confirmModal")
  );

  confirmModal.show();

  let deleteConfirmButton = document.querySelector("#deleteConfirmButton");

  deleteConfirmButton.addEventListener(
    "click",
    () => {
      deleteUser(data.id, confirmModal);
    },
    { once: true }
  );
}

function openProfileModal(data, modalId) {
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = processTemplate(new Form().getHTML(), data);
  modal.show();

  let saveButton = document.querySelector("#saveButton");

  saveButton.addEventListener(
    "click",
    () => {
      let first_name = document.querySelector("#formGroupExampleInput1").value;
      let last_name = document.querySelector("#formGroupExampleInput2").value;
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

      modal.hide();
    },
    { once: true }
  );
}

function showUserCard(data) {
  let card = new Card(app, data);
  app.insertAdjacentHTML("beforeend", card.getHTML());

  const profileButton = document.querySelector("#profileButton" + data.id);

  profileButton.addEventListener("click", () => {
    openProfileModal(data, "profileModal");
  });

  const deleteButton = document.querySelector("#deleteButton" + data.id);

  deleteButton.addEventListener("click", () => {
    openDeleteModal(data);
  });
}

async function showUserCards() {
  let response = await axios.get("https://reqres.in/api/users");
  for (let x in response.data.data) {
    showUserCard(response.data.data[x]);
  }
}

async function updateData(id, name) {
  let response = await axios.put("https://reqres.in/api/users/" + id, {
    name: "name"
  });

  console.log(response);
}
