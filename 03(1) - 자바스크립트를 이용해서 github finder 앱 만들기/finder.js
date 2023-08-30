const github = new GitHub();

const ui = new UI();

const searchUser = document.getElementById("searchUser");

searchUser.addEventListener("keyup", e => {
    const username = e.target.value;

    if (username !== "") {
        github.getUser(username).then(data => {
            if (data.profile.message === "Not Found") {
                ui.showAlert("User not found", "alert alert-danger");
            } else {
                console.log(data);
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        });
    } else {
        ui.clearProfile();
    }
})