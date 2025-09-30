import { useState, useEffect } from 'react'

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const save = localStorage.getItem('tarefas');
    return save ? JSON.parse(save) : [];
  });
  const [inputValue, setInputValue] = useState("");

  const toggleTarefa = id => {
    setTarefas(tarefas.map(tarefa => {
      if(tarefa.id === id) {
        return{...tarefa, concluido: !tarefa.concluido};
      }
      return tarefa;
    }))
  }

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = () => {
    if (inputValue.trim() === '') return; // Evita adicionar tarefas vazias
    
    const novaTarefa = {
      texto: inputValue,
      concluido: false,
      id: Date.now()
    }

    setTarefas([...tarefas, novaTarefa]);
    setInputValue(''); // Limpa o campo de input
  }

  return (
    <div className="Container">
      <h1>Minha Lista de Tarefas</h1>

      <input 
        type="text"
        placeholder="Nova tarefa..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      
      <button onClick={adicionarTarefa}>Adicionar</button>

      <ul id="lista-tarefas">
        {tarefas.map((tarefa) => 
        <li key={tarefa.id} className="item-tarefa">
          {tarefa.texto}
        </li>
        )}
        <input 
          type = "checkBox"
          className = "checkBox-tarefa"
          checked = {tarefas.concluido}
          onChange = {() => toggleTarefa(tarefas.id)}
        />
        <span className ={tarefas.concluido ? "texto-concluido" : ''}>
          {tarefas.texto}
        </span>

         
      </ul>
    </div>
    
  )
}

export default App
