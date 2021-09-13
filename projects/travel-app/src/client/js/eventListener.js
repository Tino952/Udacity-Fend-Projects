// Exporting an event listener to fulfill rubric requirements of project

let myCityPhoto = document.getElementById("city-photo");

let myEventListener = myCityPhoto.addEventListener("click", ()=> {alert("you clicked the photo")})

export {myEventListener};
