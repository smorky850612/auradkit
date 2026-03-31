import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LibraryPage } from './pages/LibraryPage';
import { BuilderPage } from './pages/BuilderPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[hsl(var(--background))]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LibraryPage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
