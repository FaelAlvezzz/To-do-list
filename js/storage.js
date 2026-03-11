export function salvar(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

export function carregar() {
    const dados = localStorage.getItem('tarefas');
    return dados ? JSON.parse(dados) : [];
}