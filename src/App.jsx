import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables
  const [weight, setWeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  // BMI calculation and message logic
  const calculateBmi = (e) => {
    e.preventDefault(); // Prevents form submission and page reload

    if (!weight || !heightFeet || !heightInches || isNaN(weight) || isNaN(heightFeet) || isNaN(heightInches)) {
      alert('Please enter valid weight and height');
    } else {
      const totalHeightInInches = parseFloat(heightFeet) * 12 + parseFloat(heightInches);
      const weightInKg = parseFloat(weight) * 0.453592; // Convert weight to kg
      const heightInMeters = totalHeightInInches * 0.0254; // Convert height to meters

      const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi.toFixed(1));

      if (calculatedBmi < 18.5) {
        setMessage('Underweight');
      } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
        setMessage('Normal weight');
      } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
        setMessage('Overweight');
      } else {
        setMessage('Obese');
      }
    }
  };

  // Reset fields
  const resetFields = () => {
    setWeight('');
    setHeightFeet('');
    setHeightInches('');
    setBmi('');
    setMessage('');
  };

  return (
    <div className="app">
      <div className="container">
        <h2>BMI CALCULATOR</h2>
        <form onSubmit={calculateBmi}>
          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter weight in kilograms"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Height (ft)</label>
            <input
              type="number"
              placeholder="Feet"
              value={heightFeet}
              onChange={(e) => setHeightFeet(e.target.value)}
            />
            <label>Inches</label>
            <input
              type="number"
              placeholder="Inches"
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button className="btn btn-primary" type="submit">
              Calculate
            </button>
            <button className="btn btn-secondary" type="button" onClick={resetFields}>
              Reset
            </button>
          </div>
          {bmi && (
            <div className="result">
              <h3>Your BMI: {bmi}</h3>
              <p>{message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
