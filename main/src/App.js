/* eslint-disable react/jsx-pascal-case */
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
  return (
      <div className="App">
        <div className='abut' onClick={()=>{navigate('/game')}}>开始游戏</div>
        <div className='abut' onClick={()=>{navigate('/set')}}>设置</div>
        <div className='abut' onClick={()=>{navigate('/help')}}>帮助</div>
      </div>
    
  );
}

export default App;
