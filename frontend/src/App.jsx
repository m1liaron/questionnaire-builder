import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppPath } from "./common/enums/AppPath.js";
import {
	CreateQuizPage,
	HomePage,
	QuizPage,
	RunQuizPage,
	UpdateQuizPage,
} from "./pages/pages.js";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppPath.HomePage} element={<HomePage />} />
				<Route path={AppPath.QuizPage} element={<QuizPage />} />
				<Route path={AppPath.CreateQuiz} element={<CreateQuizPage />} />
				<Route path={AppPath.RunQuizPage} element={<RunQuizPage />} />
				<Route path={AppPath.UpdateQuizPage} element={<UpdateQuizPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
