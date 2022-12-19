// <<<< ==== SCRIPT COM FUNÇÕES, FETCHS E LÓGICAS DA PÁGINA INICIAL DE ADMIN ==== >>>>> //

// função que reireciona para inserir obra
function redirecionaAdicionaObra() {
    window.location.href = 'inserir.html'
}

let statusFiltro;

// função que obtem status da obra
function getStatusObra() {
    const select = document.getElementById('filtroStatus');
    const statusObra = select.options[select.selectedIndex].text;
    statusFiltro = statusObra
    console.log(statusFiltro)
    // document.getElementById("tabela").innerHTML = ''


    // fetch para filtrar status da obra
    fetch(`/obrasStatus?statusObra=${statusFiltro}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            obras = data;
            const lista = document.getElementById("obrasComStatus");
            let saidaOpcoes = '';
            const elemento1 = document.getElementById("elemento1");
            const elemento2 = document.getElementById("elemento2");

            // se a obra estiver em andamento
            if (statusFiltro == 'Em andamento') {
                elemento1.textContent = "Cancelar"
                elemento2.textContent = "Concluir"
                // document.getElementById("tabelaHead").innerHTML += `<th scope="col" class="flexivel">Cancelar</th>
                // <th scope="col" class="flexivel">Concluir</th>`

            }

            // se a obra estiver cancelada
            else if (statusFiltro == 'Cancelado') {
                elemento1.textContent = "Reativar"
                elemento2.textContent = "Concluir"
                // document.getElementById("tabelaHead").innerHTML += `<th scope="col" class="flexivel">Reativar</th>
                // <th scope="col" class="flexivel">Concluir</th>`

            }
            else {

                elemento1.textContent = "Cancelar"
                elemento2.textContent = "Reativar"
                // document.getElementById("tabelaHead").innerHTML += `<th scope="col" class="flexivel">Cancelar</th>
                // <th scope="col" class="flexivel">Reativar</th>`
            }

            document.getElementById("tabelaBody").innerHTML = ""

            // document.getElementById("tabelaHead").innerHTML += `<th scope="col" class="flexivel">Reativar</th>
            // <th scope="col" class="flexivel">Concluir</th>`
            obras.map(function (obras) {


                saidaOpcoes += '<option value="' + `${obras.nome}` + '"></option>'


                if (statusFiltro == 'Em andamento') {

                    document.getElementById("tabelaBody").innerHTML +=
                        `<tr>
                    <th scope="row">${obras.obra_id}</th>
                    <td>${obras.nome}</td>
                    <td>${obras.endereco}</td>
                    <td class="tdImgs"><a href = "adminServicos.html?obra_id=${obras.obra_id}" id = "servicos"><img id="imgServicos" src="../imgs/servico.png" alt=""></a></td>
                    <td class="tdImgs"><a href = "editarObra.html?obra_id=${obras.obra_id}"><img src="../imgs/editar.png" alt=""></td></a>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Cancelado&obra_id=${obras.obra_id}"><img id = "imgCancelar" src="../imgs/cancelar (1).png" alt=""></a></td>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Concluido&obra_id=${obras.obra_id}"><img id = "imgConcluir" src="../imgs/verifica (1).png" alt=""></a></td>
                    </tr>`
                }
                else if (statusFiltro == 'Cancelado') {

                    document.getElementById("tabelaBody").innerHTML +=
                        `<tr>
                    <th scope="row">${obras.obra_id}</th>
                    <td>${obras.nome}</td>
                    <td>${obras.endereco}</td>
                    <td class="tdImgs"><a href = "adminServicos.html?obra_id=${obras.obra_id}" id = "servicos"><img id="imgServicos" src="../imgs/servico.png" alt=""></a></td>
                    <td class="tdImgs"><a href = "editarObra.html?obra_id=${obras.obra_id}"><img src="../imgs/editar.png" alt=""></td></a>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Em andamento&obra_id=${obras.obra_id}"><img id = "imgAtivar" src="../imgs/contrato.png" alt=""></a></td>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Concluido&obra_id=${obras.obra_id}"><img id = "imgConcluir" src="../imgs/verifica (1).png" alt=""></a></td>
                    </tr>`
                }
                else {


                    document.getElementById("tabelaBody").innerHTML +=
                        `<tr>
                    <th scope="row">${obras.obra_id}</th>
                    <td>${obras.nome}</td>
                    <td>${obras.endereco}</td>
                    <td class="tdImgs"><a href = "adminServicos.html?obra_id=${obras.obra_id}" id = "servicos"><img id="imgServicos" src="../imgs/servico.png" alt=""></a></td>
                    <td class="tdImgs"><a href = "editarObra.html?obra_id=${obras.obra_id}"><img src="../imgs/editar.png" alt=""></td></a>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Cancelado&obra_id=${obras.obra_id}"><img id = "imgCancelar" src="../imgs/cancelar (1).png" alt=""></a></td>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Em andamento&obra_id=${obras.obra_id}"><img id = "imgAtivar" src="../imgs/contrato.png" alt=""></a></td>
                    </tr>`

                }
            })


            lista.innerHTML = saidaOpcoes;
        })

}

// let statusFiltro = trocaStatus()

// fetch para buscar os dados do admin nos cookies
fetch('/cookiesAdmin')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        cookies = data;
        console.log(cookies)
        if (cookies === "deslogado") {
            // window.location.href = 'login.html';
        }
        let cookieSplit = cookies.split('=');
        id = +cookieSplit[1]
        console.log(id)
    })

getStatusObra();

// função do filtro da barra de pesquisa das obras
function filtroPesquisa() {
    const inputPesquisa = document.getElementById("inputPesquisa").value;
    fetch(`/obrasStatus?statusObra=${statusFiltro}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            obras = data;
            obras.map(function (obras) {
                if (obras.nome === inputPesquisa) {
                    if (statusFiltro == 'Em andamento') {

                        document.getElementById("tabelaBody").innerHTML =
                            `<tr>
                    <th scope="row">${obras.obra_id}</th>
                    <td>${obras.nome}</td>
                    <td>${obras.endereco}</td>
                    <td class="tdImgs"><a href = "adminServicos.html?obra_id=${obras.obra_id}" id = "servicos"><img id="imgServicos" src="../imgs/servico.png" alt=""></a></td>
                    <td class="tdImgs"><a href = "editarObra.html?obra_id=${obras.obra_id}"><img src="../imgs/editar.png" alt=""></td></a>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Cancelado&obra_id=${obras.obra_id}"><img id = "imgCancelar" src="../imgs/cancelar (1).png" alt=""></a></td>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Concluido&obra_id=${obras.obra_id}"><img id = "imgConcluir" src="../imgs/verifica (1).png" alt=""></a></td>
                    </tr>`
                    }
                    else if (statusFiltro == 'Cancelado') {

                        document.getElementById("tabelaBody").innerHTML =
                            `<tr>
                    <th scope="row">${obras.obra_id}</th>
                    <td>${obras.nome}</td>
                    <td>${obras.endereco}</td>
                    <td class="tdImgs"><a href = "adminServicos.html?obra_id=${obras.obra_id}" id = "servicos"><img id="imgServicos" src="../imgs/servico.png" alt=""></a></td>
                    <td class="tdImgs"><a href = "editarObra.html?obra_id=${obras.obra_id}"><img src="../imgs/editar.png" alt=""></td></a>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Em andamento&obra_id=${obras.obra_id}"><img id = "imgAtivar" src="../imgs/contrato.png" alt=""></a></td>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Concluido&obra_id=${obras.obra_id}"><img id = "imgConcluir" src="../imgs/verifica (1).png" alt=""></a></td>
                    </tr>`
                    }
                    else {


                        document.getElementById("tabelaBody").innerHTML =
                            `<tr>
                    <th scope="row">${obras.obra_id}</th>
                    <td>${obras.nome}</td>
                    <td>${obras.endereco}</td>
                    <td class="tdImgs"><a href = "adminServicos.html?obra_id=${obras.obra_id}" id = "servicos"><img id="imgServicos" src="../imgs/servico.png" alt=""></a></td>
                    <td class="tdImgs"><a href = "editarObra.html?obra_id=${obras.obra_id}"><img src="../imgs/editar.png" alt=""></td></a>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Cancelado&obra_id=${obras.obra_id}"><img id = "imgCancelar" src="../imgs/cancelar (1).png" alt=""></a></td>
                    <td class="tdImgs"><a href = "/atualizaStatusObra?status=Em andamento&obra_id=${obras.obra_id}"><img id = "imgAtivar" src="../imgs/contrato.png" alt=""></a></td>
                    </tr>`

                    }
                }
            })
        })
}
































function adicionaCard() {

    const linha = Math.floor(nObras / 4)
    const id = "linhaObras" + linha
    console.log(id)

    if (nObras % 4 != 0) {
        document.getElementById("linhaObras1").innerHTML += `<div class="card_servicos offset-1 col-2"><div class="row"><img class="img_obra" src="../imgs/obra-mrv-campo-grande-ms-881485.jpg" alt=""></div><div class="container informacoes_card"><div class="row"><h3><strong>Alexandre Halfed</strong></h3></div><div class="row informacoes_baixo"><div class="container"><div class="row"><div class="col-6 feedback"><a href=""><img class="icon_feedback" src="../imgs/feedback-do-cliente.png" alt="feedback"></a></div><div class="col-6 nota_servico"><p>Nota: 10,00</p></div></div></div></div></div></div>`
        nObras += 1
    }
    else {
        document.getElementById("catalogoObras").innerHTML += `<div class="row linha_obras" id="linhaObras${(nObras / 4)}"><div class="card_servicos offset-1 col-2"><div class="row"><img class="img_obra" src="../imgs/obra-mrv-campo-grande-ms-881485.jpg" alt=""></div><div class="container informacoes_card"><div class="row"><h3><strong>Alexandre Halfed</strong></h3></div><div class="row informacoes_baixo"><div class="container"><div class="row"><div class="col-6 feedback"><a href=""><img class="icon_feedback" src="../imgs/feedback-do-cliente.png" alt="feedback"></a></div><div class="col-6 nota_servico"><p>Nota: 10,00</p></div></div></div></div></div></div>`
        nObras += 1
    }
}