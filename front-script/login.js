// const { default: axios } = require("axios");

let login_button = document.getElementById('login-button')
login_button.addEventListener('click',()=>{
    let input_mail = document.getElementById('mail');
    let input_password = document.getElementById('password');
    let mail = input_mail.value
    let password = input_password.value

  
   axios.post('/login', {name:"test"}).then(res=>{
    
        if(res.data.ok){
            window.location.href = "/home";
        }else{
            console.log(res.data.message);
        }
    
   });

});