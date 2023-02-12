let users = JSON.parse(localStorage.getItem("users"));

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
    // Prevent default form submission
    event.preventDefault();
    loginUser();
    cleanFields();
})


//loginUser logins the user. If the credentials input are correct the user is forwarded to the game window
function loginUser() {

    let userEmail = document.getElementById("login-email").value;
    let userPassword = document.getElementById("login-password").value;

    console.log(users);
    if (userExists(userEmail, userPassword, users)) {
        window.open("../views/game.html", "_self");
    }
}

function userExists(email, password, users) {

    let exists = false;
    users.forEach(user => {
        if (user.email === email && user.password === password) {
            user.currentPlayer = true;
            exists = true;
        } else {
            user.currentPlayer = false;
        }
    })
    localStorage.setItem("users", JSON.stringify(users));
    if (!exists) {
        alert("User with this email doesn't exist or wrong email/password");
    }
    return exists;
}

//cleanFields cleans login input fields
function cleanFields() {
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
}



