var perfil;

let parametroURL = new URLSearchParams(window.location.search)
let parametro = parametroURL.get('email')
let url = window.location.href;
let cookies;
let id;
let n_obras = 0;
let notaMedia=0;
let notaFinal=0;

fetch('/cookies')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        cookies = data;
        console.log(cookies)
        if (cookies === "deslogado"){
            window.location.href = 'login.html';
        }
        let cookieSplit = cookies.split('=');
        id = +cookieSplit[1];
        fetch(`/feedbackId?usuario_id=${id.toString()}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                document.getElementById("catalogo_obras").innerHTML = ''
                let feedbacks = data;
                feedbacks.map(function(feedback){
                    fetch(`/servicosId?servico_id=${feedback.servico_id.toString()}`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            let servico = data;
                            servico.map(function(servico){
                                fetch(`/obraId?obra_id=${servico.obra_id.toString()}`)
                                    .then((response) => {
                                        return response.json();
                                    })
                                    .then((data) => {
                                        let obra = data;
                                        obra.map(function(obra){
                                            adiciona_card(obra.nome, servico.tipo, feedback.nota);
                                        })
                                    })
                            })
                        })
                })
            })
    })
//fetch responsável por fazer com que a página possa acessar todos os usuários do banco de dados e puxe as informações a serem exibidar no "cabeçalho"
fetch('/usuario')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        perfis = data;
        perfis.map(function (perfis) {
            if(perfis.usuario_id == id) {
                perfil = perfis
            }
        })
        
        document.getElementById("nome_do_empreiteiro").innerHTML = `<h2>${perfil.nomeFantasia}</h2>`
        document.getElementById("nome_da_empreiteira").innerHTML = `<p>${perfil.nomeFantasia}</p>`
        document.getElementById("CPF").innerHTML = `<p>${perfil.cnpj}</p>`
        document.getElementById("RG").innerHTML = `<p>${perfil.cnpj}</p>`

    })

    function defineNota(notaMedia, n_obras){
        let notaFinal
        if(n_obras == 0){
            notaFinal = 0
        }
        else {
            notaFinal = notaMedia/n_obras;
        }
        return notaFinal
    }

// função criada para testes
function adiciona_card(obra, tipo, nota) {

    
    if( n_obras % 2 == 0){
        document.getElementById("catalogo_obras").innerHTML += '<div class="row linha_obras" id="' + n_obras/2 + '"><div class="card_servicos offset-1 col-4"><div class="row"><img class="img_obra" src="../imgs/obra-mrv-campo-grande-ms-881485.jpg" alt=""></div><div class="container informacoes_card"><div class="row"><h3>' + `${obra}` + ' - ' + `${tipo}` + '</h3></div><div class="row informacoes_baixo"><div class="container"><div class="row"><div class="col-6 feedback"><a href=""><img class="icon_feedback" src="../imgs/feedback-do-cliente.png" alt="feedback"></a></div><!-- <div class="offset-1 col-1"><hr id="vertical"></div> --><div class="col-6 nota_servico"><p>Nota: ' + `${nota}` + ',00</p></div></div></div></div></div></div></div>';
    }

    else {
        document.getElementById((n_obras-1)/2).innerHTML += '<div class="card_servicos offset-2 col-4"><div class="row"><img class="img_obra" src="../imgs/obra-mrv-campo-grande-ms-881485.jpg" alt=""></div><div class="container informacoes_card"><div class="row"><h3>' + `${obra}` + ' - ' + `${tipo}` + '</h3></div><div class="row informacoes_baixo"><div class="container"><div class="row"><div class="col-6 feedback"><a href=""><img class="icon_feedback" src="../imgs/feedback-do-cliente.png" alt="feedback"></a></div><!-- <div class="offset-1 col-1"><hr id="vertical"></div> --><div class="col-6 nota_servico"><p>Nota: ' + `${nota}` + ',00</p></div></div></div></div></div></div>';
    };
    n_obras += 1;
    notaMedia += nota;
    notaFinal = defineNota(notaMedia, n_obras)
    document.getElementById("nota").innerHTML = `<p>Nota: ${notaFinal.toFixed(2)}</p>`
}