const botaoAdicionarTask = document.querySelectorAll('.task-column-add');
const submitTask = document.querySelectorAll('.task-column-submit');
const botaofecharSubmitTask = document.querySelectorAll('.task-column-submit div i')
const taskColumnAdd = document.querySelector('.task-column-submit-add')
const taskName = document.querySelectorAll('.task-column-submit-form');
const botaoAdicionarCartao = document.querySelectorAll('.task-column-submit-add');

// exibe o botão de colocar nome da nova task
function exibirSubmit(index) {
    botaoAdicionarTask[index].classList.add('desativo');
    submitTask[index].classList.add('ativo');
    taskName[index].focus();
}
botaoAdicionarTask.forEach((botao, index) => {
    botao.addEventListener('click', () => exibirSubmit(index));
});

// fecha o botão de colocar nome da nova task
function fecharTaskSubmit (index) {
    submitTask[index].classList.remove('ativo');
    botaoAdicionarTask[index].classList.remove('desativo');
}
botaofecharSubmitTask.forEach((botao, index) => {
    botao.addEventListener('click', () => fecharTaskSubmit(index));
});



//cria uma a nova tarefa
function enviarTask(event, index) {
    const textTaskName = taskName[index].value;
    event.preventDefault(); 
    const createNewTask = document.createElement("div")
    createNewTask.classList.add('task-column-task');
    const contentNewTask = document.createElement("h1");
    contentNewTask.textContent = textTaskName;

    createNewTask.appendChild(contentNewTask)
    const currentTaskList = document.querySelectorAll('.task-column-all-tasks')[index];
    currentTaskList.appendChild(createNewTask);

    taskName[index].value = "";
    taskName[index].focus();
}

botaoAdicionarCartao.forEach((botao, index) => {
    botao.addEventListener('click', (event) => enviarTask(event, index));
});