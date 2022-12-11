import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom"

import Header from "./component/Header/Header"
import PostsContainer from "./component/Posts/PostContainer"
import DialogsContainer from "./component/Dialogs/DialogsContainer"
import HomeContainer from "./component/Home/HomeContainer"

import "./component/Dialogs/Dialogs.css"

function App(props) {

  return (

    <BrowserRouter>
        <div className="wrapper">
        
            <Header />
            <Routes>
                  <Route path="/posts/" element={<PostsContainer />}/>
                  <Route path="/" element={<HomeContainer />}/>
                  <Route path="/dialogs/*" element={<DialogsContainer />}/>
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
