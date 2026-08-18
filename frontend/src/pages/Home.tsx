import React from 'react'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <h2>Welcome to Sikkim Tourism</h2>
      <p>Explore the beauty of Sikkim through gamified experiences.</p>
      <div className="explore-section">
        <button className="btn-primary">Start Exploring</button>
        <button className="btn-secondary">View Collectibles</button>
      </div>
    </div>
  )
}
