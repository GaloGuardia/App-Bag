if (document.readyState !== 'loading') {
    document.getElementById("formSignin").addEventListener('submit', successSignIn);
} else {
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById("formSignin").addEventListener('submit', successSignIn);
    });
}

let fullname = document.getElementById('fullname').value,
    user = document.getElementById('username').value,
    pass = document.getElementById("pass").value,
    confirmPass = document.getElementById("confirmpass").value;

function successSignIn(evento) {
    evento.preventDefault();
    if (pass != confirmPass)
        return;
    else
        this.submit();
}