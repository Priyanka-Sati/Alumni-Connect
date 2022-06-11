import "./App.css";
import Signup from "./Components/SignUp/Signup";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Connections from "./Components/Connections/Connections";
import Profile from "./Components/ProfilePage/Profile";
import ProfileForm from "./ProfileForm/ProfileForm";
import MyPost from "./Components/MyPost/MyPost";
import Chat from "./Components/Chat/Chat";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* <Signup /> */}
          <Route path="/" exact>
            <Signup />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/connections">
            <Connections />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/profileform">
            <ProfileForm />
          </Route>
          <Route path="/myPost">
            <MyPost />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
