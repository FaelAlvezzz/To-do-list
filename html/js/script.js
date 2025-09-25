// Quando o botão "Adicionar" for clicado, esta função será chamada
function adicionarTarefa() {

    // Campo de texto e a lista no HTML
    const inputTarefa = document.getElementById('nova-tarefa');
    const lista = document.getElementById('lista');

    // Pega o valor do campo de texto e cria uma nova tarefa
    const textoTarefa = inputTarefa.value.trim();
        //Verifica se o campo está vazio
         if (textoTarefa == "") {
            alert("Por favor, insira uma tarefa!!");
            return; //Sai da função se o campo estiver vazio
       }

    // Cria um novo item de lista e um botão de delete
    const novoItem = document.createElement('li');
      novoItem.textContent = textoTarefa;
      novoItem.classList.add('item-tarefa');
      lista.appendChild(novoItem);
      novoItem.addEventList('click', function() {
        novoItem.classList.toggle('concluido');
      })
      inputTarefa.value = ''; // Limpa o campo de texto
       

    // Cria o botão de deletar
      const botaoDeletar = document.createElement('button');
      botaoDeletar.textContent = 'Deletar';
      botaoDeletar.classList.add('botao-delete');
      novoItem.appendChild(botaoDeletar);
       
      // Adiciona a funcionalidade do botão deletar
       botaoDeletar.onclick = function() {
        lista.removeChild(novoItem);
      }
}