const btnDropDown=document.querySelector('.btnDropDown');
const dropDownIcon=btnDropDown.querySelector('span');
const mobileMenu=document.querySelector('.mobileMenu');
const wpp=document.querySelector('.wpp');
const filtro=document.querySelector("#filtro");

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
        item3DropDown.innerText="Obras";
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

function aparecer(){
    $("#wpp").slideDown("slow");
}


let ac ="11993416930"
let al ="32999392807"
let ap ="Numero AC"
let am ="Numero AC"
let ba ="Numero AC"
let ce ="Numero AC"
let df ="Numero AC"
let es ="Numero AC"
let go ="Numero AC"
let ma ="Numero AC"
let mt ="Numero AC"
let ms ="Numero AC"
let mg ="Numero AC"
let pa ="Numero AC"
let pb ="Numero AC"
let pr ="Numero AC"
let pe ="Numero AC"
let pi ="Numero AC"
let rj ="Numero AC"
let rn ="Numero AC"
let rs ="Numero AC"
let ro ="Numero AC"
let rr ="Numero AC"
let sc ="Numero AC"
let sp ="11960616272"
let se ="Numero AC"
let to ="Numero AC"


const caminho="https://wa.me/"
 
function abrirwpp(){
    let estado=filtro.options[filtro.selectedIndex].value;
    console.log
    if (estado=="AC"){
        url=(caminho+ac)

        const aba=window.open(url,'_blank');

        aba.focus();
  
    } 
    if (estado=="AL"){
        url=(caminho+al)

        const aba=window.open(url,'_blank');

        aba.focus();
    }   
    if (estado=="AP"){
        console.log("este vai ser o wpp de " + ap);
    }   
    if (estado=="AM"){
        console.log("este vai ser o wpp de " + am);
    }   
    if (estado=="BA"){
        console.log("este vai ser o wpp de " + ba);
    }   
    if (estado=="DF"){
        console.log("este vai ser o wpp de " + df);
    }   
    if (estado=="ES"){
        console.log("este vai ser o wpp de " + es);
    }   
    if (estado=="GO"){
        console.log("este vai ser o wpp de " + go);
    }   
    if (estado=="MA"){
        console.log("este vai ser o wpp de " + ma);
    }   
    if (estado=="MT"){
        console.log("este vai ser o wpp de " + mt);
    }   
    if (estado=="MG"){
        console.log("este vai ser o wpp de " + mg);
    }  
    if (estado=="PA"){
        console.log("este vai ser o wpp de " + pa);
    }   
    if (estado=="PB"){
        console.log("este vai ser o wpp de " + pb);
    }   
    if (estado=="PR"){
        console.log("este vai ser o wpp de " + pr);
    }   
    if (estado=="PE"){
        console.log("este vai ser o wpp de " + pe);
    }  
    if (estado=="RJ"){
        console.log("este vai ser o wpp de " + rj);
    }   
    if (estado=="RN"){
        console.log("este vai ser o wpp de " + rn);
    }   
    if (estado=="RS"){
        console.log("este vai ser o wpp de " + rs);
    }   
    if (estado=="RO"){
        console.log("este vai ser o wpp de " + ro);
    }  
    if (estado=="RR"){
        console.log("este vai ser o wpp de " + rr);
    }   
    if (estado=="SC"){
        console.log("este vai ser o wpp de " + sc);
    }   
    if (estado=="SP"){
        console.log("este vai ser o wpp de " + sp);
    }   
    if (estado=="SE"){
        console.log("este vai ser o wpp de " + se);
    }   
    if (estado=="TO"){
        console.log("este vai ser o wpp de " + to);
    }   

}