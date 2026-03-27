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


//Registrar usuário
window.registrar = async () => {
    // 1. Captura os valores dos inputs
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    // Validação básica antes de enviar
    if (!email || !password) {
        return alert("Preencha todos os campos!");
    }

    try {
        // 2. Faz a chamada POST para o seu servidor
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email, 
                password: password
            })
        });

        const data = await response.json();

        // 3. Trata a resposta do servidor
        if (response.ok) {
            alert("Sucesso: " + data.message);
            // Limpa os campos
            document.getElementById('reg-email').value = '';
            document.getElementById('reg-password').value = '';
        } else {
            alert("Erro: " + (data.error || "Não foi possível cadastrar."));
        }

    } catch (error) {
        console.error("Erro na comunicação com o servidor:", error);
        alert("O servidor está offline ou houve um erro de rede.");
    }
};

//Login do usuário
export async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Sucesso: " + data.message);
            localStorage.setItem('usuario', JSON.stringify(data.user));
        } else {
            alert("Erro: " + (data.error || "Falha no login"));
        }
    } catch (error) {
        console.error("Erro na conexão:", error);
    }
}

window.fazerLogin = fazerLogin;

//função para login, armazenando o token no localStorage para futuras requisições autenticadas
// main.js

window.fazerLogin = async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) return alert("Preencha os campos!");

    // 1. MOSTRA O SPINNER ANTES DO FETCH
    setLoading(true); 

    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            mostrarAppComSuaveTransicao(); // Função que definimos antes
        } else {
            alert("Erro: " + data.error);
        }
    } catch (error) {
        console.error("Erro na conexão:", error);
    } finally {
        // 2. ESCONDE O SPINNER SEMPRE (DANDO CERTO OU ERRADO)
        setLoading(false); 
    }
};

// Função para alternar entre Login e Cadastro
window.alternarAuth = (mostrarRegistro) => {
    document.getElementById('login-container').classList.toggle('oculto', mostrarRegistro);
    document.getElementById('registro-container').classList.toggle('oculto', !mostrarRegistro);
};

// Função para verificar se está logado ao carregar a página
function checarAutenticacao() {
    const token = localStorage.getItem('token');
    const authSection = document.getElementById('auth-section');
    const appSection = document.getElementById('app-section');

    if (token) {
        authSection.classList.add('oculto');
        appSection.classList.remove('oculto');
        carregarTarefasDoServidor(); // Função que criamos anteriormente
    } else {
        authSection.classList.remove('oculto');
        appSection.classList.add('oculto');
    }
}

// main.js

// Função (ou trecho do código) que mostra o App após o login
function mostrarAppComSuaveTransicao() {
    const authSection = document.getElementById('auth-section');
    const appSection = document.getElementById('app-section');

    // 1. Esconde a seção de login imediatamente
    authSection.classList.add('oculto');

    // 2. Remove o 'oculto' do App para que ele passe a existir no layout
    appSection.classList.remove('oculto');

    // 3. Adiciona a classe de animação para fazê-lo surgir suavemente
    appSection.classList.add('fade-in');
    
    // Opcional: Remova a classe de animação após ela terminar para não dar conflito futuro
    setTimeout(() => {
        appSection.classList.remove('fade-in');
    }, 550); // Um pouco mais que o tempo da animação (0.5s)
}

const loadingOverlay = document.getElementById('loading-overlay');

// Função global para controlar o loading
window.setLoading = (isLoading) => {
    if (isLoading) {
        loadingOverlay.classList.remove('oculto');
    } else {
        loadingOverlay.classList.add('oculto');
    }
};

// Inicialização
renderizar();