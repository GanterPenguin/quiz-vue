<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    data: function () {
        return {
        }
    },
    methods: {
        ...mapActions('quiz', [
            'initQuiz',
        ]),
    },
    computed: {
        ...mapState('quiz', {
            quiz: state => state.quiz,
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

.quiz(v-if="quiz")

    router-link.quiz__back(:to="{ path: '/' }") Вернуться к опросам

    h2.quiz__title {{ quiz.title }}

    .quiz__wrapper

</template>
