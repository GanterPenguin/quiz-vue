"use strict";

export default {
    initQuiz(state, data) {
        state.questions = data._embedded.items;
        state.questionsLinks = data._links;
        state.initialized = true;
    }
};
