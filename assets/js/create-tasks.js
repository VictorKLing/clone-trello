const botaoAdicionarOutraLista = document.querySelector('.add-list-create')
const nomeLista = document.querySelector('.add-list-name')
const formNomeLista = document.querySelector('.add-list-name textarea')
const botaoFecharNomeLista = document.querySelector('.add-list-name div i')
const adicioarLista = document.querySelector('.add-list-name div a')
const allTasksContent = document.querySelector('.all-tasks-content'); 
const addListContainer = document.querySelector('.add-list');

// exibe o botão para dar nome à nova lista
botaoAdicionarOutraLista.addEventListener('click', () => {
    botaoAdicionarOutraLista.classList.add('desativo')
    nomeLista.classList.add('ativo')
    formNomeLista.focus()
    const submitTask = document.querySelectorAll('.task-column-submit');
    const botaoAdicionarTask = document.querySelectorAll('.task-column-add');
    submitTask.forEach(task => {
        task.classList.remove('ativo');
    });
    botaoAdicionarTask.forEach(botao => {
        botao.classList.remove('desativo');
    });
    
})

// fecha o botão para dar nome à nova lista
botaoFecharNomeLista.addEventListener('click', () => {
    botaoAdicionarOutraLista.classList.remove('desativo')
    nomeLista.classList.remove('ativo')
})
//remove todos textarea quando crio uma nova coluna


// cria uma nova lista
adicioarLista.addEventListener('click', (event) => {
    event.preventDefault()
    const novaLista = document.createElement('div');
    novaLista.classList.add('task-column');
    novaLista.setAttribute('draggable', 'true');
    novaLista.innerHTML = `
        <div class="task-column-content">
            <div class="task-column-name">
                <h1>${formNomeLista.value}</h1>
                <div>
                    <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                    <h1>...</h1>
                </div>
            </div>
            <div class="task-column-all-tasks">
                
            </div>
            <div class="task-column-add">
                <div>
                    <i class="fa-solid fa-plus"></i>
                    <h1>Adicionar um cartão</h1>
                </div>
                <i class="fa-regular fa-images"></i>
            </div>
            <div class="task-column-submit">
                <textarea class="task-column-submit-form" placeholder="Insira um título ou cole um link"></textarea>
                <div>
                    <a class="task-column-submit-add" href="">Adicionar Cartão</a>
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
        </div>`;
    
    allTasksContent.appendChild(novaLista);
    allTasksContent.appendChild(addListContainer);
    formNomeLista.focus()
    formNomeLista.value = ""; // Limpa o textarea
    
});

// Delegação de eventos para adicionar tarefas nas colunas existentes ou novas
allTasksContent.addEventListener('click', function(event) {
    if (event.target.closest('.task-column-add')) {
        const taskColumn = event.target.closest('.task-column');
        const botaoAdicionarTask = taskColumn.querySelector('.task-column-add');
        const submitTask = taskColumn.querySelector('.task-column-submit');
        const taskName = taskColumn.querySelector('.task-column-submit-form');
        // remove o textarea do nome da lista quando apertar para criar uma nova tarefa
        const nomeLista = document.querySelectorAll('.add-list-name')
        nomeLista.forEach(botao => {
            botao.classList.remove('ativo');
        });
        const botaoAdicionarOutraLista = document.querySelector('.add-list-create')
        botaoAdicionarOutraLista.classList.remove('desativo');
        
        const allSubmitTask = document.querySelectorAll('.task-column-submit');
        allSubmitTask.forEach(botao => {
            botao.classList.remove('ativo');
        });
        const allBotaoAdicionarTask = document.querySelectorAll('.task-column-add');
        allBotaoAdicionarTask.forEach(botao => {
            botao.classList.remove('desativo');
        });
        botaoAdicionarTask.classList.add('desativo');
        submitTask.classList.add('ativo');
        taskName.focus();
    }

    // Fechar submit de nova tarefa
    if (event.target.closest('.fa-x')) {
        const taskColumn = event.target.closest('.task-column');
        const submitTask = taskColumn.querySelector('.task-column-submit');
        const botaoAdicionarTask = taskColumn.querySelector('.task-column-add');

        submitTask.classList.remove('ativo');
        botaoAdicionarTask.classList.remove('desativo');
    }

    // Adicionar nova tarefa
    if (event.target.closest('.task-column-submit-add')) {
        event.preventDefault();
        const taskColumn = event.target.closest('.task-column');
        const taskName = taskColumn.querySelector('.task-column-submit-form');
        const currentTaskList = taskColumn.querySelector('.task-column-all-tasks');

        const createNewTask = document.createElement("div");
        createNewTask.classList.add('task-column-task');
        createNewTask.setAttribute('draggable', 'true');
        const contentNewTask = document.createElement("h1");
        contentNewTask.textContent = taskName.value;
        
        createNewTask.appendChild(contentNewTask);
        currentTaskList.appendChild(createNewTask);

        taskName.value = "";
        taskName.focus();
        const allTask = document.querySelectorAll('.task-column-task');
        allTask.forEach(task => {
            task.addEventListener('dragstart', (event) => {
                console.log('arraste iniciado');
            });
        });
    }
    arrastaESoltaTarefas()
    arrastaESoltaListas()
});

// arrasta e solta tarefas
function arrastaESoltaTarefas() {
    const colunasTarefa = document.querySelectorAll('.task-column')

    document.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragging-tarefa')
    })
    document.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging-tarefa')
    })
    
    colunasTarefa.forEach((item) => {
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging-tarefa');
            const applyAfter = getNewPosition(item, e.clientY);
    
            if (applyAfter) {
                applyAfter.insertAdjacentElement('afterend', dragging);
            } else {
                item.querySelector('.task-column-all-tasks').prepend(dragging);
            }
        });
    });
    
    function getNewPosition(colunasTarefa, posY) {
        const cards = colunasTarefa.querySelectorAll('.task-column-task:not(.dragging-tarefa)');
        let result = null;
        for (let refer_card of cards){
            const box = refer_card.getBoundingClientRect();
            const boxCenterY = box.y + box.height / 2;
            if (posY >= boxCenterY) result = refer_card;
        }
        return result;
    }
}
arrastaESoltaTarefas()

// arrasta e solta listas
function arrastaESoltaListas() {
    const todasAsListas = document.querySelectorAll('.task-column')

    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('task-column')) {
            e.target.classList.add('dragging-lista')
        }
    })

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('task-column')) {
            e.target.classList.remove('dragging-lista')
        }
    })

    todasAsListas.forEach((lista) => {
        lista.addEventListener('dragover', (e) => {
            e.preventDefault()
            const dragging = document.querySelector('.dragging-lista')
            const applyAfter = getNewListPosition(lista, e.clientX)

            if (applyAfter) {
                applyAfter.insertAdjacentElement('afterend', dragging)
            } else {
                lista.parentNode.prepend(dragging)
            }
        })
    })

    function getNewListPosition(listas, posX) {
        const listaAtual = listas.parentNode.querySelectorAll('.task-column:not(.dragging-lista)')
        let resultado = null
        listaAtual.forEach((lista) => {
            const box = lista.getBoundingClientRect()
            const boxCenterX = box.x + box.width / 2
            if (posX >= boxCenterX) resultado = lista
        })
        return resultado
    }
}

arrastaESoltaListas()