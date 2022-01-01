/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './index.css';
import App from './App';
import 设置 from './components/设置';
import 帮助 from './components/帮助';
import Nopage from './components/404';
import Game from './components/Game';
import {
  RecoilRoot,
} from 'recoil';



ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='game' element={<Game />}/>
      <Route path='set' element={<设置/>}/>
      <Route path='help' element={<帮助/>}/>
      <Route path='*' element={<Nopage/>}/>
    </Routes>
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

