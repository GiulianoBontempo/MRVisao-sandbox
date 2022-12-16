// API DO KANBAN - PARTE VISUAL DE TODOS EMPREITEIROS DA OBRA
// ESSA API CONTÉM UM LOCAL STORAGE ONDE FUTURAMENTE SERÁ IMPLEMENTADO COM O BACK END


export default class KanbanAPI { //classe para exportar a API
    static getItems(columnId) { // static é chamado na própria classe (serve pra clonar objetos)
        const column = read().find(column => column.id == columnId);
        //checar se a columnId é igual a columnId passada, caso sim atribuir valor a column

        if (!column) {
            return [];
        }

        return column.items;
    }

    static insertItem(columnId, nome, proposta, num) { // Inserir
        const data = read();
        const column = data.find(column => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),  // operação matemática pra devolver um ID aleatório
            nome,
            proposta,
            num

        };

        if (!column) { // caso a coluna não existe, recebe erro
            throw new Error("Column does not exist.");
        }

        column.items.push(item); // vai pro topo da lista
        save(data);

        return item;
    }

    static updateItem(itemId, newProps) { // atualiza os dados
        const data = read();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id == itemId);

                if (item) {
                    return [item, column];
                }
            }
        })();

        if (!item) {
            throw new Error("Item not found.");
        }

        item.content = newProps.content === undefined ? item.content : newProps.content;

        //Atualizar coluna e posição
        if (
            newProps.columnId !== undefined
            && newProps.position !== undefined // posição da coluna
        ) {
            const targetColumn = data.find(column => column.id == newProps.columnId);

            if (!targetColumn) {
                throw new Error("Target column not found.");
            }

            // DELETAR O ITEM DA SUA ATUAL COLUNA
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

            // MOVER 
            targetColumn.items.splice(newProps.position, 0, item);
        }

        save(data);
    }

    static deleteItem(itemId) {
        const data = read();

        for (const column of data) { // vai atrás da coluna pelo id
            const item = column.items.find(item => item.id == itemId);

            if (item) { // se achar o item
                column.items.splice(column.items.indexOf(item), 1);
            }
        }

        save(data);
    }
}

function read() {
    const json = localStorage.getItem("kanban-data");

    if (!json) { // se não há nenhum json (primeira vez)
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
        ];
    }

    return JSON.parse(json);
}

function save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data));
}
