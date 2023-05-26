// Récupération des projets dans l'API
const projects = fetch("http://localhost:5678/api/works/").then(function (response) {
    return response.json();
}).then(function(works){
    console.log(works);
});

// works est le tableau de projets
