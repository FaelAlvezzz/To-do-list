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

    // Cria um novo item de lista
    const novoItem = document.createElement('li');
      novoItem.classList.add('item-tarefa');
      
    //Criando o span
    const spanTexto = document.createElement('span');
      spanTexto.textContent = textoTarefa;
    
    // Criando Checkbox concluído
    const checkBox = document.createElement('input');
      checkBox.type = 'checkBox';
      checkBox.classList.add('checkBox-tarefa');
      //Evento de botão concluído
    checkBox.addEventListener('change', function() {
      spanTexto.classList.toggle('tarefa-concluida', checkBox.checked);
      novoItem.classList.toggle('item-concluido', checkBox.cheked);
    })

    // Cria o botão de deletar
      const botaoDeletar = document.createElement('button');
      botaoDeletar.textContent = 'Deletar';
      botaoDeletar.classList.add('botao-delete');       
      // Adiciona a funcionalidade do botão deletar
      botaoDeletar.onclick = function() {
      lista.removeChild(novoItem);
      }
      
      // Adiciona o checkbox, o span e o botão de deletar ao novo item da lista
      novoItem.appendChild(checkBox);
      novoItem.appendChild(spanTexto);
      novoItem.appendChild(botaoDeletar);

      
      // Adiciona o novo item à lista
      lista.appendChild(novoItem);


      // Limpa o campo de texto
      inputTarefa.value = ''; 
      inputTarefa.focus(); // Coloca o foco de volta no campo de texto
}