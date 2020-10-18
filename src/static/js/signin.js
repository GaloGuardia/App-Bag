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

    if (pass != confirmPass)
        return;
    else {
        await register(fullname, email, username, pass).then((success) => {
            if (success) this.submit();
            else return;
        }).catch((err) => {
            alert(err);
        });
    }
}

async function register(fullname, email, username, pass) {
    let data = {
        fullname: fullname,
        email:email,
        username: username,
        pass: pass
    };

    return await newDatabaseDAO.countElementsFrom({ username: username }).then(async(count) => {
        if (count != 0) return false;
        return await newDatabaseDAO.insert(data).then((newDocs) => {
            alert("success");
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