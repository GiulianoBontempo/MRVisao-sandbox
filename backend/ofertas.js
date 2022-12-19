// <<<< ==== SCRIPT COM FUNÇÕES, FETCHS E LÓGICAS DOS SERVIÇOS ==== >>>>> //



// Pega o id da obra via url
let idObra = +window.location.search.replace('?', '');
// Declaração de variávies
let urlObras = '/obras';
let urlServicos = '/servicos';
let todasAsObras;
let todosOsServicos;
let obraDesejada;
let servicosDesejados = [];
let divServicos = document.getElementById("mainServicos");
let divModal = document.getElementById("mainModal");
let cookies;
let idUsuario;

fetch('/cookies')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        cookies = data;
        console.log(cookies)
        if (cookies === "deslogado") {
            idUsuario = "deslogado"
        } else {
            let cookieSplit = cookies.split('=');
            idUsuario = +cookieSplit[1]
        }
    })

// Pega todas as obras do banco de dados
fetch(urlObras)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        todasAsObras = data;
        // Itera por todas as obras
        todasAsObras.map(function (todasAsObras) {
            // Compara o id das obras com o id desejado para encontrar a obra certa
            if (todasAsObras.obra_id === idObra) {
                obraDesejada = todasAsObras;
            }
        })

        // Substitui conteúdos da página pelos conteúdos das obra

        document.getElementById("nomeObra").innerHTML = obraDesejada.nome;

        document.getElementById("localizacaoObra").innerHTML = obraDesejada.cidade + ', ' + obraDesejada.estado + ' - ' + obraDesejada.endereco;

        document.getElementById("descricaoObra").innerHTML = obraDesejada.descricao;
    })

// Puxa todos os serviços do banco de dados
fetch(urlServicos)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let saida = '';
        let saidaModal = '';
        todosOsServicos = data;
        // Itera por todos os serviços
        todosOsServicos.map(function (todosOsServicos) {
            // Se o serviço tem o obra_id igual ao id da obra desejada, adiciona ele a saída
            if (todosOsServicos.obra_id === idObra) {
                saida += '<div class="col-12"><p class="tituloServico">' + `${todosOsServicos.tipo}` + ':</p><p class="descricaoServico">' + `${todosOsServicos.descricao}` + '</p><br><button class="botao" data-bs-toggle="modal" data-bs-target="#modal' + `${todosOsServicos.servico_id}` + '">CANDIDATAR-SE</button></div>'
                //Adiciona o seu modal
                if (idUsuario === "deslogado") {
                    saidaModal += '<div class="modal" id="modal' + `${todosOsServicos.servico_id}` + '" tab-index="-1" aria-labelledby="tituloModal' + `${todosOsServicos.servico_id}` + '" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="tituloModal' + `${todosOsServicos.servico_id}` + '">' + `${todosOsServicos.tipo}` + '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p class="textoVermelho">Faça login para poder se candidatar</p></div></div></div></div>'
                } else {
                    saidaModal += '<div class="modal" id="modal' + `${todosOsServicos.servico_id}` + '" tab-index="-1" aria-labelledby="tituloModal' + `${todosOsServicos.servico_id}` + '" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="tituloModal' + `${todosOsServicos.servico_id}` + '">' + `${todosOsServicos.tipo}` + '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><form id="insereCandidatura" method="post" action="/inserecandidatura"><textarea name="proposta" rows="8" cols="56" placeholder="Digite sua proposta aqui"></textarea><input type="hidden" name="servico_id" value="' + `${todosOsServicos.servico_id}` + '"><input type="hidden" name="usuario_id" value="' + `${idUsuario}` + '"></form></div><div class="modal-footer"><button type="submit" form="insereCandidatura" class="btn btn-primary">Enviar</button></div></div></div></div>'
                }
            }
        })
        // Manda os serviços para o html
        divServicos.innerHTML = saida;
        mainModal.innerHTML = saidaModal;
    })