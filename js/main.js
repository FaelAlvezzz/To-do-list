import * as Tarefas from './tarefas.js';
import * as Storage from './storage.js';
import * as UI from './ui.js';

let listaTarefas = Storage.carregar();
let indexSendoEditado = null;

function renderizar() {
  UI.elementos.listaPendentes.innerHTML = '';
  UI.elementos.listaConcluidas.innerHTML = '';

  listaTarefas.forEach((tarefa, index) => {
    const card = UI.criarCard(tarefa, index, {
      aoAlternar: (i) => { listaTarefas = Tarefas.alternar(listaTarefas, i); atualizar(); },
      aoDeletar: (i) => { listaTarefas = Tarefas.remover(listaTarefas, i); atualizar(); },
      aoEditar: (i) => { indexSendoEditado = i; UI.gerenciarModal(true, listaTarefas[i].texto); }
    });

    if(tarefa.concluido) UI.elementos.listaConcluidos.appendChild(card);
    else UI.elementos.listaPendentes.appendChild(card);
  });
}

function atualizar() {
  Storage.salvar(listaTarefas);
  renderizar();
}

window.adicionarTarefa = () => {
  const texto = UI.elementos.inputPrincipal.value.trim();
  if(texto) {
    listaTarefas = Tarefas.adicionar(listaTarefas, texto);
    UI.elementos.inputPrincipal.value = '';
    atualizar();
  }
};

window.salvarEdicao = () => {
  const novoTexto = UI.elementos.inputEditar.value.trim();
  if (novoTexto) {
    listaTarefas = Tarefas.editar(listaTarefas, indexSendoEditado, novoTexto);
    UI.gerenciarModal(false);
    atualizar();
  }
};

window.fecharModal = () => UI.gerenciarModal(false);

window.apagarTudoConcluidas = () => {
  if(confirm("Deseja realmente apagar todas as tarefas? ")) {
    listaTarefas = Tarefas.filtrarConcluidas(listaTarefas);
    atualizar();
  }
};

// Listener dos teclados
UI.elementos.inputPrincipal.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') window.adicionarTarefa();
});

// Inicialização
renderizar();