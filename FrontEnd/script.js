//Générer la galerie de photos à partir de l'API
function genererGallery(projets) {
    const gallerySection = document.querySelector(".gallery");
    gallerySection.innerHTML = "";

    for (let i = 0; i < projets.length; i++) {
        const galleryFigure = document.createElement("figure");
        const workImage = document.createElement("img");
        workImage.src = projets[i].imageUrl;
        workImage.alt = projets[i].title;
        galleryFigure.appendChild(workImage);
        const workFigcaption = document.createElement("figcaption");
        workFigcaption.innerHTML = projets[i].title;
        galleryFigure.appendChild(workFigcaption);
        gallerySection.appendChild(galleryFigure);

    }
}

const projectTable = [0];

document.addEventListener("DOMContentLoaded", async function () {
    const reponse = await fetch("http://localhost:5678/api/works/");
    const projets = await reponse.json();

    genererGallery(projets);

    const gallerySet = new Set();
    for (let i = 0; i < projets.length; i++) {
        gallerySet.add(projets[i]);
    }

    console.log(gallerySet);
    console.log(projets);



    const boutonTous = document.querySelector(".tous-button");
    boutonTous.addEventListener("click", () => {
        genererGallery(projets);
        boutonTous.classList.add("green-button");
        boutonObjets.classList.remove("green-button");
        boutonAppart.classList.remove("green-button");
        boutonHotels.classList.remove("green-button");
    });

    const boutonObjets = document.querySelector(".objets-button");
    boutonObjets.addEventListener("click", async function () {
        boutonObjets.classList.add("green-button");
        boutonTous.classList.remove("green-button");
        boutonAppart.classList.remove("green-button");
        boutonHotels.classList.remove("green-button");

        const projetsObjets = Array.from(projets).filter(function (projet) {
            return projet.categoryId == 1;
        }
        )

        genererGallery(projetsObjets);
        console.log(projetsObjets);
    })

    const boutonAppart = document.querySelector(".appart-button");
    boutonAppart.addEventListener("click", async function () {
        boutonAppart.classList.add("green-button");
        boutonTous.classList.remove("green-button");
        boutonObjets.classList.remove("green-button");
        boutonHotels.classList.remove("green-button");

        const projetsAppart = Array.from(projets).filter(function (projet) {
            return projet.categoryId == 2;
        }
        )

        genererGallery(projetsAppart);
        console.log(projetsAppart);
    });

    const boutonHotels = document.querySelector(".hotels-button");
    boutonHotels.addEventListener("click", async function () {
        boutonHotels.classList.add("green-button");
        boutonTous.classList.remove("green-button");
        boutonObjets.classList.remove("green-button");
        boutonAppart.classList.remove("green-button");

        const projetsHotels = Array.from(projets).filter(function (projet) {
            return projet.categoryId == 3;
        }
        )

        genererGallery(projetsHotels);
        console.log(projetsHotels);
    });
});

// gestion connexion / déconnexion

const tokenRecupere = window.localStorage.getItem("token");
console.log("token recupéré de l'API :", tokenRecupere);
if (tokenRecupere !== undefined ) {
    document.querySelector(".login-menu").innerHTML="logout";
    document.querySelector(".login-menu").addEventListener ("click", () => {
        window.localStorage.removeItem("token");
        document.location.href = "connexion.html";
    }
    
    )
}

// Fenêtre modale

const modalSection = document.querySelector(".js-modale");
let cibleModale = null;

function openModale(e) {
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    cibleModale = target;
    cibleModale.addEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-close").addEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-stop").addEventListener("click", stopPropagation);
}

function closeModale(e) {

    if (cibleModale === null) return;

    e.preventDefault();
    cibleModale.style.display = "none";
    cibleModale.setAttribute("aria-hidden", "true");
    cibleModale.removeAttribute("aria-modal");
    cibleModale.removeEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-close").removeEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation);
    cibleModale = null;
}

function stopPropagation(event) {
    event.stopPropagation();
}


modalSection.addEventListener("click", (event) => {
    openModale(event);
}

);

function genererPhotosModale(projets) {
    const gallerySection = document.querySelector(".gallery-modale");
    gallerySection.innerHTML = "";

    for (let i = 0; i < projets.length; i++) {
        const galleryFigure = document.createElement("figure");
        galleryFigure.classList.add("picture-edit");
        const workImage = document.createElement("img");
        workImage.src = projets[i].imageUrl;
        galleryFigure.appendChild(workImage);
        const workFigcaption = document.createElement("figcaption");
        workFigcaption.innerHTML = "éditer";
        galleryFigure.appendChild(workFigcaption);
        gallerySection.appendChild(galleryFigure);
    }}

//modale 2 , je recopie la fonction openModale

function openModale2() {
    const target = document.querySelector("#modale2");
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    cibleModale = target;
    cibleModale.addEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-close").addEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-stop").addEventListener("click", stopPropagation);
}

//



modalSection.addEventListener("click", async function () {
    const reponse = await fetch("http://localhost:5678/api/works/");
    const projets = await reponse.json();
    genererPhotosModale(projets);
    const editPicture = document.querySelectorAll(".picture-edit");

    for (let i = 0; i < editPicture.length; i++) {
        editPicture[i].addEventListener("click", function (e) {
            openModale2(e);
        });
    }

});