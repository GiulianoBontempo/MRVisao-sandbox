
//todo esse arquivo tem uma lógica responsável por fazer com que a tela de cadastro seja animada com javascript

// Inicializa variávies
const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const nextBtnSec = document.querySelector(".next-1");
const progressText = [...document.querySelectorAll(".step p")];
const progressCheck = [...document.querySelectorAll(".step .check")];
const bullet = [...document.querySelectorAll(".step .bullet")];
let max = 4;
let current = 1;

// slidePage.style.marginLeft = "0%";

// Define as alterações que ocorrem quando o botão da primeira página é clicado
function irPara2Pagina(){
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  
};

// Define as alterações que ocorrem quando o botão da segunda página é clicado
function irPara3Pagina(){
  slidePage.style.marginLeft = "-50%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
};


// Envia o formulario

function concluir(){
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  setTimeout(function () {
    alert("Your Form Successfully Signed up");
    location.reload();
  }, 800);
  window.location.href = "/insereUsuario"
};



// Sai do cadastro
function sairDoCadastro(){
  var res=confirm("Deseja mesmo sair? Você voltará para a página inicial! ");
  if (res){
    window.location.href="./home.html"
  }
}

// verifica se os valores da primeira pagina inseridos estao certos
function verificar1Etapa(){
  let nome=document.getElementById("nome1Etapa").value;
  let cnpj=document.getElementById("cnpj").value;

 
  let verificar1=false;
  let verificar2=false;

  if(nome==""){
    var res=confirm("Ops, Nome Fantasia em branco!");
    
  }else{
    verificar1=true
  }

  if(cnpj.length=="18"){
    verificar2=true

    
  }else{
    var res=confirm("Ops, Cnpj Inválido!");
  }
  if (verificar1 && verificar2){
    irPara2Pagina() ;
  }


  
}


// verifica se os valores da segunda pagina inseridos estao certos
function verificar2Etapa(){

  let nomeCompleto=document.getElementById("nomeCompleto").value;
  let telEmpresa=document.getElementById("telEmpresa").value;
 

  let verificar3=false;
  let verificar4=false;
 

  if (nomeCompleto.length>0){
    verificar3=true
  }else if (nomeCompleto.length==0){
    var res=confirm("Ops, Nome Fantasia em branco!");
    
  }

  if (telEmpresa.length>=15){
    verificar4=true
  }else if (telEmpresa.length<15){
    var res=confirm("Ops, Telefone Inválido!");
    
  }

  if (verificar3 && verificar4){
    irPara3Pagina() ;
  }




}


// verifica se os valores da terceira pagina inseridos estao certos
function verificar3Etapa(){

  let email=document.getElementById("email").value;
  let senha=document.getElementById("senha").value;
 

  let verificar5=false;
  let verificar6=false;
 

  if (email.length>0){
    verificar5=true
  }else if (email.length==0){
    var res=confirm("Ops, Email em branco!");
  }

  if (senha.length>=5){
    verificar6=true
  }else if (senha.length<5){
    var res=confirm("Ops, senha menor que 5 caractéres!");
    
  }

  if (verificar5 && verificar6){
    concluir();
  }




}