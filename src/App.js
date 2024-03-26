import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthWrapper } from './auth/AuthWrapper';
// import { useEffect } from 'react';

function App() {

  // useEffect( () => 
  //             {
  //               () => {
  //                   if(sessionStorage.getItem())
  //               }
  //               // TODO:
  //               // When rerender occurs
  //               //  if UTC time < login expiry timestamp && a token is available in session, 
  //               // then re-attempt login on rerender using hte JwtToken
  //               // Else logout
  //             }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>      
    </div>
  );
}

export default App;
