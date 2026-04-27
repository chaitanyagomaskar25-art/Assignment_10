import React, { useEffect, useState } from "react";
import useDebounced from "./UseDebounced";
import "./App.css"
const App = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
    const debouncing = useDebounced(search, 1000)

  const fetchData = async ()=>{
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${debouncing}&units=metric&appid=55140bef13c48664c68c05e193f57bf5`);
    if(!res.ok) throw new Error("Failed to load");

    const data = await res.json()
    setResult(data)
    } catch (err) {
      setError(err.message)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if (!debouncing) return;
    fetchData();
    document.title = debouncing

  },[debouncing])
  return (
    <div className="weather-container">
  <div className="weather-card">
    <h1>Weather App</h1>
    <p>Enter a city to get live updates</p>
    
    <input
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Type city name...."
    />

    <div className="result-display">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: '#fb0606d3', fontWeight:700 }}>{error}</p>}
      
      {!error && !loading && result && (
        <div key={result.id} className="result-container">
          <h2>{result.name}, {result.sys.country}</h2>
          <p className="temp">{Math.round(result.main?.temp)}°C</p>
          <p className="description">{result.weather?.[0]?.description}</p>
        </div>
      )}
    </div>
  </div>
</div>
  );
};

export default App;
