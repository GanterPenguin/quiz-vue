<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import TextQuestion from './questions/textQuestion';

export default {

    components: {
        'text-question': TextQuestion,
    },
    data: function () {
        return {
            answers: [],
        }
    },
    methods: {
        ...mapActions('quiz', [
            'initQuiz',
            'send'
        ]),
        getCookie(cname) {
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
        },
        questionType(type) {
            switch(type) {
                case 'text':
                    return 'text-question';
                default:
                    return 'text-question';
            };
        },
        setValue(value) {
            if(this.answers.length > 0) {
                let index = this.answers.findIndex(answer => answer.questionId === value.questionId);
                if(index !== -1) {
                    this.answers[index].value = value.value;
                } else {
                    this.answers.push(value);
                }
            } else {
                this.answers.push(value);
            }
        },
        sendQuiz(data) {
            if(this.isQuizCompleted) {
                this.send(data);
                this.$router.push({path: `/statistics/${this.id}`});
            } else {
                sf.alert([{ text: "Пожалуйста ответье на все вопросы.", type: 'err' }]);
            }
        },
    },
    computed: {
        ...mapState('quiz', {
            questions: state => state.questions,
            quiz: state => state.quiz,
        }),
        id() {
            return this.$route.params.id;
        },
        isQuizCompleted() {
            return this.questions.length === this.answers.length ? true : false;
        },
    },
    created() {
        let cookie = this.getCookie("completedQuizzes");
        if(cookie) {
            let value = JSON.parse(cookie);
            let index = value.find(item => item === this.id);
            if(index) {
                this.$router.push({path: `/statistics/${this.id}`});
            } else {
                this.initQuiz({ id: this.id });
            }
        }
    },
}
</script>

<template lang="pug">

.quiz(v-if="quiz")

    router-link.quiz__back(:to="{ path: '/' }") Вернуться к опросам

    h2.quiz__title {{ quiz.title }}

    .quiz__wrapper

        .quiz__questions(v-if="questions")

            component(v-for="question in questions" :key="question.id" :is="questionType(question._embedded.content.type)" :question="question" v-on:set-value="setValue")

        input(type="submit" value="Отправить" @click="sendQuiz({id, answers})").quiz__submit

</template>
