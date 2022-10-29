import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const CheckUserName = (username) => {
  return axios
  .get(`https://hxj1tck8l1.execute-api.us-east-1.amazonaws.com/default/users/taken?username=${username}`)
  .then((response) => response)
}

function App() {
  const [username, setUserName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let clearMessageTimeOut;
    if(username.length >= 4) {
      CheckUserName(username).then((response) => {
        const { data } = response;
        if(data !== null && typeof data === 'object' && !Array.isArray(data)){
          if(!data.taken){
            setMessage("Great !! your username is unique.")
            clearMessageTimeOut = setTimeout(() => {
              setMessage('');
            }, 4000);
          } else {
            setMessage("Oops !! your username isn't unique.")
          }
        } else {
          console.error("Invalid JSON");
          setMessage('Something went wrong !! Try later')
        }
      })
      .catch(error => {
        console.error(error);
        setMessage('Something went wrong !! Try later')
      }) 
    } else if(username.length > 0 && username.length < 4) {
      setMessage("Username must be atleast 4 characters long")
    } else {
      setMessage('');
    }

    return () => clearTimeout(clearMessageTimeOut);
  }, [username]);

  return (
    <div className="App">
      <input id='userName' type='text' name='username' value={username} placeholder='Enter Username' onChange={(event) => setUserName(event.target.value)}/> 
      <p className='message'>{message}</p>
    </div>
  );
}

export default App;
