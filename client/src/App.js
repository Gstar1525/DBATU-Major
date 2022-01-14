import { useEffect, useState } from 'react';
import { fetchData } from "./api"
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async () => {
      const json = await fetchData();
      setMessage(json.message);
    })();
  }, [])

  return (
    <div class="text">{message}</div>
  );
}

export default App;
