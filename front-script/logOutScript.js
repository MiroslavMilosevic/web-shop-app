
let logOutDiv = document.getElementById('logOut');

logOutDiv.addEventListener('click', async () => {

    let logOutResponse = await axios.get('/logout')
    if (logOutResponse.data.isOk) {
        window.location.href = "/home";
    } else {

    }
})