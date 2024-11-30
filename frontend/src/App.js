import './App.css';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { action} from "./actions";
import { MQTTProvider } from './config/MQTTContext';


function App() {
  useEffect(() => {
    document.title = 'Minnie\'s Smart Home';
  }, [])
  return(
    <MQTTProvider>
      {useRoutes(action)}
    </MQTTProvider>
  );
}

export default App;
