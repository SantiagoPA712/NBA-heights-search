import { useState, useEffect } from 'react';

interface Player {
  first_name: string;
  h_in: string;
  last_name: string;
}

export const useFetchPlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://mach-eight.uc.r.appspot.com/')
      .then(response => response.json())
      .then(data => setPlayers(data.values))
      .catch(err => setError('Failed to fetch player data'));
  }, []);

  return { players, error };
};
