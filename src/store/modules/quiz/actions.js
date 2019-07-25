"use strict";

export default {

    async initQuiz(context, params) {
        let link = `${context.rootState.apiData.quizzes.href}/${params.id}/questions`;
        let response = await fetch(link);
        if(!response.ok) {
            throw new Error("Connection error");
        }

        let data = await response.json();

        context.commit("initQuiz", data);

    }
};
