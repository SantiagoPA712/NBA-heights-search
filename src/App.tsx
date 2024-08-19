import React, { useState } from 'react';
import { useFetchPlayers } from './useFetchPlayers';
import PlayerPairs from './PlayerPairs';

const App: React.FC = () => {
  const [targetHeight, setTargetHeight] = useState<number | null>(null);
  const [pairs, setPairs] = useState<[string, string][]>([]);
  const { players, error } = useFetchPlayers();

  const handleSearch = () => {
    if (!targetHeight || players.length === 0) return;

    const playerMap: Record<number, string[]> = {};
    const result: [string, string][] = [];

    players.forEach(player => {
      const height = parseInt(player.h_in, 10);
      const complement = targetHeight - height;

      if (playerMap[complement]) {
        playerMap[complement].forEach(complementaryPlayer => {
          result.push([`${player.first_name} ${player.last_name}`, complementaryPlayer]);
        });
      }

      if (!playerMap[height]) {
        playerMap[height] = [];
      }
      playerMap[height].push(`${player.first_name} ${player.last_name}`);
    });

    setPairs(result.length > 0 ? result : []);
  };

  return (
    <div>
      <img src="https://source.boomplaymusic.com/group10/M00/04/09/54e0324b123d4c7ca13f132b7ac792da_464_464.jpg" alt="You are my sunshine" style={{ width: '200px', marginBottom: '20px' }} />
      <h1>NBA Player Height Pair Finder</h1>
      <input
        type="number"
        placeholder="Enter target height in inches"
        onChange={(e) => setTargetHeight(parseInt(e.target.value))}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <PlayerPairs pairs={pairs} />
    </div>
  );
};

export default App;
