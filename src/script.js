import { techCompanies } from "./techCompanies.js";

//constants
const mainSection = document.querySelector(".main-wrapper");
const searchBar = document.querySelector(".input-search");
const updateDate = document.querySelector(".copyright-date");

// Searchbar
let companyResult = techCompanies;

searchBar.addEventListener("keyup", (e) => {
  const searchResult = e.target.value.toLowerCase();

  let results = [];

  companyResult.forEach(({ name, company }) => {
    const result = company.filter((item) =>
      item.companyName.toLowerCase().includes(searchResult)
    );

    results = [...results, { name: name, company: result }];
  });

  showCompanies(results);
});

const showCompanies = (content) => {
  const techCompaniesHTML = content
    .map((details) => {
      console.log(details);
      return `
    <h2 class="section-id">${details.name}</h2>

    <ul class="companies-list">
    ${details.company
      .map((item) => {
        return `
        <section id=${details.name}>
              <li class="company-card">
                <h3 class="company-card_name">${item.companyName}</h3>

                <a
                  class="company-card_website"
                  href="${item.website}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="./assets/external-link.png"
                    alt="external link icon"
                /></a>

                <p class="company-card_industry">Industry: ${item.industry}</p>

                <p class="company-card_founders">
                 Founders:
                  ${item.foundersTwitterHandle
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
                    href="http://twitter.com/${item.companyTwitterHandle}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >@${item.companyTwitterHandle}</a
                  >
                </p>
              </li>
    </section>

      `;
      })
      .join("")}
      
    </ul>

    `;
    })
    .join("");
  mainSection.innerHTML = techCompaniesHTML;
};
showCompanies(techCompanies);

// Update copyright date
const date = new Date().getFullYear();
updateDate.textContent = "copyright " + date;
