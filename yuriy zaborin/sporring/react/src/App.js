import React, {useContext} from 'react';
import {BrowserRouter} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import './css/App.css'
import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/Loader/Loader";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
    const {auth} = useContext(Context)
    const [user, loading, error] = useAuthState(auth)

    if (loading) {
        return <Loader/>
    }

    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
