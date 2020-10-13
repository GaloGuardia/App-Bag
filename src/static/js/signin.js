if (document.readyState !== 'loading') {
    document.getElementById("formSignin").addEventListener('submit', successSignIn);
} else {
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById("formSignin").addEventListener('submit', successSignIn);
    });
}

<<<<<<< HEAD
function successSignIn(evento) {
    evento.preventDefault();

    let fullname = document.getElementById('fullname').value,
        user = document.getElementById('username').value,
        pass = document.getElementById("pass").value,
        confirmPass = document.getElementById("confirmpass").value;

=======
let fullname = document.getElementById('fullname').value,
    user = document.getElementById('username').value,
    pass = document.getElementById("pass").value,
    confirmPass = document.getElementById("confirmpass").value;

function successSignIn(evento) {
    evento.preventDefault();
>>>>>>> b9b34d77112c5fe71a53b70cf7f7e3b992040576
    if (pass != confirmPass)
        return;
    else
        this.submit();
}