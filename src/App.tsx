import { Navbar, Hero, UploadZone, CommunityFeed, Footer } from './components';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
      <Navbar />
      <main>
        <Hero />
        <UploadZone />
        <CommunityFeed />
      </main>
      <Footer />
    </div>
  );
}

export default App;
