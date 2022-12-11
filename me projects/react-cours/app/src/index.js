import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./redux/redux-state"
import StoreContext from './StoreContext'



let root = ReactDOM.createRoot(document.getElementById('root'));


const renderDomElements = (state) => {
    
    root.render(
        <React.StrictMode>
            <StoreContext.Provider value={store}>
                <App />
            </StoreContext.Provider>
        </React.StrictMode>
    );

}

//addNewDialogMessage={store.addNewDialogMessage.bind(store)}

console.log(store)

renderDomElements(store.getState())

store.subscribe(() => {
    let state = store.getState()
    renderDomElements(state)
})

// Компоненты = тупые, в иделе важно что бы они были 
// максимально не зовисимы, простыми 
// словами что бы они не создовали 
// свой store что бы у них небыло логики ни какой