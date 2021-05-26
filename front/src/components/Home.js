import '../style/App.css';
import AppMenu from './Navbar.js'
import AppBody from './AppBody.js'

export default function Home() {
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
