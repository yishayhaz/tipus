import Navigator from "./Navigator";
import './App.css';
import Header from './Components/Header';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className={'app-container'}>
        <Navigator />
      </div>
    </BrowserRouter>
  )
}

export default App;
