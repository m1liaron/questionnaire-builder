import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import { AppPath } from "./common/enums/AppPath.js";
import {HomePage} from "./pages/HomePage/HomePage.jsx";
import {QuizPage} from "./pages/QuizPage/QuizPage.jsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={AppPath.HomePage} element={<HomePage/>}/>
            <Route path={AppPath.QuizPage} element={<QuizPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
