import styled from "styled-components";
import { Route, Switch } from "react-router";
import Login from "./Pages/Signup";
import Signup from "./Pages/Login";
import ConfirmPass from "./Pages/ConfirmPass";
import Home from "./Pages/Home";


function App() {
  return (
    <Container>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/confirmPassword" component={ConfirmPass} />
        <Route path="/home" component={Home} />
      </Switch>
    </Container>
  );
}

export default App;

const Container = styled.div``;