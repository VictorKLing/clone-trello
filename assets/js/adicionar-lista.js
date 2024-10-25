const botaoAdicionarOutraLista = document.querySelector('.add-list-create')
const nomeLista = document.querySelector('.add-list-name')
const formNomeLista = document.querySelector('.add-list-name textarea')
const botaoFecharNomeLista = document.querySelector('.add-list-name div i')
const adicioarLista = document.querySelector('.add-list-name div a')
const allTasksContent = document.querySelector('.all-tasks-content'); 
const addListContainer = document.querySelector('.add-list');



// exibe o botao para dar nome a nova lista
botaoAdicionarOutraLista.addEventListener('click', () => {
    botaoAdicionarOutraLista.classList.add('desativo')
    nomeLista.classList.add('ativo')
    formNomeLista.focus()
})

// fecha o botao para dar nome a nova lista
botaoFecharNomeLista.addEventListener('click', () => {
    botaoAdicionarOutraLista.classList.remove('desativo')
    nomeLista.classList.remove('ativo')
})

// cria uma nova lista
adicioarLista.addEventListener('click', (event) => {
    event.preventDefault()
    const novaLista = document.createElement('div');
    novaLista.classList.add('task-column')
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
                <textarea class="task-column-submit-form"  placeholder="Insira um título ou cole um link"></textarea>
                <div>
                    <a class="task-column-submit-add" href="">Adicionar Cartão</a>
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
        </div>`
    
    allTasksContent.appendChild(novaLista)
    allTasksContent.appendChild(addListContainer);

})