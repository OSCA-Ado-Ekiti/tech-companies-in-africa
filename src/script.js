
import techCompanies from "./techCompanies/index.js";

// Constants
const searchBar = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mainSection = document.querySelector(".main-wrapper");
const updateDate = document.querySelector(".copyright-date");
const alphabetLinks = document.querySelectorAll('#nav-links a');

// Search function that will be triggered on button click
const searchCompanies = () => {
  const searchTerm = searchBar.value.toLowerCase();
  let results = [];

  // Loop through each letter's companies
  techCompanies.forEach(({ startsWith, companies }) => {
    // Filter companies based on the search term
    const filteredCompanies = companies.filter(company =>
      company.companyName.toLowerCase().includes(searchTerm)
    );

    // If any matching companies are found, add them to the results
    if (filteredCompanies.length > 0) {
      results.push({ startsWith, companies: filteredCompanies });
    }
  });

  // Update the UI to display search results
  displayCompanies(results);
};

// Attach the search function to the button click event
searchBtn.addEventListener("click", searchCompanies);
searchBar.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchCompanies();
  }
});

// Function to display the companies in the main section
const displayCompanies = (companyGroups) => {
  // Clear previous results
  mainSection.innerHTML = '';

  // Loop through each alphabet group and display the filtered companies
  const htmlOutput = companyGroups
    .map((group) => {
      return `
        <h2 class="section-id">${group.startsWith.toUpperCase()}</h2>
        <ul class="companies-list">
          ${group.companies
            .map((company) => {
              return `
                <li class="company-card">
                  <h3 class="company-card_name">${company.companyName}</h3>
                  <a
                    class="company-card_website"
                    href="${company.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="./assets/external-link.png" alt="external link icon"/>
                  </a>
                  <p class="company-card_industry">Industry: ${company.industry}</p>
                  <p class="company-card_founders">
                    Founders:
                    ${company.foundersTwitterHandle
                      .map(
                        (founder) =>
                          `<a href="http://twitter.com/${founder}" target="_blank" rel="noopener noreferrer">@${founder}</a>`
                      )
                      .join(", ")}
                  </p>
                  <p class="company-card_twitter-handle">
                    Twitter Handle:
                    <a href="http://twitter.com/${company.companyTwitterHandle}" target="_blank" rel="noopener noreferrer">
                      @${company.companyTwitterHandle}
                    </a>
                  </p>
                </li>
              `;
            })
            .join('')}
        </ul>
      `;
    })
    .join('');

  // Insert the new HTML into the DOM
  mainSection.innerHTML = htmlOutput;

  // Handle the case where no results are found
  if (companyGroups.length === 0) {
    mainSection.innerHTML = "<p>No companies found matching your search.</p>";
  }
};

// Implementing the alphabet links functionality
alphabetLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    const letter = link.textContent.toLowerCase();

    // Find the company group starting with the clicked letter
    const filteredCompanies = techCompanies.find(group => group.startsWith.toLowerCase() === letter);
    
    // Display filtered results if found
    if (filteredCompanies) {
      displayCompanies([filteredCompanies]); // Display filtered results
    } else {
      mainSection.innerHTML = "<p>No companies found starting with this letter.</p>";
    }
  });
});

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
