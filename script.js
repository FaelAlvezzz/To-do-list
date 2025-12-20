// Váriavel GLOBAL
let tarefas = [];

const inputTarefa = document.getElementById('nova-tarefa');

// Renderizar página
function renderizarLista() {
  const lista = document.getElementById('lista');
    lista.innerHTML = ''; // Limpa a lista antes de renderizar
     
    
  tarefas.forEach((tarefa, index) => {
  // Elementos
  const novoItem = document.createElement('li');
  const spanTexto = document.createElement('span');
  const checkBox = document.createElement('input');
  const botaoDeletar = document.createElement('button');
      
    // Cria um novo item de lista
    novoItem.classList.add('item-tarefa');
    //Criando o span
    spanTexto.textContent = tarefa.texto;

    checkBox.checked = tarefa.concluido; //chamando a função checkbox se for true
    checkBox.type = 'checkBox';// Criando Checkbox concluído
    checkBox.classList.add('checkBox-tarefa');
    
    //Verifica se a tarefa está concluída 
    if(tarefa.concluido) {
      spanTexto.classList.add('tarefa-concluida');
      novoItem.classList.add('item-concluido');
    }
    
    //Evento de botão concluído
    checkBox.addEventListener('change', function() {
      tarefas[index].concluido = checkBox.checked;
      spanTexto.classList.toggle('tarefa-concluida', checkBox.checked);
      novoItem.classList.toggle('item-concluido', checkBox.checked);
      salvarStorage(); 
    })
    
    // Cria o botão de deletar
    botaoDeletar.textContent = 'Deletar';
    botaoDeletar.classList.add('botao-delete');       
    // Adiciona a funcionalidade do botão deletar
    botaoDeletar.onclick = function() {
      tarefas.splice(index, 1);
      salvarStorage();
      renderizarLista();
    }

    // Adiciona o checkbox, o span e o botão de deletar ao novo item da lista
    novoItem.appendChild(checkBox);
    novoItem.appendChild(spanTexto);
    novoItem.appendChild(botaoDeletar);

    // Adiciona o novo item à lista
    lista.appendChild(novoItem);
  });
}

// Quando o botão "Adicionar" for clicado, esta função será chamada
function adicionarTarefa() {

  // Campo de texto e a lista no HTML
  const inputTarefa = document.getElementById('nova-tarefa');

  // Pega o valor do campo de texto e cria uma nova tarefa
  const textoTarefa = inputTarefa.value.trim();
        
    //Verifica se o campo está vazio
    if (textoTarefa == "") {
      alert("Por favor, insira uma tarefa!!");
      return; //Sai da função se o campo estiver vazio
    }

    //Manipulando Array
    const novaTarefa = {
      texto: textoTarefa,
      concluido: false
    }

    tarefas.push(novaTarefa); // Adicion o objeto ao Array
    salvarStorage();
    renderizarLista();

    // Limpa o campo de texto
    inputTarefa.value = ''; 
    inputTarefa.focus(); // Coloca o foco de volta no campo de texto
}

carregarStorage();

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

// Botão Enter função
inputTarefa.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    adicionarTarefa();
  }
});