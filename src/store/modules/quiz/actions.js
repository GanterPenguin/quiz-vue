"use strict";

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    let result = ""
    ca.forEach(item => {
        while (item.charAt(0) == ' ') {
            item = item.substring(1);
        }
        if (item.indexOf(name) == 0) {
            result = item.substring(name.length, item.length);
        }
    });
    return result;
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default {

    async initQuiz(context, params) {
        let link = `${context.rootState.apiData.quizzes.href}/${params.id}/questions?limit=1000`;
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
                let object = {};
                switch(params.answers[i].questionType) {
                    default:
                        object = await context.dispatch("formDefaultStatistic", { hasStatistics, index, statObject, answer});
                        break;
                }
                statistics[index] = object;
                statisticsObjects = statistics;
            }
        } else {
            for(let i = 0; i < params.answers.length; i++) {
                let answer = params.answers[i];
                let object = {};
                switch(params.answers[i].questionType) {
                    default:
                        object = await context.dispatch("formDefaultStatistic", { hasStatistics, index, statObject, answer});
                        break;
                }
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
            let cookie = getCookie("completedQuizzes");
            if(cookie) {
                let value = JSON.parse(cookie);
                value.push(params.id);
                setCookie("completedQuizzes", JSON.stringify(value), 200);
            } else {
                let value = [params.id];
                setCookie("completedQuizzes", JSON.stringify(value), 200);
            }
        } else {
            sf.alert([{ text: "Ошибка, повторите попытку позже.", type: 'err' }]);
        };
    },

};
