import React, { useState } from "react";
import "./App.css";
import {
  HashRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import {Main} from "./Pages/Main/Main";
import { About } from "./Pages/Home/About";
import { Page404 } from "./Pages/404/Page404";
import { InfoRoom } from "./Pages/InfoRoom/InfoRoom";

function App() {
  let location = useLocation();
  const [showAbout,setShowAbout] = useState(false)
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth"))
  );
  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };


  return (
    <HashRouter>
      <div className='container'>
        <Redirect
          to={{
            pathname: "/room-management",
            state: { from: location },
          }}
        />
        <Header />
        <Switch>
        <Route path="/home" exact={true}>
          <About />
        </Route>
        <PrivateRoute path="/room-management">
          <Main />
        </PrivateRoute>
        </Switch>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
