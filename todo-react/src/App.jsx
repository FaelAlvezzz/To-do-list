import { useState } from 'react'

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [inputValue, setInputValue] = useState("");

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

      <ul>
        {tarefas.map((tarefa) => 
        <li key={tarefa.id} className="item-tarefa">
          {tarefa.texto}
        </li>
        )}
      </ul>
    </div>
    
  )
}

export default App
