import "regenerator-runtime/runtime";
import Card from "./card";
import Form from "./form";
import { processTemplate } from "./util.js";

import "./styles.css";

let Users = {};

let app = document.getElementById("app");

var carousel = new bootstrap.Carousel(document.querySelector("#carouselId"));

let minId = 0;
const MAX_ID = 10000;
const modal = new bootstrap.Modal(document.getElementById("profileModal"));
const modalBody = document.querySelector(".modal-body");

const saveButton = document.querySelector("#saveButton");
saveButton.addEventListener("click", saveButtonClick);

let confirmModal = new bootstrap.Modal(document.getElementById("confirmModal"));

const deleteButton = document.querySelector("#deleteConfirmButton");
deleteButton.addEventListener("click", deleteButtonClick);

function addUserToCarousel(data, active) {
  var div = document.createElement("div");

  div.classList = "carousel-item";
  if (active) {
    div.classList += " active";
  }

  let carouselInnerElement = document.getElementById("carouselInnerId");

  let card = new Card(app, data);

  div.innerHTML = card.getHTML();

  carouselInnerElement.append(div);

  const profileButton = document.querySelector("#profileButton" + data.id);
  profileButton.addEventListener("click", openProfileModal);

  const deleteButton = document.querySelector("#deleteButton" + data.id);
  deleteButton.addEventListener("click", openDeleteModal);
}

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

function setMinId(newId) {
  if (newId > minId) {
    minId = newId;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function createNewProfileButton() {
  let button = document.getElementById("newProfileButton");

  button.addEventListener("click", () => {
    openProfileModal(getEmptyData());
  });
}

function deleteButtonClick(e) {
  let id;

  if (
    e.currentTarget &&
    e.currentTarget.dataset &&
    e.currentTarget.dataset.id
  ) {
    id = e.currentTarget.dataset.id;
  }

  deleteUser(id);
}

function deleteUser(id) {
  axios.delete("https://reqres.in/api/users/" + id).then(function (response) {
    console.log(response);
    var card = document.getElementById("card" + id);
    console.log(id);

    if (card) {
      card.remove();
    }

    confirmModal.hide();
  });
}

function openDeleteModal(e) {
  if (
    e.currentTarget &&
    e.currentTarget.dataset &&
    e.currentTarget.dataset.id
  ) {
    deleteButton.dataset.id = e.currentTarget.dataset.id;
  }

  confirmModal.show();
}

function saveButtonClick(e) {
  let id,
    user = {};

  if (
    e.currentTarget &&
    e.currentTarget.dataset &&
    e.currentTarget.dataset.id
  ) {
    id = e.currentTarget.dataset.id;
    user = Users[id];
  }

  let first_name = document.querySelector("#formGroupExampleInput1").value;
  let last_name = document.querySelector("#formGroupExampleInput2").value;
  let avatar = document.querySelector("#formGroupExampleInput3").value;
  let email = document.querySelector("#exampleInputEmail1").value;

  if (first_name != "") {
    user.first_name = first_name;
  }

  if (last_name != "") {
    user.last_name = last_name;
  }

  if (email != "") {
    user.email = email;
  }

  if (avatar != "") {
    user.avatar = avatar;
  }

  user.name = user.first_name + " " + user.last_name;

  let oldCard = document.querySelector("#card" + user.id);
  if (!oldCard) {
    createUser(user);
    modal.hide();
    return;
  }

  oldCard.querySelector("h5").innerHTML = user.name;
  if (avatar != "") {
    oldCard.querySelector("img").src = user.avatar;
  }

  if (first_name != "" || last_name != "") {
    updateUser(user.id, user.name);
  }

  modal.hide();
}

function openProfileModal(e) {
  let id,
    user = {};

  if (
    e.currentTarget &&
    e.currentTarget.dataset &&
    e.currentTarget.dataset.id
  ) {
    id = e.currentTarget.dataset.id;
    user = Users[id];
    saveButton.dataset.id = id;
  }

  modalBody.innerHTML = processTemplate(new Form().getHTML(), user);
  modal.show();
}

function showUserCards() {
  axios.get("https://reqres.in/api/users").then(function (response) {
    //for (let x in response.data.data) {
    for (let i = 0; i < response.data.data.length; i++) {
      let user = response.data.data[i];
      Users[user.id] = user;

      setMinId(user.id);

      let active = false;
      if (i == 0) {
        active = true;
      }
      addUserToCarousel(user, active);
    }
  });
}

function updateUser(id, name) {
  axios
    .put("https://reqres.in/api/users/" + id, {
      name: "name"
    })
    .then(function (response) {
      console.log(response);
    });
}

function createUser(user) {
  axios.put("https://reqres.in/api/users/", user).then(function (response) {
    console.log(response);
    let id = response.data.id;

    if (id == null) {
      id = getRandomInt(minId, MAX_ID);
    }

    user.id = id;
    Users[user.id] = user;
    addUserToCarousel(user, false);
    carousel.to(Object.keys(Users).length - 1);
  });
}
