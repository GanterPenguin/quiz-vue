<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    props: [
        'options',
        'question',
    ],
    components: {
    },
    data: function () {
        return {
        }
    },
    computed: {
        sum() {
            let count = 0;
            this.options.forEach(option => {
                count += option.count;
            });
            return count;
        },
    },
    methods: {
        progress(count) {
            return count / this.sum;
        }
    },
    watch: {
    },
}
</script>


<template lang="pug">

.quiz-statistics__item(v-if="options && question")

    .quiz-statistics__text {{ question._embedded.content.text }} всего ответов: {{ sum }}

    .quiz-statistics__wrapper

        .quiz-statistics__option(v-for="option in options")

            .quiz-statistics__option-text {{ option.text }}

            .quiz-statistics__progress-bar
                q-linear-progress(style="height: 20px" :value="progress(option.count)")
                .quiz-statistics__count {{ option.count }}
</template>
