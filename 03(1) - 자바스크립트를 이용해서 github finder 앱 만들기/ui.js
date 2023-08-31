class UI {
    constructor() {
      this.profile = document.getElementById("profile");
      this.grass = document.getElementById("grass");
    }
  
    // Display profile in UI
    showProfile(user) {
      this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${
              user.html_url
            }" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge text-bg-primary">Public Repos: ${
              user.public_repos
            }</span>
            <span class="badge text-bg-secondary">Public Gists: ${
              user.public_gists
            }</span>
            <span class="badge text-bg-success">Followers: ${user.followers}</span>
            <span class="badge text-bg-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      `;
    }
    showGrass(username) {
      this.grass.innerHTML = `
        <div class="card card-body mb-3">
           <img src="https://ghchart.rshah.org/${username}" />
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div id="repos"></div>
      `;

    }
    // Show user repos
    showRepos(repos) {
      let output = "";
  
      repos.forEach(function(repo) {
        output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
              <span class="badge text-bg-primary">Stars: ${
                repo.stargazers_count
              }</span>
            <span class="badge text-bg-secondary">Watchers: ${
              repo.watchers_count
            }</span>
            <span class="badge text-bg-success">Forks: ${repo.forks_count}</span>
            </div>
          </div>
        </div>
        `;
      });
  
      // Output repos
      document.getElementById("repos").innerHTML = output;
    }
  
    // Show alert message
    showAlert(message, className) {
      // Clear any remaining alerts
      this.clearAlert();
      // Create div
      const div = document.createElement("div");
      // Add classes
      div.className = className;
      
      // Add alert text
      div.appendChild(document.createTextNode(message));
      // Get parent element
      const container = document.querySelector(".searchContainer");
      // Get the seacrh box
      const search = document.querySelector(".search");
      // Insert alert
      container.insertBefore(div, search);
      
      // Timeout after three seconds
      setTimeout(() => {
        this.clearAlert();
      }, 3000);
    }
  
    // Clear alert message
    clearAlert() {
      const currentAlert = document.querySelector(".alert");
  
      if (currentAlert) {
        currentAlert.remove();
      }
    }
  
    // Clear profile
    clearProfile() {
      this.profile.innerHTML = "";
    }
    clearGrass() {
      this.grass.innerHTML = "";
    }
  }