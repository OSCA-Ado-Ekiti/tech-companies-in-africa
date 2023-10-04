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

// Function to create contributor profiles

const createContributorProfiles = (contributors) => {
  const contributorContainer = document.querySelector(".contributor-container");

  contributors.forEach((contributor) => {
    const profile = document.createElement("div");
    profile.classList.add("contributor-profile");

    // Set the contributor's name as a data attribute
    profile.setAttribute("data-name", contributor.name);

    profile.innerHTML = `
      <a href="${contributor.githubLink}" target="_blank">
        <img class="github-image" src="${contributor.avatarLink}" alt="${contributor.name}">
      </a>
      <div class="tooltip">${contributor.name}</div> <!-- Tooltip element -->
    `;

    contributorContainer.appendChild(profile);
  });
};

// Function to fetch and process GitHub contributors
const fetchGitHubContributors = () => {
  const repoOwner = "logboi1"; // Replace with the repository owner's username
  const repoName = "tech-companies-in-africa"; // Replace with the repository name
  const accessToken = "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"; // Replace with the organization access token

  // Define the API endpoint for contributors
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  // Make a GET request to the GitHub API
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Failed to fetch contributors");
      }
    })
    .then((contributors) => {
      // Process the list of contributors
      console.log("Contributors:", contributors);

      // Extract GitHub profile links and avatar links
      const contributorData = contributors.map((contributor) => ({
        githubLink: contributor.html_url,
        avatarLink: contributor.avatar_url,
        name: contributor.login, // You may want to include the contributor's name
      }));

      // Call the function to create contributor profiles
      createContributorProfiles(contributorData);

      // You can now use the 'contributorData' array in your code as needed
      // For example, you can display the contributor profiles on your web page
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Call the function to fetch GitHub contributors
fetchGitHubContributors();

// Update copyright date
const date = new Date().getFullYear();
updateDate.textContent = "copyright " + date;
