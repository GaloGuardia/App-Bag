if (document.readyState !== 'loading') {
    loadHome();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        loadHome();
    });
}

function loadHome() {
    let toastDiv = document.getElementById('error-toast');
    if (toastDiv) {
        $('.toast').toast('show');
        setTimeout(() => {
            $('.toast').toast('hide');
        }, 4000);
    }
}