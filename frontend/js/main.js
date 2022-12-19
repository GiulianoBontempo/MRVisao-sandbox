// CHAMA A CLASSE KANBAN PARA EXECUÇÃO NO SCRIPT PRINCIPAL
import KanbanAPI from "./api/KanbanAPI";
import Kanban from "./view/Kanban.js";
import Item from "./Item.js";


let parametroURL = new URLSearchParams(window.location.search)
let servico_id = parametroURL.get('servico_id')
console.log(servico_id);

function pegaCandidaturas() {
    fetch('/candidaturasServicoId?servico_id=' + servico_id)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            candidaturas = data;
            candidaturas.map(function (candidaturas) {
                fetch('/usuarioId?usuario_id=' + candidaturas.usuario_id)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        usuario = data;
                        usuario.map(function (usuario) {
                            KanbanAPI.insertItem(0, usuario.nomeFantasia, candidaturas.proposta, usuario.contato1)

                        })
                    })
            })
        })
    KanbanAPI.getItems(0).forEach(item => {
        this.renderItem(item);
    });
}

new Kanban(
    document.querySelector(".kanban")
);
