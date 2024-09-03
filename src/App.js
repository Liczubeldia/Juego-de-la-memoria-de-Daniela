import React, { useState, useEffect } from "react";
import "./App.css";

const generateGrid = () => {
  const totalCells = 24;
  const pairs = totalCells / 2;
  const numbers = Array.from({ length: pairs }, (_, i) => i + 1);
  const gridNumbers = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
  return gridNumbers.map((number, index) => ({
    id: index,
    number,
    flipped: false,
    matched: false,
  }));
};

const App = () => {
  const [grid, setGrid] = useState(generateGrid());
  const [flippedCells, setFlippedCells] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const handleCellClick = (id) => {
    if (flippedCells.length === 2) return;

    const newGrid = grid.map((cell) =>
      cell.id === id ? { ...cell, flipped: !cell.flipped } : cell
    );
    setGrid(newGrid);
    setFlippedCells([...flippedCells, id]);
  };

  useEffect(() => {
    if (flippedCells.length === 2) {
      const [firstId, secondId] = flippedCells;
      const firstCell = grid.find((cell) => cell.id === firstId);
      const secondCell = grid.find((cell) => cell.id === secondId);

      if (firstCell.number === secondCell.number) {
        const newGrid = grid.map((cell) =>
          cell.id === firstId || cell.id === secondId
            ? { ...cell, matched: true }
            : cell
        );
        setGrid(newGrid);
        setScore(score + 1); // Incrementa la puntuación por acierto
      } else {
        setTimeout(() => {
          const newGrid = grid.map((cell) =>
            cell.id === firstId || cell.id === secondId
              ? { ...cell, flipped: false }
              : cell
          );
          setGrid(newGrid);
        }, 1000);
      }
      setFlippedCells([]);
      setMoves(moves + 1);
    }
  }, [flippedCells, grid, moves, score]);

  return (
    <div className="App">
      <h1>Juego para la Memoria de Daniela</h1>
      <div className="grid">
        {grid.map((cell) => (
          <div
            key={cell.id}
            className={`cell ${cell.flipped ? "flipped" : ""} ${
              cell.matched ? "matched" : ""
            }`}
            onClick={() =>
              !cell.flipped && !cell.matched && handleCellClick(cell.id)
            }
          >
            {cell.flipped || cell.matched ? cell.number : ""}
          </div>
        ))}
      </div>
      <p className="stats">Movimientos: {moves}</p>
      <p className="stats">Puntuación: {score}</p> {/* Muestra la puntuación */}
    </div>
  );
};

export default App;
