// Récupération des projets dans l'API

// const projectTable = [];

// const projects = fetch("http://localhost:5678/api/works/").then(function (response) {
//     return response.json();
// }).then(function (works) {
    // const gallerySection = document.querySelector(".gallery");
    // gallerySection.innerHTML = "";


    // for (let i = 0; i < works.length; i++) {
    //     const galleryFigure = document.createElement("figure");
    //     const workImage = document.createElement("img");
    //     workImage.src = works[i].imageUrl;
    //     workImage.alt = works[i].title;
    //     galleryFigure.appendChild(workImage);
    //     const workFigcaption = document.createElement("figcaption");
    //     workFigcaption.innerHTML = works[i].title;
    //     galleryFigure.appendChild(workFigcaption);
    //     gallerySection.appendChild(galleryFigure);

    //     projectTable.push(works[i]);
    // }


// });




function genererGallery(projets){
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

}}


//méthode async await

const projectTable = [];


document.addEventListener("DOMContentLoaded" , async function() {
const reponse = await  fetch("http://localhost:5678/api/works/");
const projets = await reponse.json();

genererGallery(projets);
for (let i = 0; i < projets.length; i++) {
    projectTable.push(projets[i]);
}});

console.log(projectTable[4].title);


// Tri par catégories avec les 4 boutons

// gallerySet = new Set(projectTable);
// console.log(gallerySet);

const boutonTous = document.querySelector(".tous-button");
boutonTous.addEventListener("click", () => {
});

const boutonObjets = document.querySelector(".objets-button");
boutonObjets.addEventListener("click", () => {
    alert("bouton Objets");
}
);

const boutonAppart = document.querySelector(".appart-button");
boutonAppart.addEventListener("click", () => {
    alert("bouton Appart");
}
);

const boutonHotels = document.querySelector(".hotels-button");
boutonHotels.addEventListener("click", () => {
    alert("bouton Hotels");
}
);

// function genererGallery(){

// const gallerySection = document.querySelector(".gallery");
// gallerySection.innerHTML = "";


// for (let i = 0; i < projets.length; i++) {
//     const galleryFigure = document.createElement("figure");
//     const workImage = document.createElement("img");
//     workImage.src = projets[i].imageUrl;
//     workImage.alt = projets[i].title;
//     galleryFigure.appendChild(workImage);
//     const workFigcaption = document.createElement("figcaption");
//     workFigcaption.innerHTML = projets[i].title;
//     galleryFigure.appendChild(workFigcaption);
//     gallerySection.appendChild(galleryFigure);

//     projectTable.push(projets[i]);
// }

// }