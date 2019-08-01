<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Radio from '../options/radio';
import Checkbox from '../options/checkbox';
import RadioFree from '../options/radioFree';
import CheckboxFree from '../options/checkboxFree';

export default {

    props: [
        "question"
    ],
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

        setValue(value) {
            value.questionType = this.question._embedded.response.type;
            this.$emit('set-value', value);
        },

    },
    computed: {
    },
}
</script>


<template lang="pug">

.quiz-question

    .quiz-question__text {{ question._embedded.content.text }}

    component(:is="optionsType(question._embedded.response.type)" :questionId="question.id"  :options="question._embedded.response.options" v-on:set-value="setValue")

</template>
