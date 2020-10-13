if (document.readyState !== 'loading') {
    document.getElementById("formSignin").addEventListener('submit', successSignIn);
} else {
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById("formSignin").addEventListener('submit', successSignIn);
    });
}

function successSignIn(evento) {
    evento.preventDefault();

    let fullname = document.getElementById('fullname').value,
        user = document.getElementById('username').value,
        pass = document.getElementById("pass").value,
        confirmPass = document.getElementById("confirmpass").value;

    if (pass != confirmPass)
        return;
    else
        this.submit();
}