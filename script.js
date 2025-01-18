let clients = [];
let reservations = [];

document.getElementById("clientForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById("fullName").value;
    const cin = document.getElementById("cin").value;
    const studentStatus = document.getElementById("studentStatus").value;

    // Vérification de l'unicité du CIN
    if (clients.some(client => client.cin === cin)) {
        alert("Le CIN existe déjà.");
        return;
    }

    const newClient = { fullName, cin, studentStatus };
    clients.push(newClient);

    updateClientList();
    updateClientSelect();
    document.getElementById("clientForm").reset();
});

function updateClientList() {
    const clientList = document.getElementById("clientList");
    clientList.innerHTML = "";

    clients.forEach(client => {
        const li = document.createElement("li");
        li.textContent = `${client.fullName} (CIN: ${client.cin}, Statut: ${client.studentStatus})`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.onclick = function() {
            clients = clients.filter(c => c.cin !== client.cin);
            updateClientList();
            updateClientSelect();
        };

        li.appendChild(deleteButton);
        clientList.appendChild(li);
    });
}

function updateClientSelect() {
    const clientSelect = document.getElementById("clientSelect");
    clientSelect.innerHTML = "";

    clients.forEach(client => {
        const option = document.createElement("option");
        option.value = client.cin;
        option.textContent = client.fullName;
        clientSelect.appendChild(option);
    });
}

document.getElementById("reservationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const clientCin = document.getElementById("clientSelect").value;
    const client = clients.find(c => c.cin === clientCin);
    const destination = document.getElementById("destination").value;
    const classSelect = document.getElementById("classSelect").value;
    let price = 0;

    if (classSelect === "economique") {
        price = 100;
    } else if (classSelect === "affaire") {
        price = 200;
    } else {
        price = 300;
    }

    if (client.studentStatus === "etudiant") {
        price *= 0.8; // Réduction pour les étudiants
    }

    const reservation = {
        client: client.fullName,
        destination,
        classSelect,
        price
    };

    reservations.push(reservation);
    displayReservations();
    document.getElementById("totalPrice").textContent = price;
});

function displayReservations() {
    const tableBody = document.getElementById("reservationTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    reservations.forEach(reservation => {
        const row = document.createElement("tr");

        const clientCell = document.createElement("td");
        clientCell.textContent = reservation.client;
        row.appendChild(clientCell);

        const destinationCell = document.createElement("td");
        destinationCell.textContent = reservation.destination;
        row.appendChild(destinationCell);

        const classCell = document.createElement("td");
        classCell.textContent = reservation.classSelect;
        row.appendChild(classCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = reservation.price + " €";
        row.appendChild(priceCell);

        tableBody.appendChild(row);
    });
}

function switchTheme(theme) {
    document.body.className = theme;
}
