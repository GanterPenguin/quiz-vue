<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import TextQuestion from './questions/textQuestion';
//import Radio from './options/radio';
//import Checkbox from './options/checkbox';
//import RadioFree from './options/radioFree';
//import CheckboxFree from './options/checkboxFree';

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

.quiz

    .quiz__title

    .quiz__wrapper

        .quiz__questions(v-if="questions")

            component(v-for="question in questions" :key="question.id" :is="questionType(question._embedded.content.type)" :question="question" v-on:set-value="setValue")

    input(type="submit" value="Отправить" @click="send({id, answers})").quiz__submit

</template>
