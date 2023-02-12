//const fs = require("fs");
let users = JSON.parse(localStorage.getItem("users"));//.filter(user => user.currentPlayer);
users = users.sort((a, b) => {
    if (a.score === '-') {
        return 1;
    }
    if (b.score === '-') {
        return -1;
    }
    return a.score - b.score;
});


users.forEach(player => {
    console.log(users.length)
    console.log(users)
    let tableBody = document.getElementsByTagName("tbody")[0];

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>
            ${player.name}
        </td>
        <td>
            ${player.score}
        </td>
        `;

    if (player.currentPlayer) {
        const nameTd = tr.children[0];
        const scoreTd = tr.children[1];

        nameTd.style.fontWeight = "bold";
        scoreTd.style.fontWeight = "bold";
    }

    tableBody.appendChild(tr);
});