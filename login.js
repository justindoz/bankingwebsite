// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3tkEkrKDCJfJMJW6xJ1EYmGyyU09p0U8",
  authDomain: "capstonelogin-dd991.firebaseapp.com",
  projectId: "capstonelogin-dd991",
  storageBucket: "capstonelogin-dd991.appspot.com",
  messagingSenderId: "35562999618",
  appId: "1:35562999618:web:4b0d0a1392c80f60ffc2db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get elements
const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('login');
const signup = document.getElementById('signup');
const logout = document.getElementById('logout');


// login
  login.addEventListener('click', e => {
    const auth = firebase.auth();
    const promise = auth.SignInWithEmailAndPassword(email.value, password.value);
    promise.catch(e=> console.log(e.message));
  });

// signup
signup.addEventListener('click', e => {
      // TODO check for real email:
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
      promise.catch(e =>console.log(e.message));
    
});

  // logout
  logout.addEventListener('click', e => {
    firebase.auth().signOut();
});

  //login state
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      logout.style.display = 'inline';
      login.style.display = 'none';
      signup.style.display = 'none';
    }
    else{
      console.log('User is not logged in');
      logout.style.display = 'none';
      login.style.display  = 'inline';
      signup.style.display = 'inline';
    }
  });

function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-dark" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext);  

  function handle(){
    const user = ctx.users.find((user) => user.email == email);
    console.log(user);
    console.log(email, password);
    if (!user) {
      console.log('one')      
      props.setStatus('Please enter correct credentials.')      
      return;      
    }
    if (user.password == password) {
      console.log('two')            
      props.setStatus('');
      props.setShow(false);
      return;      
    }
    console.log('three')          
    props.setStatus('Please enter correct credentials.');        
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-dark" onClick={handle}>Login</button>
   
  </>);
}
