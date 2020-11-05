// Variables // 
const dogURL = 'http://localhost:3000/dogs'



// Methods // 

const renderDogs=(dog) => {
        let tableBody = document.querySelector("#table-body")
            tableBody.innerHTML += `<tr data-id=${dog.id}><td>${dog.name}</td> 
                                     <td>${dog.breed}</td> <td>${dog.sex}</td>
                                    <td><button data-id=${dog.id} class="edit-Button">Edit Dogs</button>
                                    </td></tr>`
}

function editDog(target){
   let thisDogId = target.dataset.id
   const dogForm = document.querySelector('#dog-form')
     fetch(dogURL + "/" + `${thisDogId}`)
     .then(resp => resp.json())
     .then(dogInfo => {
        dogForm.dataset.id = dogInfo.id
        dogForm.name.value = dogInfo.name
        dogForm.breed.value = dogInfo.breed
        dogForm.sex.value = dogInfo.sex
     })

     dogForm.addEventListener('submit', function(event){

        event.preventDefault();
        
        const dogRevised = {
            id: event.target["id"].value,
            name: event.target["name"].value,
            breed: event.target["breed"].value, 
            sex: event.target["sex"].value
        }
        event.target.reset() 
        const configDog = {
            method : "PATCH", 
            headers : {
                "Content-Type" : "application/json", 
                "Accept" : "application/json"
            }, 
            body : JSON.stringify(dogRevised)
            }

          fetch(dogURL + "/" + `${thisDogId}`, configDog) 
          .then(resp => resp.json())
          .then(dogsData => fetchBoy())
        })

        

}


// Fetches // 
const fetchBoy = ()=>{
    fetch(dogURL)
    .then(resp => resp.json())
    .then(dogs => {
        let tableBody = document.querySelector("#table-body")
        tableBody.innerHTML = ``
        dogs.forEach(function(dog){
            // console.log(dog)
            renderDogs(dog)
        })
    })
}


// Event Listener // 

fetchBoy()

document.addEventListener('click', function(event){
    
    if(event.target.className === "edit-Button"){
        editDog(event.target)
    }
})




