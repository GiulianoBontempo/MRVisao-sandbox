import Column from "./Column.js"; // importa o script da coluna

// define uma classe para o kanban
export default class Kanban {
    constructor(root) { // construtor da raiz do kanban
        this.root = root;

        Kanban.columns().forEach(column => {
            const columnView = new Column(column.id, column.title);

            this.root.appendChild(columnView.elements.root);
        });
    }

    // DEFINE AS COLUNAS DO KANBAN
    static columns() {
        return [
            {
                id: 1,
                title: "CANDIDATOS"
            },
            {
                id: 2,
                title: "EM PROGRESSO"
            },
            {
                id: 3,
                title: "COMPLETO"
            }
        ];
    }
}
