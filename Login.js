import React from "react";
import "./Login.css";
import Button from '@mui/material/Button';
import Logo from "./whatsapp-logo.jpg";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";
import { auth } from "./firebase";
import { provider } from "./firebase";
import db from "./firebase";



function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        console.log(result.user.email);
        var docRef = db.collection("users").doc(result.user.email);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
            } else {
              db.collection("users").doc(result.user.email).set({
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user?.photoURL,
              });
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      })
      .catch((error) => alert(error.message));
  };



   

  return (
    <div className="login">
      <div className="login__container">
        <img
            src={Logo}
            alt=""
        />
        <div className="login__text">
        <h1>Sign in to WhatsApp</h1>
        </div>
         
        <Button type= "submit" onClick={signIn}>Sign In With Google</Button>

      </div>
    </div>
  );
}

export default Login;