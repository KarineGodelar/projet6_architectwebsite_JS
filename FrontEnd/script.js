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
if (tokenRecupere !== undefined) {
    document.querySelector(".login-menu").innerHTML = "logout";
    document.querySelector(".login-menu").addEventListener("click", () => {
        window.localStorage.removeItem("token");
        document.location.href = "connexion.html";
    }

    )
}

// Fenêtre modale


const modalSection = document.querySelectorAll(".js-modale");
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

//modale 2 , je recopie la fonction openModale

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
    const cibleModale1 = document.querySelector("#modale")
    if (cibleModale === null) return;

    e.preventDefault();
    cibleModale.style.display = "none";
    cibleModale1.style.display = "none";
    cibleModale.removeEventListener("click", closeModale);
    cibleModale.querySelector(".js-modale-2-close").removeEventListener("click", closeModale2);
    cibleModale.querySelector(".js-modale-2-stop").removeEventListener("click", stopPropagation);
    cibleModale = null;
}


//

for (let i = 0; i < modalSection.length; i++) {

    modalSection[i].addEventListener("click", async function () {
        const reponse = await fetch("http://localhost:5678/api/works/");
        const projets = await reponse.json();
        genererPhotosModale(projets);
        //clic sur bouton editer
        const editPicture = document.querySelectorAll(".edit-button");
        for (let i = 0; i < editPicture.length; i++) {
            editPicture[i
            ].addEventListener("click", function (e) {
                openModale2(e);
            });
        }
        // clic sur bouton supprimer
        const supprIcons = document.querySelectorAll(".suppr-icon");
        for (let i = 0; i < supprIcons.length; i++) {
            supprIcons[i].addEventListener("click", async function () {
                await fetch(`http://localhost:5678/api/works/${projets[i].id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${tokenRecupere}` }
                })
            });
        }

    })

};

// fermer la modale 1 par la X

document.querySelector(".js-modale-1-close").addEventListener("click", () => {
    document.querySelector("#modale").style.display = "none";

});

document.querySelector(".ajouter-photo").addEventListener("click", function (e) {
    openModale2(e);
});

// Formulaire ajout photo

let photoForm = document.querySelector(".form2");
photoForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let balisePhotoFile = document.getElementById("ajout-file-photo");
    let photoFile = balisePhotoFile.value;
    let fileRegex = new RegExp("[a-z0-9._-]+\.(png|jpg)$");
    let fileResultat = fileRegex.test(photoFile);
    console.log("photoFile", photoFile)

    let balisePhotoTitle = document.getElementById("title");
    let photoTitle = balisePhotoTitle.value;

    let titleRegex = new RegExp("[a-z0-9._-]");
    let resultat = titleRegex.test(photoTitle);

    let fileErrorMessage = document.querySelector(".file-error-message");
    if (fileResultat === false) {
        fileErrorMessage.innerHTML = "Le fichier choisi n'est pas valide";
    } else {
        fileErrorMessage.innerHTML = "";
    }

    let modaleErrorMessage = document.querySelector(".modale-error-message");
    if (resultat === false) {
        modaleErrorMessage.innerHTML = "Le titre saisi n'est pas valide";
    } else {
        modaleErrorMessage.innerHTML = "";
    }

    let baliseCategory = document.getElementById("form-category");
    let photoCategory = baliseCategory.value;

    //essai

    const tableau = balisePhotoFile.files;
    console.log ("tableau",tableau[0].name);

    // Ajout d'un nouveau projet

    var photoFormData = new FormData();
    photoFormData.append("image", balisePhotoFile.files[0]);
    photoFormData.append("title", photoTitle);
    photoFormData.append("category", photoCategory);

    console.log(photoFormData);

    const fetchReponse = await fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${tokenRecupere}`
        },
        body: photoFormData
    });

    // const projetFetch = await fetchReponse.json();
    // console.log("projetFetch", projetFetch);
})



