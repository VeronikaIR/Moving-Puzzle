// Store an array of user objects in local storage
localStorage.setItem("users", JSON.stringify([
    {
        name: "Olivia",
        email: "olivia@aaa.com",
        password: "olivia@aaa.com",
        score: "20",
        currentPlayer: false
    },
    {
        name: "Emma",
        email: "emma@aaa.com",
        password: "emma@aaa.com",
        score: "-",
        currentPlayer: false
    },
    {
        name: "Nicky",
        email: "nicky@aaa.com",
        password: "nicky@aaa.com",
        score: "18",
        currentPlayer: false
    },
    {
        name: "Noah",
        email: "noah@aaa.com",
        password: "noah@aaa.com",
        score: "26",
        currentPlayer: false
    },
    {
        name: "Mia",
        email: "mia@aaa.com",
        password: "mia@aaa.com",
        score: "22",
        currentPlayer: false
    },
    {
        name: "James",
        email: "james@aaa.com",
        password: "james@aaa.com",
        score: "14",
        currentPlayer: false
    },
    {
        name: "Isabella",
        email: "isabella@aaa.com",
        password: "isabella@aaa.com",
        score: "7",
        currentPlayer: false
    },
    {
        name: "Mary",
        email: "mary@aaa.com",
        password: "mary@aaa.com",
        score: "120",
        currentPlayer: false
    },
    {
        name: "Lily",
        email: "lilly@aaa.com",
        password: "lilly@aaa.com",
        score: "35",
        currentPlayer: false
    },
    {
        name: "Jack",
        email: "jack@aaa.com",
        password: "jack@aaa.com",
        score: "10",
        currentPlayer: false
    },
    {
        name: "Liam",
        email: "liam@aaa.com",
        password: "liam@aaa.com",
        score: "12",
        currentPlayer: false
    },
    {
        name: "Didi",
        email: "didi@aaa.com",
        password: "didi@aaa.com",
        score: "33",
        currentPlayer: false
    },
    {
        name: "Sisi",
        email: "sisi@aaa.com",
        password: "sisi@aaa.com",
        score: "10",
        currentPlayer: false
    },
    {
        name: "Ava",
        email: "ava@aaa.com",
        password: "ava@aaa.com",
        score: "-",
        currentPlayer: false
    },
    {
        name: "Sofia",
        email: "sofia@aaa.com",
        password: "sofia@aaa.com",
        score: "-",
        currentPlayer: false
    }


]));

// Get the users array from local storage
let usersArr = JSON.parse(localStorage.getItem("users"));


//registrationForm.addEventListener("submit", event => { ... });
// adds an event listener to the registrationForm element for the submit event.
// This means that when the submit event is triggered on the registrationForm element
// (for example, when the form is submitted by clicking the submit button or by pressing the enter key),
// the function inside the event listener will be executed.

// Submit the registration form
const registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", event => {

    event.preventDefault();
    registerUser();
    cleanFields();
});


// Register a new user with the provided email, password, and password confirmation
function registerUser() {

    // Get the user input
    let name = document.getElementById("reg-names").value;
    let email = document.getElementById("reg-email").value;
    let password = document.getElementById("reg-password").value;

// Create a new user object
    let newUser = {
        name: name,
        email: email,
        password: password,
        score: "-",
        currentPlayer: true
    };

// Check if the user already exists
    if (userExists(email, usersArr)) {

        console.log("User with this email already exists!"); // Debugging line
        alert("User with this email already exists!");
    } else if (!(document.getElementById("reg-password").value === document.getElementById("confirm-password").value)) {
        alert("Password and confirm password does not match!");
    } else {
        // Add the new user to the users array and update local storage
        usersArr.forEach(user => user.currentPlayer = false);
        usersArr.push(newUser);
        localStorage.setItem("users", JSON.stringify(usersArr));

        // Notify the user of the successful registration and redirect to the game page
        console.log("You have successfully registered!"); // Debugging line
        alert("You have successfully registered!");
        window.open("../views/game.html", "_self");
    }
}

// Check if a user with the provided email already exists
function userExists(email, usersArr) {
    let found = false;
    usersArr.forEach(user => {
        if (user.email === email) {
            found = true;
            return true;
        }
    });
    return found;
}

// Clear the input fields
function cleanFields() {
    document.getElementById("reg-names").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-password").value = "";
    document.getElementById("confirm-password").value = "";
}




