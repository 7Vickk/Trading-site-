import { useStore } from './store/useStore';
import { useSocket } from './hooks/useSocket';
import LoginPage from './components/LoginPage';
import OTPPage from './components/OTPPage';
import Dashboard from './components/Dashboard';
import NotificationToasts from './components/NotificationToasts';

export default function App() {
  useSocket();
  const view = useStore(s => s.view);

  return (
    <div className="min-h-screen bg-bg-primary">
      {view === 'login' && <LoginPage />}
      {view === 'otp' && <OTPPage />}
      {view === 'dashboard' && <Dashboard />}
      <NotificationToasts />
    </div>
  );
}
