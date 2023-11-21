import { Route } from "react-router-dom";
import Home from "./pages/homePage/home";
import Chat from "./pages/chatPage/chat";
import Material from "./pages/materialPage/material";
import MaterilaDetail from "./pages/materialPage/material_detail/materilaDetail";
import Login from "./pages/loginPage/login";
import Header from "./components/header/header";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContextProvider } from "./contexts/authContext";
import Schedule from "./pages/schedulePage/schedule";
import Project from "./pages/projectPage/project";
import ProjectDetail from "./pages/projectPage/projectDetail/projectDetail";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/materials" exact>
          <Material />
        </Route>
        <Route path="/materials/:materialId/:materialType">
          <MaterilaDetail />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
        <Route path="/projects" exat>
          <Project />
        </Route>
        <Route path="/project/:projectId" exat>
          <ProjectDetail />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </AuthContextProvider>
    </>
  );
}

export default App;
