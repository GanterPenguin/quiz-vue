"use strict";

export default {

    async initQuizzes(context, params) {
        let link = context.rootState.apiData.quizzes.href;
        let response = await fetch(link);
        if(!response.ok) {
            throw new Error("Connection error");
        }

        let data = await response.json();

        context.commit("initQuizzes", data);

    }
};
