const $button = document.querySelector('.generator');
const $copy = document.querySelector('.copy');
const $btnMenu = document.querySelector('.btn-menu');
const $btnsave = document.querySelector('.save');
const $btnExitBox = document.querySelector('.exit-box');
const $btnBoxSave = document.querySelector('.btn-save');
let valueLs = 0;


const numberRandom = (min, max) => {
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
};

const generatorPassword = () => {
  let numCaracters = 0;
  let minMayus = 0;
  let randomOption = 0;
  let randomCaracter = 0;
  let password = "";
  const caracterVocal = "aeiou";
  const caracterConstante = "bcdfghjklmnpqrstuvwxyz";
  const caracterSimbolo = "%@_#!&$/¡'+*-.,<>¿?=";
  const caracterNumero = "0123456789";

  numCaracters = numberRandom(8, 16);

  for (let i = 0; i < numCaracters; i++) {
    randomOption = numberRandom(0, 3);

    if (randomOption == 0) {
      randomCaracter = numberRandom(0, 4);
      minMayus = numberRandom(0, 1);

      if (minMayus == 0) {
        password += caracterVocal[randomCaracter];
      } else if (minMayus == 1) {
        password += caracterVocal[randomCaracter].toUpperCase();
      }
    } else if (randomOption == 1) {
      randomCaracter = numberRandom(0, 21);
      minMayus = numberRandom(0, 1);

      if (minMayus == 0) {
        password += caracterConstante[randomCaracter];
      } else if (minMayus == 1) {
        password += caracterConstante[randomCaracter].toUpperCase();
      }
    } else if (randomOption == 2) {
      randomCaracter = numberRandom(0, 19);
      minMayus = numberRandom(0, 1);
      password += caracterSimbolo[randomCaracter];

    } else if (randomOption == 3) {
      randomCaracter = numberRandom(0, 9);
      minMayus = numberRandom(0, 1);
      password += caracterNumero[randomCaracter];
    }
  }

  printPass(password)
};

const printPass = (pass) => {
  const $password = document.querySelector('.password');
  
  if (pass != "") {
    $password.textContent = pass;
    document.querySelector('.copy img').setAttribute('src', 'img/copy.svg')
    }
};

const buttonCopy = () => {
  const $password = document.querySelector('.password');
  const copyImg = document.querySelector('.copy img');

  $password.focus()
  navigator.clipboard.writeText($password.textContent);
  copyImg.setAttribute('src', 'img/check.svg');
}

const buttonMenu = () => {
  const $menu = document.querySelector('.menu');
  const $imageMenu = document.querySelector('.btn-menu img');

  $menu.classList.toggle('is-active');

  if($menu.classList.contains('is-active')){
    $imageMenu.setAttribute('src', 'img/x-menu-hamburger.svg');
  } else {
    $imageMenu.setAttribute('src', 'img/menu-hamburger.svg')
  }
}

const buttonSave = () => {
  const $boxSave = document.querySelector('.container-save-box');
  const $valuePassword = document.querySelector('.password'); 
  const $password = document.getElementById('password');

  $boxSave.classList.toggle('is-active-box');
  $password.value = $valuePassword.textContent;
  document.getElementById('title').value = '';
  document.getElementById('username').value = '';
}


const buttonBoxSave = () => {
  let valueTitle = document.getElementById('title');
  let valueUsername = document.getElementById('username');
  let valuePassword = document.getElementById('password');
  const $boxSave = document.querySelector('.container-save-box');

  // let valueLs = localStorage.length.toString();


  const object = {
    title: valueTitle.value,
    username: valueUsername.value,
    password: valuePassword.value,
    id: `${valueLs}`
  }
  const objetString = JSON.stringify(object)

  localStorage.setItem(`${valueLs}`, objetString)

  valueTitle.value = '';
  valueUsername.value = '';
  valuePassword.value = '';

  $boxSave.classList.remove('is-active-box')
  
}


const lastNumber = (id) => {
  let num = 0;
  for(let i = 0; i < id.length; i++){
    if(id[i] > num){
      num = id[i]
    }
  }
  return num;
}

$button.addEventListener('click', () => {
  generatorPassword()
})
$copy.addEventListener('click', () => buttonCopy())
$btnsave.addEventListener('click', () => buttonSave())
$btnExitBox.addEventListener('click', () => buttonSave())
$btnMenu.addEventListener('click', () => buttonMenu())
$btnBoxSave.addEventListener('click', () =>{
  buttonBoxSave()
  valueLs++
})

const arr = []
for(let i = 0; i < localStorage.length; i++){
  arr.push(localStorage.key(i))
}
valueLs = lastNumber(arr)
valueLs++
console.log(valueLs);

