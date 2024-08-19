import React from 'react';

interface PlayerPairsProps {
  pairs: [string, string][];
}

const PlayerPairs: React.FC<PlayerPairsProps> = ({ pairs }) => {
  if (pairs.length === 0) {
    return <p>No matches found</p>;
  }

  return (
    <ul>
      {pairs.map((pair, index) => (
        <li key={index}>{pair[0]} - {pair[1]}</li>
      ))}
    </ul>
  );
};

export default PlayerPairs;
