// import React from "react";
// import axios from "axios";

// function LoginTrigger() {
//   function socialLogin() {
//     axios.post("localhos:8000/api/v1/auth/singup", {})
//       .then((response) => { });
//   }
//   return (
//     <div>
//       <button onClick={socialLogin}>소셜로그인</button>
//     </div>
//   );
// }

// function Login() {
//   return (
//     <div>
//       <h1>Login</h1>
//       <LoginTrigger></LoginTrigger>
//     </div>
//   );
// }
// export default Login;
import LoginForm from "../components/Accounts/LoginFrom";
import BackgroundImage from "../components/BackgroundImage";

function Login() {
  return (
    <>
      <BackgroundImage></BackgroundImage>
      <LoginForm></LoginForm>
    </>
  );
}
export default Login;
