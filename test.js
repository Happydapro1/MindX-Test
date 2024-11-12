// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GithubAuthProvider, signOut} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRKCHfkl7mTCT57ClouiPXpMYpxF36KUc",
  authDomain: "web-intensive-mindx-2376a.firebaseapp.com",
  projectId: "web-intensive-mindx-2376a",
  storageBucket: "web-intensive-mindx-2376a.appspot.com",
  messagingSenderId: "1077960007030",
  appId: "1:1077960007030:web:6b65c4e335159eb6712e57",
  measurementId: "G-BLFS7QRV1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GithubAuthProvider();

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const buttonLoginGitHub = document.getElementById('login-github');

// Register Form
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;

    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error(errorMessage);
        });
    } else {
      console.log('Please fill in all required fields');
    }
  });
}

// Login Form
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user) {
            console.log(user);
            alert('Login successful');
          } else {
            alert('Login failed');
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } else {
      alert('Please fill in all required fields');
    }
  });
}

// Auth State Observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("No user is signed in.");
  }
});

if (buttonLoginGitHub) {
    buttonLoginGitHub.addEventListener('click', () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
    
          console.log('Signed in user:', user);
          console.log('User email:', user.email);
          console.log('User photo URL:', user.photoURL);
  
      
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error signing in with GitHub:', errorMessage);
  
        });
    });
  }

  const logoutButton = document.getElementById('sign-out');

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      signOut(auth)
        .then(() => {
          console.clear(); 
          console.log('User has logged out');
        })
        .catch((error) => {
          console.error('Error logging out:', error);
        });
    });
  }