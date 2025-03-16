import {
    Route,
    Routes
} from "react-router-dom";
import { AppPath } from "./common/enums/AppPath.js";
import { HomePage, QuizPage } from "./pages/pages.js";

function App() {
  return (
    <Routes>
        <Route path={AppPath.HomePage} element={HomePage}/>
        <Route path={AppPath.QuizPage} element={QuizPage}/>
    </Routes>
  )
}

export default App
