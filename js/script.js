```javascript
// Replace with your actual GitHub username.
const GITHUB_USERNAME = "yourusername";

const projectList = document.getElementById("project-list");
const filter = document.getElementById("technology-filter");

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// PART C: Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Projects could not be loaded");
        }

        const projects = await response.json();

        const technologies = [
            ...new Set(projects.flatMap(p => p.technologies))
        ];

        filter.innerHTML =
            '<option value="all">All Technologies</option>' +
            technologies.map(t =>
                `<option value="${escapeHTML(t)}">${escapeHTML(t)}</option>`
            ).join("");

        function displayProjects() {
            const selected = filter.value;

            const filtered = projects.filter(project =>
                selected === "all" ||
                project.technologies.includes(selected)
            );

            if (filtered.length === 0) {
                projectList.innerHTML = "<p>No projects found.</p>";
                return;
            }

            projectList.innerHTML = filtered.map(project => `
                <article class="card">
                    <h3>${escapeHTML(project.title)}</h3>
                    <p>${escapeHTML(project.description)}</p>
                    <p><strong>Technologies:</strong></p>
                    <div>
                        ${project.technologies.map(t =>
                            `<span class="tag">${escapeHTML(t)}</span>`
                        ).join("")}
                    </div>
                    <p><strong>My role:</strong> ${escapeHTML(project.role)}</p>
                    <p><strong>Screenshot:</strong>
                    ${escapeHTML(project.screenshot)}</p>
                    <a class="button" href="${escapeHTML(project.link)}"
                       target="_blank" rel="noopener">View Project</a>
                </article>
            `).join("");
        }

        filter.addEventListener("change", displayProjects);
        displayProjects();

    } catch (error) {
        projectList.innerHTML =
            "<p>Projects could not be loaded. Check data/projects.json.</p>";
    }
}

// PART C: Latest five public GitHub repositories
async function loadRepositories() {
    const repoList = document.getElementById("repo-list");

    if (GITHUB_USERNAME === "yourusername") {
        repoList.innerHTML =
            "<p>Set your GitHub username in js/script.js to show your repositories.</p>";
        return;
    }

    try {
        const url =
            `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&per_page=5&type=owner`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("GitHub unavailable");
        }

        const repositories = await response.json();

        if (repositories.length === 0) {
            repoList.innerHTML = "<p>No public repositories found.</p>";
            return;
        }

        repoList.innerHTML = repositories.map(repo => `
            <article class="card">
                <h3>${escapeHTML(repo.name)}</h3>
                <p>${escapeHTML(repo.description || "No description available.")}</p>
                <p><strong>Main language:</strong>
                ${escapeHTML(repo.language || "Not specified")}</p>
                <a class="button" href="${escapeHTML(repo.html_url)}"
                   target="_blank" rel="noopener">View on GitHub</a>
            </article>
        `).join("");

    } catch (error) {
        repoList.innerHTML =
            "<p>GitHub data is unavailable. Please check your username or try again later.</p>";
    }
}

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// Contact form validation and thank-you message
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    document.getElementById("form-status").textContent =
        "Thank you! Your form was submitted successfully.";

    contactForm.reset();
});

// Back to top button
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 300);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Start loading data
loadProjects();
loadRepositories();
```
