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
    }, 
    async send(context, params) {
        let link = `${context.rootState.apiData.quizzes.href}/${params.id}/response`;
        let response = await fetch(link);
        if(!response.ok) {
            throw new Error("Connection error");
        };
        response = await response.json();
        let hasStatistics = response.hasOwnProperty('statistics');
        if(hasStatistics) {

        } else {
            let patch = [];
            if(params.answers.length > 0) {

                let statisticsObjects = [];

                params.answers.forEach(answer => {
                    let object = {};
                    object.questionId = answer.questionId;
                    object.type = answer.questionType;
                    object.options = [];

                    let isValueArray = Array.isArray(answer.value);
                    if(isValueArray) {
                        answer.value.forEach(item => {
                            object.options.push({text: item , count: 1});
                        });
                    } else {
                        let value = answer.value;
                        object.options = [{text: value, count: 1}];
                    }

                    statisticsObjects.push(object);
                });
                let body = {
                    op: "add",
                    path: "/statistics",
                    value: statisticsObjects,
                };

                let response = await fetch(link, {
                    method: "PATCH",
                    body: JSON.stringify(body),
                });

                let result = await response.json();

                console.log(result);

                if(response.ok) {
                    sf.alert([{text: "Сохранено", type: "ok"}]);
                } else {
                    sf.alert([{ text: "Ошибка, повторите попытку позже.", type: 'err' }]);
                };
            }
        }

    }
};
