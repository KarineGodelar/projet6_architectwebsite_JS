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

document.addEventListener("DOMContentLoaded", async function () {

    const reponse = await fetch("http://localhost:5678/api/works/");
    const projets = await reponse.json();

    genererGallery(projets);

    // Création des boutons de filtrage

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
        });
        genererGallery(projetsObjets);
    });

    const boutonAppart = document.querySelector(".appart-button");
    boutonAppart.addEventListener("click", async function () {
        boutonAppart.classList.add("green-button");
        boutonTous.classList.remove("green-button");
        boutonObjets.classList.remove("green-button");
        boutonHotels.classList.remove("green-button");

        const projetsAppart = Array.from(projets).filter(function (projet) {
            return projet.categoryId == 2;
        });
        genererGallery(projetsAppart);
    });

    const boutonHotels = document.querySelector(".hotels-button");
    boutonHotels.addEventListener("click", async function () {
        boutonHotels.classList.add("green-button");
        boutonTous.classList.remove("green-button");
        boutonObjets.classList.remove("green-button");
        boutonAppart.classList.remove("green-button");
        const projetsHotels = Array.from(projets).filter(function (projet) {
            return projet.categoryId == 3;
        });
        genererGallery(projetsHotels);
    });
});

// Gestion connexion / déconnexion

const modalSection = document.querySelectorAll(".js-modale");
const tokenRecupere = window.localStorage.getItem("token");
console.log("token recupéré de l'API :", tokenRecupere);
if (tokenRecupere !== null) {
    document.querySelector(".login-menu").innerHTML = "logout";
    document.querySelector(".login-menu").addEventListener("click", () => {
        window.localStorage.removeItem("token");
        document.location.href = "connexion.html";
    });
    document.querySelector(".categories").style.display = "none";
} else {
    for (let i = 0; i < modalSection.length; i++) {
        modalSection[i].style.display = "none";
    }
}

// Fenêtre modale 1

let cibleModale = null;

function openModale(e) {
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    cibleModale = target;
    cibleModale.addEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-1-close").addEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-1-stop").addEventListener("click", stopPropagation);
}

function closeModale(e) {

    if (cibleModale === null) return;

    e.preventDefault();
    cibleModale.style.display = "none";
    cibleModale.removeEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-1-close").removeEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-1-stop").removeEventListener("click", stopPropagation);
    cibleModale = null;
}

function stopPropagation(event) {
    event.stopPropagation();
}

for (let i = 0; i < modalSection.length; i++) {

    modalSection[i].addEventListener("click", (event) => {
        openModale(event);
    });
}

function genererPhotosModale(projets) {
    const gallerySection = document.querySelector(".gallery-modale");
    gallerySection.innerHTML = "";

    for (let i = 0; i < projets.length; i++) {
        const galleryFigure = document.createElement("figure");
        galleryFigure.classList.add("picture-edit");
        const supprIcon = document.createElement("img");
        supprIcon.classList.add("suppr-icon");
        supprIcon.src = "./assets/icons/suppr-icon-svg.svg";
        galleryFigure.appendChild(supprIcon);
        const workImage = document.createElement("img");
        workImage.src = projets[i].imageUrl;
        galleryFigure.appendChild(workImage);
        const workFigcaption = document.createElement("figcaption");
        workFigcaption.classList.add("edit-button");
        workFigcaption.innerHTML = "éditer";
        galleryFigure.appendChild(workFigcaption);
        gallerySection.appendChild(galleryFigure);
    }
}

//Fonctions pour la modale 2

function openModale2(e) {
    e.preventDefault();
    const target = document.querySelector("#modale2");
    target.style.display = null;
    cibleModale = target;
    cibleModale.addEventListener("click", closeModale2);
    cibleModale.querySelector(".js-modale-2-back").addEventListener("click", backModale2);
    cibleModale.querySelector(".js-modale-2-close").addEventListener("click", closeModale2);
    cibleModale.querySelector(".js-modale-2-stop").addEventListener("click", stopPropagation);
}

function backModale2(e) {

    if (cibleModale === null) return;

    e.preventDefault();
    cibleModale.style.display = "none";
    cibleModale.removeEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-2-close").removeEventListener("click", backModale2);
    cibleModale.querySelector(".js-modale-2-stop").removeEventListener("click", stopPropagation);
    cibleModale = null;
}

function closeModale2(e) {
    const cibleModale1 = document.querySelector("#modale");
    if (cibleModale === null) return;

    e.preventDefault();
    cibleModale.style.display = "none";
    cibleModale1.style.display = "none";
    cibleModale.removeEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-2-close").removeEventListener("click", closeModale2);
    cibleModale.querySelector(".js-modale-2-stop").removeEventListener("click", stopPropagation);
    cibleModale = null;
}

for (let i = 0; i < modalSection.length; i++) {

    modalSection[i].addEventListener("click", async function (e) {
        e.preventDefault;
        const reponse = await fetch("http://localhost:5678/api/works/");
        const projets = await reponse.json();
        genererPhotosModale(projets);

        // Clic sur bouton supprimer avec le logo de la poubelle

        const supprIcons = document.querySelectorAll(".suppr-icon");
        for (let i = 0; i < supprIcons.length; i++) {
            supprIcons[i].addEventListener("click", async function (e) {
                e.preventDefault;
                await fetch(`http://localhost:5678/api/works/${projets[i].id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${tokenRecupere}` }
                });
                const afterDeleteProjets = projets.filter((projet) => {
                    return projet.id !== projets[i].id;
                });
                genererGallery(afterDeleteProjets);
                genererPhotosModale(afterDeleteProjets);
            });
        }
    });
}

// Fermeture de la modale page 1 par la croix

document.querySelector(".js-modale-1-close").addEventListener("click", () => {
    document.querySelector("#modale").style.display = "none";
});

document.querySelector(".ajouter-photo").addEventListener("click", async function (e) {
    openModale2(e);

    // Récupérer les catégories dans l'API
    let categorySection = document.querySelector("#form-category");
    categorySection.innerHTML = "";
    const reponse = await fetch("http://localhost:5678/api/categories/");
    const categories = await reponse.json();
    console.log("categories", categories);
    for (let i = 0; i < categories.length; i++) {
        const categoryOption = document.createElement("option");
        categoryOption.value = categories[i].id;
        categoryOption.innerHTML = categories[i].name;
        categoryOption.classList.add("form-category-option");
        categorySection.appendChild(categoryOption);
    }

});

// Formulaire modale page 2 partie "Ajout photo"

let balisePhotoFile = document.getElementById("ajout-file-photo");

balisePhotoFile.addEventListener("change", () => {
    if (document.getElementById("ajout-file-photo").value !== "") {
        document.querySelector(".ajout-photo-image").style.display = "none";
        document.querySelector(".label-ajout-photo-image").innerHTML = "changer de photo";
        document.querySelector(".ajout-photo-button").style.display = "none";
        document.querySelector(".ajout-photo-subtext").style.display = "none";
    }
});

// Formulaire entier modale page 2

let photoForm = document.querySelector(".form2");
var photoFormData = new FormData();
function creerNewProject(e) {
    e.preventDefault();
    let photoFile = balisePhotoFile.value;
    let balisePhotoTitle = document.getElementById("photo-title");
    let photoTitle = balisePhotoTitle.value;
    let baliseCategory = document.getElementById("form-category");
    let photoCategory = baliseCategory.value;
    let fileRegex = new RegExp("[a-z0-9._-]+.(png|jpg)");
    let fileErrorMessage = document.querySelector(".file-error-message");
    if (fileRegex.test(photoFile) === false) {
        fileErrorMessage.innerHTML = "Le fichier choisi n'est pas valide";
    } else {
        fileErrorMessage.innerHTML = "";
    }
    let titleRegex = new RegExp("[a-z0-9._-]");
    let modaleErrorMessage = document.querySelector(".modale-error-message");
    if (titleRegex.test(photoTitle) === false) {
        modaleErrorMessage.innerHTML = "Le titre saisi n'est pas valide";
    } else {
        modaleErrorMessage.innerHTML = "";
    }


    photoFormData.append("image", balisePhotoFile.files[0]);
    photoFormData.append("title", photoTitle);
    photoFormData.append("category", photoCategory);

    console.log("image", balisePhotoFile.files[0]);
    console.log("title", photoTitle);
    console.log("category", photoCategory);


}

// Bouton ajouter photo modale page 2

photoForm.addEventListener("submit", async function (e) {
    creerNewProject(e);
    await fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${tokenRecupere}`
        },
        body: photoFormData
    });
    const reponse = await fetch("http://localhost:5678/api/works/");
    const projets = await reponse.json();

    genererGallery(projets);
    genererPhotosModale(projets);
});






