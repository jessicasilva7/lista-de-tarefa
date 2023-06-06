// Função para adicionar uma nova tarefa à lista
function adicionarTarefa(event) {
    event.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

    // Obtém os valores dos campos de entrada
    let conteudo = document.getElementById('conteudo').value;
    let categoria = document.querySelector('input[name="categoria"]:checked').value;

    // Cria os elementos HTML para a nova tarefa
    let novaTarefa = document.createElement('div');
    novaTarefa.className = 'item-lista';
    novaTarefa.innerHTML = `
      <label>
        <input type="checkbox" onclick="marcarCheckbox(this)" onchange="marcarFeito(this)">
        <span class="bolhas bolha-${categoria}"></span>
      </label>
      <div class="container-lista">
        <input type="text" value="${conteudo}" readonly>
      </div>
      <div class="acoes">
        <button class="editar" onclick="editarTarefa(this)">Editar</button>
        <button class="deletar" onclick="excluirTarefa(this)">Deletar</button>
      </div>
    `;

    // Adiciona a nova tarefa à lista
    let listaDeTarefas = document.getElementById('lista-de-tarefas');
    listaDeTarefas.appendChild(novaTarefa);

    // Limpa os campos de entrada
    document.getElementById('conteudo').value = '';
    document.getElementById('categoria1').checked = false;
    document.getElementById('categoria2').checked = false;

    // Salva a lista de tarefas no localStorage
    salvarLista();
}

// Função para salvar a lista de tarefas no localStorage
function salvarLista() {
    let listaDeTarefas = document.getElementById('lista-de-tarefas').innerHTML;
    localStorage.setItem('listaDeTarefas', listaDeTarefas);
}

// Função para carregar a lista de tarefas do localStorage
function carregarLista() {
    let listaDeTarefas = localStorage.getItem('listaDeTarefas');
    if (listaDeTarefas) {
        document.getElementById('lista-de-tarefas').innerHTML = listaDeTarefas;
    }
}

// Função para marcar o checkbox como checado
// function marcarCheckbox(checkbox) {
//     checkbox.checked = true;
// }


// Função para marcar uma tarefa como "feito"
function marcarFeito(checkbox) {
    let containerLista = checkbox.parentNode.parentNode;
    let inputTarefa = containerLista.querySelector('input[type="text"]');
    if (checkbox.checked) {
        inputTarefa.classList.add('feito');
    } else {
        inputTarefa.classList.remove('feito');
    }
}

// Função para editar uma tarefa
function editarTarefa(botaoEditar) {
    let containerLista = botaoEditar.parentNode.previousElementSibling;
    let inputTarefa = containerLista.querySelector('input[type="text"]');

    if (inputTarefa.readOnly) {
        inputTarefa.readOnly = false;
        botaoEditar.textContent = 'Salvar';
    } else {
        inputTarefa.readOnly = true;
        botaoEditar.textContent = 'Editar';
    }

    salvarLista();
}

// Função para excluir uma tarefa
function excluirTarefa(botaoExcluir) {
    let itemLista = botaoExcluir.parentNode.parentNode;
    itemLista.remove();

    salvarLista();
}

// Event listener para adicionar uma nova tarefa ao enviar o formulário
let formNovaLista = document.getElementById('form-nova-lista');
formNovaLista.addEventListener('submit', adicionarTarefa);

// Carrega a lista de tarefas ao carregar a página
window.addEventListener('load', carregarLista);
