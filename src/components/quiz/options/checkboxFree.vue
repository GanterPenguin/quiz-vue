<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    props: [
        'options',
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

    label(v-for="(option, index) in options" :for="'checkboxFree' + index") {{ option }}
        input(name="'checkboxFree' + questionId" type="checkbox" :id="'checkboxFree' + index" :value="option")

    label Ваш вариант ответа
        input(type="text")
</template>
