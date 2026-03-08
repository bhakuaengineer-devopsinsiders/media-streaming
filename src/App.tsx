import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import VideoLibrary from './components/VideoLibrary';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <VideoLibrary /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
