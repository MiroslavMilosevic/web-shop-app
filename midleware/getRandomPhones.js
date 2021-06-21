const Phone = require('../db/phone');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}




async function getRandomPhones(){
    let response = await Phone.find();
    
    let nizIzabranihBrojeva = [];
    let nizTelefona = [];
     console.log('duzina responsea:'+response.length);
    for(let i =0; i< 5; i++){
        let random = getRandomInt(response.length);
        if( ! nizIzabranihBrojeva.includes(random)){
            nizTelefona.push(response[random]);
            nizIzabranihBrojeva.push(random);
        }else{
            i--;
        }
    }
    return nizTelefona;
   


}


module.exports = getRandomPhones;