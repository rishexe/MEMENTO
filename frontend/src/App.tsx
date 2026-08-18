import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [apiStatus, setApiStatus] = useState('checking...')

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then((res) => res.json())
      .then((data) => setApiStatus(data.status))
      .catch(() => setApiStatus('offline'))
  }, [])

  return (
    <main className="app">
      <h1>Sikkim Gamified Tourism Platform</h1>
      <p>Frontend is running on port 5173</p>
      <p>API Status: <strong>{apiStatus}</strong></p>
      <div className="section">
        <h2>Quick Links</h2>
        <ul>
          <li>Explore Districts</li>
          <li>View Locations</li>
          <li>Check Profile</li>
          <li>View Quests</li>
        </ul>
      </div>
    </main>
  )
}

export default App
