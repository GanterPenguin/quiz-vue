<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import DefaultStat from './statTypes/default';

export default {

    components: {
        'default-stat': DefaultStat,
    },
    data: function () {
        return {
        }
    },
    methods: {
        ...mapActions('quiz', [
            'initQuiz',
            'initStatistics',
        ]),
        statisticsType(type) {
            switch(type) {

                default:
                    return 'default-stat';
            };
        },
        question(id) {
            return this.questions.find(question => question.id === id);
        },
    },
    computed: {
        ...mapState('quiz', {
            questions: state => state.questions,
            quiz: state => state.quiz,
            statistics: state => state.statistics,
        }),
        id() {
            return this.$route.params.id;
        },
    },
    created() {
        this.initQuiz({ id: this.id });
        this.initStatistics({ id: this.id });
    },
}
</script>

<template lang="pug">

.quiz(v-if="quiz")

    router-link.quiz__back(:to="{ path: '/' }") Вернуться к опросам

    h2.quiz__title  Статистика: {{ quiz.title }}

    .quiz__wrapper(v-if="statistics")

        .quiz-statistics

            component(v-for="(item, index) in statistics" 
                :key="index" 
                :is="statisticsType(item.type)" 
                :options="item.options" 
                :question="question(item.questionId)")
</template>
