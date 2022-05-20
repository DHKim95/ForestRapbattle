import { useRoutes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Game from "./pages/Game";
import Rank from "./pages/Rank";
import Profile from "./pages/Profile";

function Router() {
  return useRoutes([
    {
      path: "",
      element: <Main />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "signup",
      element: <Signup />
    },
    {
      path: "game",
      element: <Game />
    },
    {
      path: "profile/:userId",
      element: <Profile />
    },
    {
      path: "rank",
      element: <Rank />
    },
  ])
}

export default Router;
