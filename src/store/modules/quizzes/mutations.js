"use strict";

export default {

    initQuizzes(state, data) {
        state.quizzesLinks = data._links,
        state.quizzes = data._embedded.items,
        state.initialized = true;
    },
};
