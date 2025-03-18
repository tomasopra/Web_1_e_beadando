import { useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (description.trim() !== '' && amount !== '' && category !== '') {
      setExpenses([...expenses, {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category,
        date: new Date().toLocaleDateString()
      }])
      setDescription('')
      setAmount('')
      setCategory('')
    }
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="expense-tracker">
      <h1>Kiadásfigyelő</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Kiadás leírása"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Összeg"
          />
        </div>
        <div className="form-group">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Válassz kategóriát</option>
            <option value="Élelmiszer">Élelmiszer</option>
            <option value="Számlák">Számlák</option>
            <option value="Szórakozás">Szórakozás</option>
            <option value="Közlekedés">Közlekedés</option>
            <option value="Egyéb">Egyéb</option>
          </select>
        </div>
        <button type="submit">Hozzáadás</button>
      </form>

      <div className="summary">
        <h2>Összesítés</h2>
        <p>Összes kiadás: {totalExpenses.toLocaleString()} Ft</p>
      </div>

      <div className="expenses-list">
        <h2>Kiadások</h2>
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-info">
              <span className="description">{expense.description}</span>
              <span className="amount">{expense.amount.toLocaleString()} Ft</span>
              <span className="category">{expense.category}</span>
              <span className="date">{expense.date}</span>
            </div>
            <button onClick={() => deleteExpense(expense.id)}>Törlés</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App 