import './App.css';
import { useState } from 'react';
import Grid from './components/Grid';

function App() {
  // States
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [isMakingMaze, setIsMakingMaze] = useState(false)
  
  return (
    <div className="App">
      <h1>Maze Generator</h1>
      <input type="text" onChange={(e) => {setRows(e.currentTarget.value)}} placeholder="Rows" />
      <input type="text" onChange={(e) => {setCols(e.currentTarget.value)}} placeholder="Cols" />

      <button onClick={(e) => setIsMakingMaze(true)} disabled={isMakingMaze}>Make Maze!</button>
      <button onClick={(e) => window.location.reload()} >Reset</button>
     
     <Grid initialCols={Number(cols)} initialRows={Number(rows)} isMakingMaze={isMakingMaze}/>
    </div>
  );
}

export default App;
