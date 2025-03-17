const getQuiz = async () => {
    const response = await axios.get(`${apiUrl}/quizzes/${quizId}`);
    return response.data;
}

export { getQuiz };