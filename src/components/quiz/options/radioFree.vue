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
        }
    },
    methods: {
    },
    computed: {
    },
}
</script>


<template lang="pug">

form.quiz-question__options

    label(v-for="(option, index) in options" :for="'radioFree' + index + questionId") {{ option }}
        input(name="'radioFree' + questionId" type="radio" :id="'radioFree' + index + questionId" :value="option")

    label Ваш вариант ответа
        input(type="text")
</template>
