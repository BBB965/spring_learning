const github = new GitHub();

const ui = new UI();

const searchUser = document.getElementById("searchUser");

searchUser.addEventListener("keyup", e => {
    const username = e.target.value;

    if (username !== "") {
        ui.clearProfile();
        ui.clearGrass();
        document.getElementById("spinner").classList.remove("d-none");
        github.getUser(username).then(data => {
            document.getElementById("spinner").classList.add("d-none");
            if (data.profile.message === "Not Found") {
                ui.showAlert("User not found", "alert alert-danger");
            } else {
                ui.showProfile(data.profile);
                ui.showGrass(username);
                ui.showRepos(data.repos);
            }
        });
    } else {
        ui.clearProfile();
        ui.clearGrass();
        document.getElementById("spinner").classList.add("d-none");
    }
})