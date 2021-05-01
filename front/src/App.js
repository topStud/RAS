import './style/App.css';
import AppMenu from './components/Navbar.js'
import AppBody from './components/AppBody.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppMenu />
      </header>
      <main className="App-body">
        <AppBody />
      </main>
      <footer className="App-footer">

      </footer>
    </div>
  );
}

export default App;
