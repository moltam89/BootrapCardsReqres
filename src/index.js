import Card from "./card";
import "./styles.css";

let app = document.getElementById("app");

const showUserCards = () => {
  axios.get("https://reqres.in/api/users").then((response) => {
    for (let x in response.data.data) {
      let card = new Card(app, response.data.data[x]);
      card.create();
    }
  });
};

showUserCards();
