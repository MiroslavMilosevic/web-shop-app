// const { default: axios } = require("axios");

let login_button = document.getElementById('login-button')
login_button.addEventListener('click', () => {
    let input_mail = document.getElementById('mail');
    let input_password = document.getElementById('password');
    let mail = input_mail.value
    let password = input_password.value
    let login_message_h2 = document.getElementById('login-message-h2');


    let isLoginValid = false;
    isLoginValid = validateEmail(mail) && validatePassword(password);
    if (isLoginValid) {
        axios.post('/login', { mail: mail, password: password }).then(res => {

            if (res.data.isOk) {
                window.location.href = "/home";
            } else {
                login_message_h2.innerText = res.data.loginMessage
                removeLoginMessage()
            }

        });

    }// if login is valid 
    else {

        login_message_h2.innerText = 'email or password format are incorect';
        removeLoginMessage()

    }
});






function removeLoginMessage() {
    let login_message_h2 = document.getElementById('login-message-h2');
    setTimeout(() => {
        login_message_h2.innerText = ''
    }, 2500);
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
    return password.length >= 5 && password.length <= 25;
}