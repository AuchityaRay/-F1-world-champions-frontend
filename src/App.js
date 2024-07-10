import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChampionList from './ChampionList';
import RaceWinners from './RaceWinners';

function App() {
  const [champions, setChampions] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [raceWinners, setRaceWinners] = useState([]);
  const [loadingChampions, setLoadingChampions] = useState(true);
  const [loadingRaceWinners, setLoadingRaceWinners] = useState(false);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/champions');
        setChampions(response.data);
      } catch (error) {
        console.error('Error fetching champions:', error);
      } finally {
        setLoadingChampions(false);
      }
    };
    fetchChampions();
  }, []);

  const handleYearClick = async (year) => {
    setSelectedYear(year);
    setLoadingRaceWinners(true);
    try {
      const response = await axios.get(`http://localhost:3001/races/${year}`);
      setRaceWinners(response.data);
    } catch (error) {
      console.error('Error fetching race winners:', error);
    } finally {
      setLoadingRaceWinners(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col space-y-3  max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-4">F1 World Champions (2005-2015)</h1>
      <ChampionList champions={champions} onYearClick={handleYearClick} loading={loadingChampions} />
     
      {selectedYear && <RaceWinners year={selectedYear} raceWinners={raceWinners} champions={champions} loading={loadingRaceWinners} />}
    </div>
  );
}

export default App;