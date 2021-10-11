exports.welcomeMail = (data) => {
    return ``;
}

exports.resetPasswordMail = (data) => {
    return `
    <center>
    <div>
    <h1>Crick Stocker</h1>
    <p>You have requested to reset your password</p>
    <hr>
    <a href=${data.resetPasswordLink}>Click here to reset your password</a>
    <hr>
    </div>
    </center>
    `;
}

