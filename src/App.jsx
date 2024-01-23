import './App.css'
import AppRoutes from './routes/AppRoutes'
import { SoundProvider } from './context/soundContext'
import { UserProvider } from './context/userContext'


function App() {
  return (
    <div>
      <UserProvider>
        <SoundProvider>
          <AppRoutes />
        </SoundProvider>
      </UserProvider>
    </div>
  )
}

export default App
