const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
//Starting UI object
const ui = new UI();

//Create Storage Object
const storage = new Storage();

//Loading all events
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        //Error
        ui.displayMessage("Fill all box..","danger");
    }else{
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm);//Adding film to UI
        storage.addFilmToStorage(newFilm);//Adding new film to storage
        ui.displayMessage("Film added successfully..","success");
    }

    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.textContent);
    
        ui.displayMessage("Film deleted successfully..","success");
    }
}

function clearAllFilms(){

    if(confirm("Are You Sure?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
    
}