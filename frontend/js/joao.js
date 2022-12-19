// <<<< ==== SCRIPT COM A LÓGICA DA NAVBAR!!! ==== >>>>> //


window.onload = mudarNav();
// variaveis para definir os objetos que serão usados no codigo
const btnDropDown = document.querySelector('.btnDropDown');
const dropDownIcon = btnDropDown.querySelector('span');
const mobileMenu = document.querySelector('.mobileMenu');


// função para abrir o menu dropdown ao clicar no logo no menu responsivo do celular
btnDropDown.addEventListener('click', () => {
    dropDownIcon.innerText = dropDownIcon.innerText === 'menu'
        ? 'close'
        : 'menu';

    mobileMenu.classList.toggle('is-open');
})

// variaveis para definir os obejtos para o codigo de mduar a navbar ao estar logado ou nao
const menuNavbar = document.querySelector('.menuNavbar');
const loginNavbar = document.querySelector('.loginNavbar');
const registrarNavbar = document.querySelector('.registrarNavbar');
const item1DropDown = document.querySelector('.item1DropDown');
const item2DropDown = document.querySelector('.item2DropDown');
const item3DropDown = document.querySelector('.item3DropDown');
const item4DropDown = document.querySelector('.item4DropDown');
const item5DropDown = document.querySelector('.item5DropDown');
const item6DropDown = document.querySelector('.item6DropDown');



// variavel para ver se o cliente esta logado ou deslogado
// 1 = deslogado, 2=logado

// fetch('/cookies')
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         let cookies = String(data);
//         console.log(cookies)
//         if (cookies.includes("deslogado")){
//             deslogado = 1;
//         }
//         else if (cookies.includes("empreiteiro")) {
//             deslogado = 2;

//         }            
//         mudarNav();
//     })





// fetch('/cookiesAdmin')
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         let cookiesAdmin = String(data);
//         console.log(cookiesAdmin)
//         if (cookiesAdmin.includes("deslogado")){
//             deslogado = 1;
//         }
//         else {
//             deslogado = 3;
//             console.log(deslogado);
//         }
//         mudarNav()
//     })







async function mudarNav() {

    let deslogado = 0;
    let admin = 1;
    let empreiteiro = 1;

    fetch('/cookiesAdmin')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let cookiesAdmin = String(data);
            console.log(cookiesAdmin);
            if (cookiesAdmin.includes("deslogado")) {
                deslogado = 0;
            }
            else {
                admin = 3;

            }

        })
    fetch('/cookies')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let cookies = String(data);
            console.log(cookies);
            if (cookies.includes("deslogado")) {
                deslogado = 0;
            }
            else if (cookies.includes("empreiteiro")) {
                empreiteiro = 2;

            }

            console.log(admin + " " + empreiteiro);

        })

    await sleep(1);
    //  Navbar quando a o usuario estiver deslogado
    if (deslogado == 1) {

        menuNavbar.classList.remove('logado');
        loginNavbar.classList.remove('logado');
        registrarNavbar.classList.remove('logado');

        item1DropDown.innerText = "Login";
        item1DropDown.href = "login.html"
        item2DropDown.innerText = "Cadastrar-se";
        item2DropDown.href = "cadastro.html"
        item3DropDown.innerText = "Home";
        item3DropDown.href = "home.html"
        item4DropDown.innerText = "Obras";
        item4DropDown.href = "obras.html"
        item5DropDown.classList.remove('sumir');
        item5DropDown.innerText = "Como funciona";
        item5DropDown.href = "comoFunciona.html"
        item6DropDown.classList.remove('sumir');
        item6DropDown.innerText = "Entre em contato conosco";
        item6DropDown.href = "wpp.html"
        console.log(deslogado + " " + "Deslogado" + " " + admin + " " + empreiteiro);

        // Navbar Quando o Empreiteiro Estiver Logado 
    } else if (empreiteiro == 2) {
        menuNavbar.classList.add('logado');
        loginNavbar.classList.add('logado');
        registrarNavbar.classList.add('logado');

        item1DropDown.innerText = "Home";
        item1DropDown.href = "home.html"

        item2DropDown.innerText = "Obras";
        item2DropDown.href = "obras.html"

        item3DropDown.innerText = "Meu Perfil";
        item3DropDown.href = "meuPerfil.html"

        item4DropDown.innerText = "Como funciona";
        item4DropDown.href = "comoFunciona.html"

        item5DropDown.classList.remove('sumir');
        item5DropDown.innerText = "Sair";
        item5DropDown.href = "/logout"

        item6DropDown.classList.add('sumir');


        console.log(deslogado + " " + "Deslogado" + " " + admin + " " + empreiteiro);



        // Navbar Admin
    } else if (admin == 3) {
        menuNavbar.classList.add('logado');
        loginNavbar.classList.add('logado');
        registrarNavbar.classList.add('logado');

        item1DropDown.innerText = "Item1Admin";
        item2DropDown.innerText = "Item2Admin";
        item3DropDown.innerText = "Item3Admin";
        item4DropDown.innerText = "Item4Admin";
        item5DropDown.innerText = "Sair";
        item5DropDown.href = "/logout"

        item5DropDown.classList.remove('sumir');

        console.log(deslogado + " " + "Deslogado" + " " + admin + " " + empreiteiro);
    }


    console.log("fim");


}

const menu = document.getElementById("menuNavbarGrande");


// aciona o menu dropdown
function abrirMenu() {
    mobileMenu.classList.toggle('is-open');

}

//Te redireciona para a home
function voltarHome() {
    window.location.href = "home.html";
}


function logout() {
    document.getElementById("modalLogout").setAttribute('aria-hidden', 'true');
    document.getElementById("modalLogout").setAttribute('aria-hidden', 'true');
}

function removeCookie() {
    location.href = '../logout?cookie='
}

async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 100));
}