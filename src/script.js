// fetch("../techCompanies.json")
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error.message));

//* function to automatically update copyright date
let date = new Date().getFullYear();

document.querySelector(".copyright-date").textContent = "copyright " + date;
