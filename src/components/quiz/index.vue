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
        this.initQuiz({ id: this.id });
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

        input(type="submit" value="Отправить" @click="send({id, answers})").quiz__submit

</template>
