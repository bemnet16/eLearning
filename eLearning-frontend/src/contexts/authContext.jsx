import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const intialState = {
  token: null,
  user: null,
};

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      token: action.data.token,
      user: action.data.student,
    };
  } else if (action.type === "LOGOUT") {
    return {
      token: null,
      user: null,
    };
  }
};

export const AuthContextProvider = (props) => {
  const [authState, dispathAuth] = useReducer(authReducer, intialState);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    if (user) handleLogin({ token: userData.token, student: userData.user });
  }, []);

  const handleLogin = (user) => {
    dispathAuth({ type: "LOGIN", data: user });
    localStorage.setItem(
      "user",
      JSON.stringify({ token: user.token, user: user.student })
    );
  };

  const handleLogout = () => {
    dispathAuth({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ authState, handleLogin, handleLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
