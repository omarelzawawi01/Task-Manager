import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { login } from "../util/http";
import { useState, useContext } from "react";
import { Alert } from "react-native";
import { ExpensesContext } from "../store/tasks-context";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/redux/slices.js";
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  // const expensesCtx = useContext(ExpensesContext);
  const dispatch = useDispatch();
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      // expensesCtx.authenticate(token,email);
      dispatch(authenticate({token:token,email:email}));
      // expensesCtx.isAuthenticated=true;
      // console.log(expensesCtx);
      // console.log(expensesCtx.token);
      setIsAuthenticating(false);
    } catch (error) {
      Alert.alert(
        "Login failed",
        "Please check your credentials and try again."
        );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
  // return <AuthContent isLogin />;
}

export default LoginScreen;
