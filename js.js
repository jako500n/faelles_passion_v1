let modal = document.querySelector("#modal");
// Globale variabler
let json;
let filter = "alle";

const url = "https://t7passionsopgave-bbad.restdb.io/rest/attractions";
let attractions;
const filterknapper = document.querySelectorAll("button");
const options = {
  headers: {
    "x-apikey": "620f892934fd6215658587cf",
  },
};
document.addEventListener("DOMContentLoaded", start);

function start() {
  filterknapper.forEach((knap) => {
    knap.addEventListener("click", setFilter);
  });
  hentData();
}

function setFilter() {
  filter = this.dataset.kategori; // Sætter variblen til det der er valgt
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  // document.querySelector("h2").textContent = this.textContent;

  vis();
}

async function hentData() {
  const respons = await fetch(url, options);
  attractions = await respons.json();
  vis();
}

function vis() {
  console.log(attractions);

  // Forbindelse til HTML elementer
  const modal = document.querySelector("#modal");
  const temp = document.querySelector("template").content;
  const container = document.querySelector("section");

  container.textContent = ""; // Ryd container

  container.innerHTML = "";
  attractions.forEach((attractions) => {
    if ((filter = attractions.kategori || filter == "alle")) {
      const klon = temp.cloneNode(true);
      klon.querySelector("img").src = "images/" + attractions.billede;
      klon.querySelector("h2").textContent = `${attractions.navne}`;

      klon.querySelector(".adresse").textContent = `${attractions.adresse}`;
      klon.querySelector(".paragraf").textContent = attractions.paragraf;
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(attractions));
      container.appendChild(klon);
    }
  });
}

function visDetaljer(attractions) {
  console.log(attractions);
  modal.querySelector("h2").textContent = `${attractions.navn}`;
  modal.querySelector(".beskrivelse").textContent = `${attractions.paragraf}`;
  modal.querySelector("img").src = "images/" + attractions.billede;
  modal.querySelector(".adresse").textContent =
    "adresse: " + attractions.adresse + ",-";
  modal.style.display = "block";
}

modal.addEventListener("click", () => (modal.style.display = "none"));
