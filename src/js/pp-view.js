const sectRooms = document.querySelector('#sect-rooms')
const roomNumber = document.querySelector("#room-number")
const image = document.querySelector("#url-image")
const typeRoom = document.querySelector("#type-room")
const pricing = document.querySelector("#pricing")
const beds = document.querySelector("#beds")
const bathrooms = document.querySelector("#bathrooms")
const services = document.querySelector("#services")
const url = "http://localhost:3000/rooms"

//Funcion index para mostrar nuestras habitaciones en la pagina principal
async function index() {
    const response = await fetch(url)
    const data = await response.json()

    sectRooms.innerHTML = ""
    data.forEach(element => {
        sectRooms.innerHTML += `
        <br>
        <div class="card text-light col-4 card-custom">
        <img src=${element.image} class="card-img h-100 object-fit-cover" alt=${element.roomNumber}>
        <div class="card-body bg-light text-dark">
            <h5 class="card-title"><b>Room #${element.roomNumber}</b></h5>
            <p>This ${element.typeRoom} type room is equipped with:<br> - ${element.beds} beds <br> - ${element.bathrooms} bathrooms <br> - ${element.services} <br>  <b>Price:</b>$${element.pricing}USD/Night</p>
        </div>
    </div>
        `
    })
}

index()