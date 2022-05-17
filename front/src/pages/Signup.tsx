// import React from "react";
// import axios from "axios";
// import {TextField, Checkbox, Button, FormControlLabel} from '@mui/material'

// function LoginTrigger() {
//   function socialLogin() {
//     axios.post("localhos:8000/api/v1/auth/singup", {}).then((response) => {});
//   }
//   return (
//     <div>
//       <button onClick={socialLogin}>소셜로그인</button>
//     </div>
//   );
// }

// function Signup() {
//   return (
//     <div>
//       <h1>Singup</h1>
//       <LoginTrigger></LoginTrigger>
//       <TextField label="Email Address" name="email" required autoComplete="email" autoFocus/>
//       <TextField label="Password" type="password" name="password" required />
//       <FormControlLabel
//         control={<Checkbox value="remember"
//         color="primary" />}
//         label="Remember me"
//       />
//       <TextField label="Password Confirm" type="password" name="passwordConfirm" required />
//       <Button type="submit" variant="contained" sx={{mt:3}}>Sign in</Button>
//     </div>
//   );
// }

// export default Signup;

import SignupForm from "../components/Accounts/SignupForm";
import BackgroundImage from "../components/BackgroundImage";
import Navbar from "../components/Navbar";

function Signup() {
  return (
    <>
      <BackgroundImage></BackgroundImage>
      <Navbar></Navbar>
      <SignupForm />
    </>
  );
}
export default Signup;
