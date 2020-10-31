const path = require("path");
const DatabaseDAO = require(path.resolve("src/static/js/databaseDAO.js"));

if (document.readyState !== 'loading') {
    document.getElementById("formSignin").addEventListener('submit', successSignIn);
} else {
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById("formSignin").addEventListener('submit', successSignIn);
    });
}

let newDatabaseDAO = new DatabaseDAO('users');

async function successSignIn(evento) {
    evento.preventDefault();

    let fullname = document.getElementById("fullname").value,
        email = document.getElementById("email").value,
        username = document.getElementById("username").value,
        pass = document.getElementById("pass").value,
        confirmPass = document.getElementById("confirmpass").value;

    if (pass != confirmPass) {
        await showAlert("error", "Las contraseñas deben ser iguales", 4000);
        return;
    } else {
        await register(fullname, email, username, pass).then((success) => {
            if (success) this.submit();
            else return;
        }).catch((err) => {
            alert(err);
            return;
        });
    }
}

async function register(fullname, email, username, pass) {
    let data = {
        fullname: fullname,
        email: email,
        username: username,
        pass: pass
    };

    return await newDatabaseDAO.countElementsFrom({ username: username }).then(async(count) => {
        if (count != 0) {
            await showAlert("error", "Nombre de usuario no disponible", 4000);
            return false;
        }
        return await newDatabaseDAO.insert(data).then(async(newDocs) => {
            await showAlert("check", "Usuario creado correctamente", 2000);
            return true;
        }).catch((err) => {
            alert(err);
            return false;
        });
    }).catch((err) => {
        alert(err);
        return false;
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