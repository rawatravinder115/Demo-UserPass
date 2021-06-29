import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";


const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state , action) =>{

  if(action.type === "USER_INPUT"){
    return {value: action.val, isValid: action.val.trim().length > 6};
  };

  if(action.type==="INPUT_BLUR"){
    return {value:state.value, isValid: state.value.trim().length > 6}
  };
  return{value :"", isValid: false};
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState,dispatchPassword] = useReducer(passwordReducer,{
    value:"",
    isValid: null
  }); 

  useEffect(() => {
    console.log("Effect Running ");

    return () => {
      console.log("Effect Cleanup");
    };
  }, []); /* runs before above func and empty array means run everytime when change occur*/

  const {isValid : emailIsValid} = emailState;   /* array destructoring */
  const {isValid : passwordIsValid} = passwordState;



  useEffect(() => {
    // console.log('checking a form validaion!');
    const identifier = setTimeout(() => {
      /* debouncing -> we are not something in every key stroke  */
      console.log("checking a form validity!");
      // setFormIsValid(
      //   enteredEmail.includes("@") && enteredPassword.trim().length > 6
      // );
      setFormIsValid(
         emailIsValid && passwordIsValid
        );
    }, 500);

    return () => {
      /* cleanup function not run on first time and after that run before above func*/
      console.log("CLEANUP");
      clearTimeout(
        identifier
      ); /* The clearTimeout() method clears a timer set with the setTimeout() method. */
    };
  }, [emailIsValid, passwordIsValid]);

  /************************************************************************ */

  //   setFormIsValid(
  //     enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //   );
  // }, [enteredEmail,enteredPassword]); /* anonymous func run when ever values of dependency array[]  changes */

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );

    /******************************************************** */

    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({type:"USER_INPUT",val:event.target.value});

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );

    /***************************************************** */

    // setFormIsValid(
    //   // emailState.value.trim().length > 6 && enteredEmail.includes('@');

    //   emailState.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes("@"));

    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPassword({type:"INPUT_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ""
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
