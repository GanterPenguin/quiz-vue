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
        ]),
    },
    computed: {
        ...mapState({
        }),
    },
}
</script>


<template lang="pug">

.quizzes

</template>
