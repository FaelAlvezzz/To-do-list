export function adicionarTarefa(lista, texto) {
    const nova = { texto, concluido: false };
    return [...lista, nova];
}

export function alternarEstado(lista, index) {
    const novaLista = [...lista];
    novaLista[index].concluido = !novaLista[index].concluido;
    return novaLista;
}

export function removerTarefa(lista, index) {
    return lista.filter((_, i) => i !== index);
}

export function limparConcluidas(lista) {
    return lista.filter(t => !t.concluido);
}