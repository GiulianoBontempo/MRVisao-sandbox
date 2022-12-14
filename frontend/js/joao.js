
// variaveis para definir os objetos que serão usados no codigo
const btnDropDown = document.querySelector('.btnDropDown');
const dropDownIcon = btnDropDown.querySelector('span');
const mobileMenu = document.querySelector('.mobileMenu');

// função para abrir o menu dropdown ao clicar no logo no menu responsivo do celular
btnDropDown.addEventListener('click',()=>{
    dropDownIcon.innerText=dropDownIcon.innerText=== 'menu'
    ? 'close'
    : 'menu';

    mobileMenu.classList.toggle('is-open');
})

// variaveis para definir os obejtos para o codigo de mduar a navbar ao estar logado ou nao
const menuNavbar=document.querySelector('.menuNavbar');
const loginNavbar=document.querySelector('.loginNavbar');
const registrarNavbar=document.querySelector('.registrarNavbar');
const item1DropDown=document.querySelector('.item1DropDown');
const item2DropDown=document.querySelector('.item2DropDown');
const item3DropDown=document.querySelector('.item3DropDown');
const item4DropDown=document.querySelector('.item4DropDown');
const item5DropDown=document.querySelector('.item5DropDown');


// variavel para ver se o cliente esta logado ou deslogado
// 1 = deslogado, 2=logado


let deslogado = 1;

fetch('/cookies')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let cookies = data;
            console.log(cookies)
            if (cookies === "deslogado"){
                deslogado = 2;
            }
            mudarNav();
        })



function mudarNav(){
//   ao clicar serão inseridos uma classe que mudarão o CSS dos elementos
    //menuNavbar.classList.toggle('logado');
    //loginNavbar.classList.toggle('logado');
    //registrarNavbar.classList.toggle('logado');

    // executa esse codigo se estiver deslogado
    if (deslogado===1){
        item1DropDown.innerText="Home";
        item1DropDown.href="home.html";
        item2DropDown.innerText="Obras";
        item2DropDown.href="obras.html";
        item3DropDown.innerText="Perfil";
        item3DropDown.href="meuPerfil.html";
        item4DropDown.innerText="Como funciona";
        item4DropDown.href="comoFunciona.html";
        item5DropDown.innerText="Deslogar-se";
        item5DropDown.href="#";
        item5DropDown.onclick=logout();
        item5DropDown.dataset.bsToggle="modal";
        item5DropDown.dataset.bsTarget="#modalLogout";

        menuNavbar.classList.toggle('logado');
        loginNavbar.classList.toggle('logado');
        registrarNavbar.classList.toggle('logado');
        
            // executa esse codigo se estiver logado
    } else{
        item1DropDown.innerText="Home";
        item1DropDown.href="home.html";
        item2DropDown.innerText="Obras";
        item2DropDown.href="obras.html";
        item3DropDown.innerText="Como funciona";
        item3DropDown.href="comoFunciona.html";
        item4DropDown.innerText="Registrar-se";
        item4DropDown.href="cadastro.html";
        item5DropDown.innerText="Login";
        item5DropDown.href="login.html";
    }
}

const menu=document.getElementById("menuNavbarGrande");


// aciona o menu dropdown
function abrirMenu(){
    mobileMenu.classList.toggle('is-open');

}

//Te redireciona para a home
function voltarHome(){
    window.location.href = "home.html";
}

function logout(){
    document.getElementById("modalLogout").setAttribute('aria-hidden', 'true');
}