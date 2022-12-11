let notActive = document.getElementById("interview__notActive")
let Active = document.getElementById("interview__Active")

function interview_open (){
    notActive.style.display = 'none'
    Active.style.display = 'flex'

}

function interview_close (){
    notActive.style.display = 'flex'
    Active.style.display = 'none'

}