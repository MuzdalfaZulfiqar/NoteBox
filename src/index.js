import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LandingPage from './Components/LandingPage';

import {
  BrowserRouter,
} from "react-router-dom"; 

function Main() {
  // we made a state to decide whether to show landing page or not 
  // at first marked as true so first landing page will show
  const [showLandingPage, setShowLandingPage] = React.useState(
    // we m
    () => {
      return localStorage.getItem('started') !== 'true';
    }
  );

  const startApp = () => {
    // we made the local storage attribute where first time user clicks the getItem returns false and it will be compared to true means overall true !== false ans = true so first time there was not started set to true in local storage then the landing page will show. User clicks on start now and startApp function gets called which means now app has started and local storage will also store started as true then state gets called there we will check is there any started attribute in local storage oo yes this time there is means true!== true oooo ans = false means this time the state will be set to false causiing app to render this time
    localStorage.setItem('started', 'true');
    setShowLandingPage(false);
  };

  return (
    <BrowserRouter>
    {/* if landing page state is true show the landing page and pass the function which will handle the setState as a prop now first true so landing page shows up we then go to landing page there everything is same but on click the function we passed here is being called when it calls it will rerender the index.js file here now setState will be false and this time the app component will be shown */}
      {showLandingPage ? (
        <LandingPage startApp={startApp} />
      ) : (
        <App />
      )}
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
);
