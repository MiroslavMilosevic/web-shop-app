// const { default: axios } = require("axios");

let register_button = document.getElementById('register-button')
register_button.addEventListener('click', () => {
    let input_mail = document.getElementById('mail');
    let input_username = document.getElementById('username');
    let input_password = document.getElementById('password');
    let mail = input_mail.value
    let username = input_username.value;
    let password = input_password.value

    let isRegisterValid = false;
    isRegisterValid = validateEmail(mail) &&  validateUsername(username) && validatePassword(password);

 console.log(isRegisterValid);
    if (isRegisterValid) {
        axios.post('/register', { mail, username, password }).then(res => {

            if (res.data.isOk) {
              window.location.href = "/home";
             // console.log(res);
            } else {
                console.log("username ili mail su vec zauzeti");
            }

        });

    }else{
        console.log("unos za registraciju nije validan");
    }

});


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateUsername(username) {
    return username.length >= 5 && username.length <= 15;
}
function validatePassword(password) {
    return password.length >= 5 && password.length <= 25;
}