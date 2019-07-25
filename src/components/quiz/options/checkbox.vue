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

    label(v-for="(option, index) in options" :for="'checkbox' + index") {{ option }}
        input(name="'checkbox' + questionId" type="checkbox" :id="'checkbox' + index" :value="option")

    label Ваш вариант ответа
        input(type="text")
</template>
