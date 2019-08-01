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

    h2.quizzes__title Опросы

    .quizzes__wrapper

        router-link.quizzes__quiz(v-for="quiz in quizzes" :to="{ path: 'quiz/' + quiz.id }" v-bind:key="quiz.id") {{ quiz.title }}

</template>
