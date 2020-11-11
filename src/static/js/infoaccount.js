const path = require("path");
const settings = require("electron-settings");
const DatabaseDAO = require(path.resolve("src/static/js/databaseDAO.js"));

if (document.readyState !== 'loading') {
    loadAccountData();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        loadAccountData();
    });
}

let newDatabaseDAO = new DatabaseDAO('users');

async function loadAccountData() {
    let actualUsername = settings.getSync('username-app-global');
    await newDatabaseDAO.find({ username: actualUsername }).then((docs) => {
        let accountData = docs[0];
        document.getElementById('fullname').value = accountData.fullname;
        document.getElementById('email').value = accountData.email;
        document.getElementById('username').value = accountData.username;
        document.getElementById('pass').value = accountData.pass;
    });
}

async function updateAccount() {
    let testFullName = new RegExp(document.getElementById('fullname').pattern).test(document.getElementById('fullname').value);
    let testEmail = new RegExp(document.getElementById('email').pattern).test(document.getElementById('email').value);
    let testUsername = new RegExp(document.getElementById('username').pattern).test(document.getElementById('username').value);
    let testPass = new RegExp(document.getElementById('pass').pattern).test(document.getElementById('pass').value);

    if (!testFullName || !testEmail || !testUsername || !testPass) {
        await showAlert("error", "Ingrese los datos en el formato correcto", 4000);
        return;
    }

    let newData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        pass: document.getElementById('pass').value
    };

    let actualUsername = settings.getSync('username-app-global');
    await newDatabaseDAO.find({ username: actualUsername }).then(async(docs) => {
        let accountData = docs[0];
        if (accountData.fullname == newData.fullname && accountData.email == newData.email && accountData.username == newData.username && accountData.pass == newData.pass) {
            await showAlert("error", "Ningun cambio para realizar", 4000);
            return;
        }
        await newDatabaseDAO.update(accountData, newData).then(async(replaced) => {
            showAlert("check", "Cuenta actualizada correctamente", 4000);
            await settings.set('username-app-global', newData.username);
        });
    });
}

async function deleteAccount() {
    let actualUsername = settings.getSync('username-app-global');
    await newDatabaseDAO.remove(actualUsername).then(async(removed) => {
        document.getElementById("updateAccount").disabled = true;
        document.getElementById("deleteAccount").disabled = true;
        document.getElementById("backButton").style.pointerEvents = "none";
        document.getElementById("backButton").style.cursor = "default";
        await showAlert("check", "Cuenta eliminada correctamente", 2000);
        location.replace("http://127.0.0.1:5000/login");
    });
}

let iconCheck = "fa-check";
let iconError = "fa-exclamation-triangle";

async function showAlert(type, text, time) {
    let toastIcon = document.getElementById("icon-alert");
    let toastTitle = document.getElementById("title-alert");

    switch (type) {
        case "error":
            if (toastIcon.classList.contains(iconCheck)) toastIcon.classList.remove("fas", iconCheck);
            if (toastTitle.classList.contains("text-success")) toastTitle.classList.remove("text-success");
            if (!toastTitle.classList.contains("text-danger")) toastTitle.classList.add("text-danger");
            if (!toastIcon.classList.contains(iconError)) toastIcon.classList.add("fas", iconError);
            toastTitle.textContent = "Error";
            break;
        case "check":
            if (toastIcon.classList.contains(iconError)) toastIcon.classList.remove("fas", iconError);
            if (toastTitle.classList.contains("text-danger")) toastTitle.classList.remove("text-danger");
            if (!toastTitle.classList.contains("text-success")) toastTitle.classList.add("text-success");
            if (!toastIcon.classList.contains(iconCheck)) toastIcon.classList.add("fas", iconCheck);
            toastTitle.textContent = "Correct";
            break;
    }

    $('.toast').toast('show');
    $('#toast-body').text(text);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve($('.toast').toast('hide'));
        }, time);
    });
}