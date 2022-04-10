import { techCompanies } from "./techCompanies.js";

//! content to show when page loads
window.addEventListener("DOMContentLoaded", function () {
  displaySections(techCompanies);
});

//* main wrapper that will hold all the sections
const mainWrapper = document.querySelector(".main-wrapper");

function displaySections(techCompanies) {
  //* sections to display
  for (var techCompanySection of techCompanies) {
    var companySection = document.createElement("section");
    companySection.className = "company-sections";
    companySection.id = techCompanySection.name;

    companySection.innerHTML = `
	<h2 class="section-id">${techCompanySection.name}</h2>
		<ul class="companies-list">
			 ${techCompanySection.company
         .map(
           (companyCard) =>
             `<li class="company-card">
                <h3 class="company-card_name">${companyCard.companyName}</h3>

                <a
                  class="company-card_website"
                  href="${companyCard.website}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="./assets/external-link.png"
                    alt="external link icon"
                /></a>

                <p class="company-card_industry">Industry: ${
                  companyCard.industry
                }</p>

                <p class="company-card_founders">
                 Founders:
                  ${companyCard.foundersTwitterHandle
                    .map(
                      (founder) =>
                        `<a
                    href="http://twitter.com/${founder}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >@${founder}</a
                  >`
                    )
                    .join(", ")}
                </p>

                <p class="company-card_twitter-handle">
                  Twitter Handle:
                  <a
                    href="http://twitter.com/${
                      companyCard.companyTwitterHandle
                    }"
                    target="_blank"
                    rel="noopener noreferrer"
                    >@${companyCard.companyTwitterHandle}</a
                  >
                </p>
              </li>`
         )
         .join("")}
       </ul>`;
    mainWrapper.appendChild(companySection);
  }
}

//* function to automatically update copyright date
let date = new Date().getFullYear();

document.querySelector(".copyright-date").textContent = "copyright " + date;
