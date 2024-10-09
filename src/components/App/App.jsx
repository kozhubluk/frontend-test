import './App.module.css';
import Header from '../Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Quote from '../Quote/Quote';
import Wiki from '../Wiki/Wiki';
import TodoList from '../TodoList/TodoList';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Quote />}></Route>
          <Route path="/wiki" element={<Wiki />}></Route>
          <Route path="/todo" element={<TodoList />}></Route>
          <Route path="*" element={<div>Не найдено</div>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
