import '../style/App.css';
import AppMenu from './Navbar.js'

function PrivatePage() {
    return (
        <div className="App">
            <header className="App-header">
                <AppMenu />
            </header>
            <main className="App-body">
                <h1>Hello this is a private page</h1>
            </main>
            <footer className="App-footer">

            </footer>
        </div>
    );
}

export default PrivatePage;