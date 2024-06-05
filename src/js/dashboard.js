(function () {
    const userSesion = localStorage.getItem("userSesion")

    if (userSesion == null) {
        alert("If you want to manage the Dashboard you must log in first.")
        window.location.href = "../auth/login.html"
    }
})()

const tbody = document.querySelector('tbody')
const form = document.querySelector("form")
const roomNumber = document.querySelector("#room-number")
const image = document.querySelector("#url-image")
const typeRoom = document.querySelector("#type-room")
const pricing = document.querySelector("#pricing")
const beds = document.querySelector("#beds")
const bathrooms = document.querySelector("#bathrooms")
const services = document.querySelector("#services")
const url = "http://localhost:3000/rooms"
let idCache


index()

form.addEventListener('submit', async (event) => {
    //ACA DEBEMOS LLAMAR A LA FUNCION QUE SE ENCARGA DE GUARDAR
    event.preventDefault()
    if (idCache === undefined) {
        await create(roomNumber, image, typeRoom, pricing, beds, bathrooms, services)
        index()
        form.reset()
    }
    else {
        await update(idCache, roomNumber, image, typeRoom, pricing, beds, bathrooms, services)
        idCache = undefined
        index()
        form.reset()
    }

})

tbody.addEventListener('click', async function (event) {
    // ACA DEBEMOS LOCALIZAR A LOS ESCUCHADORES DE EVENTOS
    if (event.target.classList.contains("btn-danger")) {
        const id = event.target.getAttribute('data-id')
        await deleteItem(id)
        index()

    }
    if (event.target.classList.contains("btn-warning")) {
        idCache = event.target.getAttribute('data-id')
        const categoryFound = await find(idCache)
        roomNumber.value = categoryFound.roomNumber
        image.value = categoryFound.image
        typeRoom.value = categoryFound.typeRoom
        pricing.value = categoryFound.pricing
        beds.value = categoryFound.beds
        bathrooms.value = categoryFound.bathrooms
        services.value = categoryFound.services
    }
})

//Funcion index que imprime los datos sacados del API local en nuestra tabla del dashboard
async function index() {
    const response = await fetch(url)
    const data = await response.json()

    tbody.innerHTML = ""
    data.forEach(element => {
        tbody.innerHTML += `
            <td>${element.roomNumber}</td>
            <td>
                <img width="100px" src=${element.image} alt=${element.roomNumber}>
            </td>
            <td>${element.typeRoom}</td>
            
            <td>$${element.pricing}USD</td>
            <td>${element.beds}</td>
            <td>${element.bathrooms}</td>
            <td>${element.services}</td>
            <td>
                <button type="button" data-id=${element.id} class="btn btn-warning">Edit</button>
                <button type="button" data-id=${element.id} class="btn btn-danger">Delete</button>
            </td>
        `
    })
}

async function find(id) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA BUSCAR UNA CATEGORIA
    const response = await fetch(`${url}/${id}`)
    const data = await response.json()
    return data
}

async function create(roomNumber, image, typeRoom, pricing, beds, bathrooms, services) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA CREAR UNA CATEGORIA

    const newCategory = {
        roomNumber: roomNumber.value,
        image: image.value,
        typeRoom: typeRoom.value,
        pricing: pricing.value,
        beds: beds.value,
        bathrooms: bathrooms.value,
        services: services.value
    }

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategory)
    })
}

async function update(idCache, roomNumber, image, typeRoom, pricing, beds, bathrooms, services) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA ACTUALIZAR UNA CATEGORIA

    const UpdateCategory = {
        roomNumber: roomNumber.value,
        image: image.value,
        typeRoom: typeRoom.value,
        pricing: pricing.value,
        beds: beds.value,
        bathrooms: bathrooms.value,
        services: services.value
    }

    await fetch(`${url}/${idCache}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(UpdateCategory)
    })
}

async function deleteItem(id) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA ELIMINAR UNA CATEGORIA

    await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const btnLogout = document.getElementById("btn-logout")

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userSesion")
    window.location.href = "/"
})
