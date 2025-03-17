const createQuizValidateMiddleware = (req, res, next) => {
    const { quiz } = req.body;

    if (!quiz) {
        return res.status(400).json({ error: true, message: "Missing quiz object in request body." });
    }

    // Validate quiz name and description
    if (!quiz.name || typeof quiz.name !== "string" || !quiz.name.trim()) {
        return res.status(400).json({ error: true, message: "Quiz name is required and must be a non-empty string." });
    }

    if (!quiz.description || typeof quiz.description !== "string" || !quiz.description.trim()) {
        return res.status(400).json({ error: true, message: "Quiz description is required and must be a non-empty string." });
    }

    // Validate questions array
    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        return res.status(400).json({ error: true, message: "At least one question is required." });
    }

    const allowedTypes = ["Text", "Single Choice", "Multiple Choices"];

    for (let i = 0; i < quiz.questions.length; i++) {
        const question = quiz.questions[i];

        if (!question.text || typeof question.text !== "string" || !question.text.trim()) {
            return res.status(400).json({
                error: true,
                message: `Question ${i + 1} must have a non-empty text value.`,
            });
        }

        if (!question.type || !allowedTypes.includes(question.type)) {
            return res.status(400).json({
                error: true,
                message: `Question ${i + 1} type must be one of: ${allowedTypes.join(", ")}.`,
            });
        }

        // If the question type is not "Text", ensure there are answers.
        if (question.type !== "Text") {
            if (!Array.isArray(question.answers) || question.answers.length < 2) {
                return res.status(400).json({
                    error: true,
                    message: `Question ${i + 1} of type "${question.type}" must have at least 2 answers.`,
                });
            }
        }

        // Validate answers (if provided)
        if (Array.isArray(question.answers)) {
            for (let j = 0; j < question.answers.length; j++) {
                const answer = question.answers[j];

                if (!answer.answer || typeof answer.answer !== "string" || !answer.answer.trim()) {
                    return res.status(400).json({
                        error: true,
                        message: `Answer ${j + 1} for question ${i + 1} must have a non-empty answer text.`,
                    });
                }

                if (typeof answer.isCorrect !== "boolean") {
                    return res.status(400).json({
                        error: true,
                        message: `Answer ${j + 1} for question ${i + 1} must have a boolean value for isCorrect.`,
                    });
                }
            }
        }
    }

    // If all validations pass, continue to the next middleware/controller.
    next();
};

export { createQuizValidateMiddleware };
