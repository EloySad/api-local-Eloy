// Guardian basico para evitar ingresar al register en caso tal de estar logeado
(function () {
    const userSesion = localStorage.getItem("userSesion")

    if (userSesion != null) {
        window.location.href = "../views/dashboard.html"
    }
})()
const URL= "http://localhost:3000/users"
// llamar al formulario

const form = document.getElementById("register-form")

// llamar a los campos de formularios

const userName = document.getElementById("user-name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirm-password")

form.addEventListener("submit", async (event) => {
    event.preventDefault()// evitar que la pagina se recargue
    const reviewEmail = await checkEmail(email)
    const reviewPassword = checkPassword(password, confirmPassword)
    
    if (reviewEmail === true && reviewPassword === true) {
        await registerUser(userName, email, password)
        window.location.href = "../auth/login.html"
    }
})

async function checkEmail(email) {
    //traemos a todos los usuarios que tengan el email que se ingresó
    const response = await fetch(`${URL}?email=${email.value}`)
    const data = await response.json()
    console.log(data);

    // se verifica que el email no esté registrado
    if (data.length > 0) {
        return false
    } else {
        return true
    }
}
// Funcion para validar si las contraseñas coinciden o no
function checkPassword(password,confirmPassword) {
    if (password.value === confirmPassword.value) {
        return true
    } else {
        alert("las contraseñas no coinciden")
        return false
    }
}

// Funcion para registrar usuarios
async function registerUser(userName, email, password) {
    
    const newUser = {
        userName: userName.value,
        email: email.value,
        password: password.value
    }

    await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
}