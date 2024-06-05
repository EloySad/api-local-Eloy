// Guardian basico para evitar ingresar al login en caso tal de estar logeado

(function () {
    const userSesion = localStorage.getItem("userSesion")

    if (userSesion != null) {
        window.location.href = "../views/dashboard.html"
    }
})()

const URL = "http://localhost:3000/users"

// llamar a los campos de formularios

const form = document.querySelector("form")
const email = document.getElementById("email")
const password = document.getElementById("password")

form.addEventListener("submit", async (event) => {
    event.preventDefault()// evitar que la pagina se recargue
    const user = await checkEmail(email)
    if (user === false) {
        alert("Usuario inexistente")
    } else {
        //Validar si todos los datos estan correctos y existen en la base para poder iniciar sesion
        if (user.password === password.value) {
            alert("Bienvenido")
            localStorage.setItem("userSesion", JSON.stringify(user))
            window.location.href = "../views/dashboard.html"
        } else {
            alert("Contraseña Incorrecta")
        }
    }
})

async function checkEmail(email) {
    //traemos a todos los usuarios que tengan el email que se ingresó
    const response = await fetch(`${URL}?email=${email.value}`)
    const data = await response.json()
    console.log(data);

    // se verifica que el email no esté registrado
    if (data.length === 1) {
        return data[0]
    } else {
        return false
    }
}