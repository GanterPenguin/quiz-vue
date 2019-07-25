<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    components: {
    },
    data: function () {
        return {
        }
    },
    methods: {
        ...mapActions('quizzes', [
            'initQuizzes',
        ]),
    },
    computed: {
        ...mapState('quizzes',{
            quizzes: state => state.quizzes,
        }),
    },
    created() {
        this.initQuizzes();
    },
}
</script>


<template lang="pug">

.quizzes(v-if="quizzes")

    .quizzes__title Опросы

    .quizzes__quiz(v-for="quiz in quizzes" v-bind:key="quiz.id")

        router-link(:to="{ path: 'quiz/' + quiz.id }").quizzes__quiz-title {{ quiz.title }}

</template>
