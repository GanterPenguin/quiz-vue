<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Radio from './options/radio';
import Checkbox from './options/checkbox';
import RadioFree from './options/radioFree';
import CheckboxFree from './options/checkboxFree';

export default {

    components: {
        'radio-component': Radio,
        'checkbox-component': Checkbox,
        'radio-free': RadioFree,
        'checkbox-free': CheckboxFree,
    },
    data: function () {
        return {
        }
    },
    methods: {
        ...mapActions('quiz', [
            'initQuiz',
        ]),
        optionsType(type) {
            switch(type) {
                case 'radio':
                    return 'radio-component';
                case 'checkbox':
                    return 'checkbox-component';
                case 'radioFree':
                    return 'radio-free';
                case 'checkboxFree':
                    return 'checkbox-free';
                default:
                    return 'radio';
            };
        },
    },
    computed: {
        ...mapState('quiz', {
            questions: state => state.questions,
        }),
        id() {
            return this.$route.params.id;
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

        .quiz__questions(v-if="questions")

            .quiz-question(v-for="question in questions")

                .quiz-question__text {{ question._embedded.content.text }}

                    component(:is="optionsType(question._embedded.response.type)" :questionId="question.id" :options="question._embedded.response.options")

</template>
