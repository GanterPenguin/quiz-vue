"use strict";

export default {
    initQuiz(state, data) {
        state.questions = data.questionsData._embedded.items;
        state.questionsLinks = data.questionsData._links;
        state.quiz = data.quizData;
        state.initialized = true;
    }
};
