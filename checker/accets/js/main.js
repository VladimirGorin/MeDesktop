// const sendForm = () => {
//     for(let i = 1; i < 22; i++){
//         var getValue = document.getElementById(`testchoice${i}`);
//     }
// }

// Счётчик 
let ct = 0;


// Отлавливание кликов
const addEvent = () => {
    
    ct++
    console.log(ct)

}

// Отправка формы

const sendForm = () => {
    console.log(ct)
    // Если кликов меньше чем 10 а форм 10 то тогда ошибка если больше то есть все то успех
    if(ct < 10){
        alert("Ввыберете все поля")
    }else{
        alert("Успех!")

    }
}
