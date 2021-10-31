import { useState } from 'react';
import './App.css';
import CancelOrder from './UI/CancelOrder';
import CarwashMenu from './UI/CarwashMenu';
import Navigationbar from './UI/Navigationbar';

function App() {
  const [orderCancellation, setOrderCancellation] = useState(false);

  return (
    <div className="App">
      <Navigationbar goHome={() => setOrderCancellation(false)} cancelOrder={() => setOrderCancellation(true)} />
      {orderCancellation ? <CancelOrder /> : <CarwashMenu />}
    </div>
  );
}

export default App;
