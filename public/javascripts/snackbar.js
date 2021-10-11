function showError() {
    // Get the snackbar DIV
    var snckbar = document.getElementById("snackbar");
    if (snckbar != null) {
        // Add the "show" class to DIV
        snckbar.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () { snckbar.className = snckbar.className.replace("show", ""); }, 3000);
    }
}
showError();
