<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    props: [
        'options',
        'questionId'
    ],
    components: {
    },
    data: function () {
        return {
            value: '',
            freeValue: undefined,
        }
    },
    computed: {},
    methods: {
        setValue(value) {
            let questionId = this.questionId;
            this.$emit('set-value', {value, questionId});
        },
    },
    watch: {
        value(newVal, oldVal) {
            if(newVal) {
                this.setValue(newVal);
            }
        }
    },
}
</script>


<template lang="pug">

.quiz-question__options

    .quiz-question-option(v-for="(option, index) in options" )
        input.quiz-question-option__input(
            name="'radioFree' + questionId" 
            type="radio" 
            :id="'radioFree' + index + questionId" 
            :value="option" 
            v-model="value")
        label.quiz-question-option__label.quiz-question-option__label_radio(
            :for="'radioFree' + index + questionId")
        .quiz-question-option__text {{ option }}

    .quiz-question-option.quiz-question-option_free
        .quiz-question-option__text Ваш вариант ответа
        input.quiz-question-option__input(
            name="'radioFree' + questionId" 
            type="radio" 
            :id="'radioFree' + 'free' + questionId" 
            :value="freeValue" 
            :disabled="!freeValue"
            v-model="value")
        label.quiz-question-option__label.quiz-question-option__label_radio(
            :for="'radioFree' + 'free' + questionId")
        input(type="text" v-model="freeValue")
</template>
