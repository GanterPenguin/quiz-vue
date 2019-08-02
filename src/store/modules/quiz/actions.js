"use strict";

export default {

    async initQuiz(context, params) {
        let link = `${context.rootState.apiData.quizzes.href}/${params.id}/questions`;
        let response = await fetch(link);
        if(!response.ok) {
            throw new Error("Connection error");
        }
        let questionsData = await response.json();

        let quizLink = `${context.rootState.apiData.quizzes.href}/${params.id}/`;
        let quizResponse = await fetch(quizLink);
        if(!response.ok) {
            throw new Error("Connection error");
        }
        let quizData = await quizResponse.json();

        context.commit("initQuiz", { questionsData, quizData});
    }, 
    formDefaultStatistic(context, params) {
        if(params.hasStatistics) {

            if(params.index !== -1) {

                let isValueArray = Array.isArray(params.answer.value);
                if(isValueArray) {
                    params.answer.value.forEach(option => {
                        let optionIndex = params.statObject.options.findIndex(statOption => statOption.text === option);
                        if(optionIndex !== -1) {
                            params.statObject.options[optionIndex].count++;
                        } else {
                            let object = {
                                text: option,
                                count: 1,
                            };
                            params.statObject.options.push(object);
                        }
                    });
                } else {
                    let optionIndex = params.statObject.options.findIndex(statOption => statOption.text === params.answer.value);
                    if(optionIndex !== -1) {
                        params.statObject.options[optionIndex].count++;
                    } else {
                        let object = {
                            text: params.answer.value,
                            count: 1,
                        };
                        params.statObject.options.push(object);
                    }
                }
                return params.statObject;
            }

        } else {

            let object = {};
            object.questionId = params.answer.questionId;
            object.type = params.answer.questionType;
            object.options = [];

            let isValueArray = Array.isArray(params.answer.value);
            if(isValueArray) {
                params.answer.value.forEach(item => {
                    object.options.push({text: item , count: 1});
                });
            } else {
                let value = params.answer.value;
                object.options = [{text: value, count: 1}];
            }

            return object;
        }
    },
    async send(context, params) {
        let patch = [];
        let statisticsObjects = [];
        let link = `${context.rootState.apiData.quizzes.href}/${params.id}/response`;
        let response = await fetch(link);
        if(!response.ok) {
            throw new Error("Connection error");
        };
        response = await response.json();

        let hasStatistics = false;
        if(response._embedded) {
            hasStatistics = response._embedded.hasOwnProperty('statistics');
        }
        if(hasStatistics) {
            let statistics = response._embedded.statistics;
            for(let i = 0; i < params.answers.length; i++) {
                let index = statistics.findIndex(item => item.questionId === params.answers[i].questionId);
                let statObject = statistics[index];
                let answer = params.answers[i];
                let object = await context.dispatch("formDefaultStatistic", { hasStatistics, index, statObject, answer});
                statistics[index] = object;
                statisticsObjects = statistics;
            }
        } else {
            for(let i = 0; i < params.answers.length; i++) {
                let answer = params.answers[i];
                let object = await context.dispatch("formDefaultStatistic", { hasStatistics, answer});
                statisticsObjects.push(object);
            }
        }

        let body = {
            op: "add",
            path: "/statistics",
            value: statisticsObjects,
        };
        patch.push(body);
        console.log(patch);

        let result = await fetch(link, {
            method: "PATCH",
            body: JSON.stringify(patch),
        });

        if(result.ok) {
            sf.alert([{text: "Сохранено", type: "ok"}]);
        } else {
            sf.alert([{ text: "Ошибка, повторите попытку позже.", type: 'err' }]);
        };
    },

};
