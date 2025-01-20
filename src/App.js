import './App.css';
import Ghibli from './Components/Ghibli';

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-t from-sky-50 to-blue-400">
      <div className=' w-11/12 mx-auto px-8 py-8'>
      <nav className='flex items-center justify-between'>
        <h1 className='text-white text-3xl font-bold'>Studio Ghibli Filmes:</h1>
      <img src="/assets/logo.png" className='h-32' alt='Logo Studio Ghibli'/>
      </nav>
      <main className='mt-6'>
      <Ghibli />
      </main>  
    </div>
    <footer>
        <img src="/assets/cat.png" className='h-40' alt='Jiji'></img>
      </footer>
    </div>
  );
}

export default App;
