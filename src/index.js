import Card from "./card";
import Form from "./form";
import { processTemplate } from "./util.js";

import "./styles.css";

let app = document.getElementById("app");
let id = 10;

showUserCards();
createNewProfileButton();

function getEmptyData() {
  return {
    id: 8,
    email: "",
    first_name: "",
    last_name: "",
    avatar: ""
  };
}

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

function createNewProfileButton() {
  let divWrapper = document.createElement("div");
  divWrapper.id = "newProfileButtonDivWrapper";

  let button = document.createElement("button");
  button.id = "newProfileButton";
  button.innerHTML = "Add new profile";
  button.classList = "btn btn-primary";

  button.addEventListener("click", () => {
    openProfileModal(getEmptyData());
  });

  divWrapper.append(button);
  app.appendChild(divWrapper);
}

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

function openProfileModal(data) {
  const modal = new bootstrap.Modal(document.getElementById("profileModal"));
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = processTemplate(new Form().getHTML(), data);
  modal.show();

  let saveButton = document.querySelector("#saveButton");

  saveButton.addEventListener(
    "click",
    () => {
      let first_name = document.querySelector("#formGroupExampleInput1").value;
      let last_name = document.querySelector("#formGroupExampleInput2").value;
      let avatar = document.querySelector("#formGroupExampleInput3").value;
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

      if (avatar != "") {
        data.avatar = avatar;
      }

      data.name = data.first_name + ` ` + data.last_name;

      let oldCard = document.querySelector("#card" + data.id);
      if (!oldCard) {
        createUser(data);
        modal.hide();
        return;
      }
      debugger;
      oldCard.querySelector("h5").innerHTML = data.name;
      if (avatar != "") {
        oldCard.querySelector("img").src = data.avatar;
      }

      if (first_name != "" || last_name != "") {
        updateUser(data.id, data.name);
      }

      modal.hide();
    },
    { once: true }
  );
}

function showUserCard(data) {
  let card = new Card(app, data);

  let parent = document.getElementById("newProfileButtonDivWrapper");

  parent.parentNode.insertBefore(
    createElementFromHTML(card.getHTML()),
    parent.nextSibling
  );

  const profileButton = document.querySelector("#profileButton" + data.id);

  profileButton.addEventListener("click", () => {
    openProfileModal(data);
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

async function updateUser(id, name) {
  let response = await axios.put("https://reqres.in/api/users/" + id, {
    name: "name"
  });

  console.log(response);
}

async function createUser(data) {
  let response = await axios.put("https://reqres.in/api/users/", {
    name: data.first_name,
    job: "leader"
  });

  console.log(response);
  showUserCard(data);
}
