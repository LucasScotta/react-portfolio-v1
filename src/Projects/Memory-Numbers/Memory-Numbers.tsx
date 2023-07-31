import './styles/main.css'


const MemoryNumbers = () => {
  return <main className='Memory-Numbers-App'>
    <h1>Memory numbers App</h1>
    <p>Memorize the number and repeat it after a few seconds</p>
    <div className='Memory-Game-Container'>
      <p>Generated Number</p>
      <div className="user-input">
        <label>REPEAT THE NUMBER</label>
        <input />
      </div>
    </div>
  </main>
}

export default MemoryNumbers
