let username = prompt("Enter username");

if (username === "admin") {
    let password = prompt("Enter password");

    if (password) {
        window.location.href = "home.html";
    }
} else {
    alert("Invalid username");
}

