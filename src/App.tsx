import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Norris } from './interfaces/norris';

const btnStyling = {
  padding: '1rem',
  marginRight: '0.5rem',
  width: '90px',
  borderRadius: '10px',
  border: 'solid 1px',
  cursor: 'pointer',
};

const chuckNorrisAPI = 'https://api.chucknorris.io/jokes/random';

function App() {
  const [counter, setCounter] = React.useState(0);
  const [joke, setJoke] = React.useState<Norris | null>(null);

  const handleIncrement = () => {
    setCounter(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCounter(prevCount => prevCount - 1);
  };

  React.useEffect(() => {
    const fetchJoke = async () => {
      const res = await fetch(chuckNorrisAPI);
      const randomJoke = await res.json();

      setJoke(randomJoke);
    };

    fetchJoke();
  }, []);

  const showJoke = () => {
    if (!joke) return <p>Loading...</p>;

    return (
      <div>
        <img src={joke.icon_url} alt='' />
        <h3>{joke.value}</h3>
      </div>
    );
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <h1>Click Counter</h1>
      <button style={btnStyling} onClick={handleIncrement}>
        +
      </button>
      <button style={btnStyling} onClick={() => setCounter(0)}>
        Reset
      </button>
      <button style={btnStyling} onClick={handleDecrement}>
        -
      </button>
      <div>
        <h1>{counter}</h1>
      </div>
      <div>{showJoke()}</div>
    </div>
  );
}

export default App;
