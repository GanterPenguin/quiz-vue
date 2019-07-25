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

    label(v-for="(option, index) in options" :for="'radio' + index") {{ option }}
        input(name="'radio' + questionId" type="radio" :id="'radio' + index" :value="option")

</template>
