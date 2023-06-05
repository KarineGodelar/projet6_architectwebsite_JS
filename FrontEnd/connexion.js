// page de connexion 
const connexionForm = document.querySelector(".connexion-form");

connexionForm.addEventListener("submit", async function (event) {
  

  
    event.preventDefault();
    const login = await {
        "email": event.target.querySelector("[name=email]").value,
        "password": event.target.querySelector("[name=password]").value,
    };
    const chargeUtile = JSON.stringify(login);
    const loginReponse = await fetch("http://localhost:5678/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    const loginOK = await loginReponse.json();
    console.log (loginOK);
    window.localStorage.setItem("token", loginOK.token);
    console.log (loginOK.message);
});
// try{    
//     if (loginOK.token === undefined ) {
//         throw new Error("Erreur dans l'identifiant ou le mot de passe");
//     }
// }

// catch (error) {
//             let errorMessage = document.querySelector(".error-message");
//             errorMessage.innerHTML = error.message;
//             console.log(error.message);

// }})

const tokenRecupere = window.localStorage.getItem("token");
console.log("token recupéré de l'API :", tokenRecupere);

export function isLogged() {
    if (tokenRecupere !== null) {
        document.location.href = "index.html";
        return true;
    } else {
        return false;
    }
}