document.addEventListener("DOMContentLoaded", () => {
    // 1. Load Projects from JSON file
    loadProjects();

    // 2. Load GitHub Repositories (Replace 'octocat' with your exact GitHub username)
    loadGitHubRepos("octocat");

    // 3. Contact Form Validation & Submission Handling
    setupContactForm();

    // 4. Back to Top Button Feature
    setupBackToTop();
});

// Load Projects from JSON
async function loadProjects() {
    const container = document.getElementById("projects-container");
    try {
        const response = await fetch("data/projects.json");
        if (!response.ok) throw new Error("Failed to load projects data.");
        
        const projects = await response.json();
        container.innerHTML = "";

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.innerHTML = `
                <div>
                    <h4>${project.title}</h4>
                    <span class="project-tech">${project.technologies}</span>
                    <p>${project.description}</p>
                    <p><strong>Role:</strong> ${project.role}</p>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        container.innerHTML = `<p class="feedback-msg" style="color: #e63946;">Error: Could not load projects at this time.</p>`;
    }
}

// Contact Form Validation
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Reject empty fields
        if (!name || !email || !message) {
            feedback.style.color = "#e63946";
            feedback.textContent = "Please fill in all fields.";
            return;
        }

        // Reject invalid email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            feedback.style.color = "#e63946";
            feedback.textContent = "Please enter a valid email address.";
            return;
        }

        // Show thank-you message
        feedback.style.color = "#52b788";
        feedback.textContent = "Thank you! Your message has been sent successfully.";
        
        // Clear the form
        form.reset();

        // Clear feedback message after 5 seconds
        setTimeout(() => {
            feedback.textContent = "";
        }, 5000);
    });
}

// Back to Top Button Feature
function setupBackToTop() {
    const btn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
