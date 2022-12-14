const btnDropDown=document.querySelector('.btnDropDown');
const dropDownIcon=btnDropDown.querySelector('span');
const mobileMenu=document.querySelector('.mobileMenu');

btnDropDown.addEventListener('click',()=>{
    dropDownIcon.innerText=dropDownIcon.innerText=== 'menu'
    ? 'close'
    : 'menu';

    mobileMenu.classList.toggle('is-open');
})

const menuNavbar=document.querySelector('.menuNavbar');
const loginNavbar=document.querySelector('.loginNavbar');
const registrarNavbar=document.querySelector('.registrarNavbar');
const item1DropDown=document.querySelector('.item1DropDown');
const item2DropDown=document.querySelector('.item2DropDown');
const item3DropDown=document.querySelector('.item3DropDown');
const item4DropDown=document.querySelector('.item4DropDown');
const item5DropDown=document.querySelector('.item5DropDown');

let deslogado=1

function mudarNav(){
  
    menuNavbar.classList.toggle('logado');
    loginNavbar.classList.toggle('logado');
    registrarNavbar.classList.toggle('logado');

    if (deslogado==1){
        item5DropDown.classList.add('sumir');
        item1DropDown.innerText="Home";
        item2DropDown.innerText="Obras";
        item3DropDown.innerText="Perfil";
        item4DropDown.innerText="Como funciona";

        deslogado=2
    } else{
        item1DropDown.innerText="Login";
        item2DropDown.innerText="Registrar-se";
        item3DropDown.innerText="Perfil";
        item4DropDown.innerText="Como funciona";

        item5DropDown.classList.remove('sumir');
      
        deslogado=1
    }

    
    console.log(deslogado)
}

const menu=document.getElementById("menuNavbarGrande");



function abrirMenu(){
    mobileMenu.classList.toggle('is-open');

}
