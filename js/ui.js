export const elementos = {
    inputPrincipal: document.getElementById('novatarefa'),
    listaPendentes: document.getElementById('lista-tarefas'),
    listaConcluidas: document.getElementById('tarefas-concluidas'),
    modal: document.getElementById('modal-edicao'),
    inputEditar: document.getElementById('editar-tarefa')
};

export function mostrarModal() {
    elementos.inputEditar.value = texto;
    elementos.modal.classList.remove('oculto');
    elementos.inputEditar.focus();
}

export function fecharModal() {
    elementos.modal.classList.add('oculto');
}

export function criarElementoTarefa(tarefa, index, funcoes) {
    const li = document.createElement('li');
    li.className = 'item-tarefa';

    li.innerHTML = `
        <input type="checkbox" class="checkBox-tarefa" ${tarefa.concluido ? 'checked' : ''}>
        <span class="${tarefa.concluido ? 'tarefa-concluida' : ''}>${tarefa.texto}</span>
        <div>
            ${!tarefa.concluido ? `<button class="btn-editar">Editar</button>` : ''}
            <button class="btn-del">Deletar</button>
        </div>
    `;

    li.querySelector('.checkBox-tarefa').onchange = () => funcoes.alternarConcluido(index);
    li.querySelector('.btn-del').onclick = () => funcoes.deletarTarefa(index);
    const btnEditar = li.querySelector('.btn-editar');
    if (btnEditar) btnEditar.onclick = () => funcoes.abrirModalEdicao(index);

    return li;
}