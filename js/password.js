const infoPassword = document.querySelector('.container-window-password');
const btnExit = document.querySelector('.button-exit');
const container = document.querySelector('.container');
const deletePass = document.getElementById('delete');
const updatePass = document.getElementById('update');
const contentIds = [];
const infoIds = [];



const getData = () => {
    for(let i = 0; i < localStorage.length; i++){
        contentIds.push(localStorage.key(i));
    }
    contentIds.sort()
    dataPrint();
}

const dataPrint = () => { 

    contentIds.forEach(el => {
        const createDiv = document.createElement('div');
        createDiv.classList.add('container-password');
        createDiv.innerHTML = `<h3>${JSON.parse(localStorage.getItem(el)).title}</h3>`
        createDiv.setAttribute('id', `${el}`)
        container.appendChild(createDiv);
    })

    const $title = document.querySelector('.title');
    const $username = document.getElementById('username');   
    const $password = document.getElementById('pass');
    const $id = document.getElementById('id');

    for(let i = 0; i < contentIds.length; i++){
        infoIds.push(JSON.parse(localStorage.getItem(contentIds[i])))
    }

 document.addEventListener('click', (e) => {
    infoIds.forEach(el => {
        if(e.target.innerText == el.title){
            $title.textContent = el.title;
            $username.value = el.username;
            $password.value = el.password;
            $id.value = el.id;
        }   
    })
 })
}


const deletePassword = () => {
    const $id = document.getElementById('id');

    localStorage.removeItem(`${$id.value}`)
}

const updatePassword = () => {
    const $id = document.getElementById('id')
    const $title = document.querySelector('.title');
    const $username = document.getElementById('username');
    const $password = document.getElementById('pass');

    const object = {
        title: $title.textContent,
        username: $username.value,
        password: $password.value,
        id: $id.value
    }

    localStorage.setItem(`${$id.value}`, JSON.stringify(object))
}

const buttonExit = () => {
    infoPassword.classList.toggle('is-active');
}

const viewWindow = () =>{
    const containerPassword = document.querySelectorAll('.container-password');
    containerPassword.forEach(el => {
        el.addEventListener('click', () => {
            infoPassword.classList.toggle('is-active');
            deletePass.addEventListener('click', (e) => deletePassword(infoIds))

        })
    })
}
getData()
viewWindow()

btnExit.addEventListener('click', () => buttonExit())
deletePass.addEventListener('click', (e) => deletePassword(infoIds))
updatePass.addEventListener('click', () => updatePassword())
