<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    props: [
        'options',
        'questionId',
    ],
    components: {
    },
    data: function () {
        return {
            value: [],
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
            name="'checkbox' + questionId" 
            type="checkbox" :id="'checkbox' + index + questionId" 
            :value="option" 
            v-model="value")
        label.quiz-question-option__label(
            :for="'checkbox' + index + questionId")
        .quiz-question-option__text {{ option }}

</template>
