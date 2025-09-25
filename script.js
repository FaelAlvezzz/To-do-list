// Váriavel GLOBAL
let tarefas = [];

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
      salvarTf(); 
    })

    // Cria o botão de deletar
      const botaoDeletar = document.createElement('button');
      botaoDeletar.textContent = 'Deletar';
      botaoDeletar.classList.add('botao-delete');       
      // Adiciona a funcionalidade do botão deletar
      botaoDeletar.onclick = function() {
        lista.removeChild(novoItem);
        salvarTf();
      }
      
      // Adiciona o checkbox, o span e o botão de deletar ao novo item da lista
      novoItem.appendChild(checkBox);
      novoItem.appendChild(spanTexto);
      novoItem.appendChild(botaoDeletar);

      
      // Adiciona o novo item à lista
      lista.appendChild(novoItem);
      salvarTf(); // Salva a lista no armazenamento local


      // Limpa o campo de texto
      inputTarefa.value = ''; 
      inputTarefa.focus(); // Coloca o foco de volta no campo de texto
}
carregarTf(); // Chama a função para carregar as tarefas salvas ao carregar a página

// Carrega as tarefas salvas quando a página é carregada
function salvarTf() {
  const lista = document.getElementById('lista');

  // Salvando a lista no HTLM
  const sHTML = lista.innerHTML;
  localStorage.setItem('tarefas', sHTML);
}

// Função carregas que mantem o que foi digitado mesmo após atualizar a página
function carregarTf() {
  
  const htmlSalvo = localStorage.getItem('tarefas');
  
  if (htmlSalvo) {
    const lista = document.getElementById('lista');
    lista.innerHTML = htmlSalvo;
  }
}

//Salvar no local storage
function salvarStorage() {
  const jsonString = JSON.stringify(tarefas);
  localStorage.setItem('tarefas', jsonString);
}

//Carregar do local storage
function carregarStorage() {
  const jsonString = localStorage.getItem('tarefas');
  if (jsonString) {
    tarefas = JSON.parse(jsonString);
  }
  renderizarLista();
}