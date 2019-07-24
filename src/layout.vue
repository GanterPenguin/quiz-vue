<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    components: {
    },
    methods: {
        ...mapActions([
        ]),
    },
    data: function () {
        return {
        }
    },
    computed: {
        ...mapState({
        }),
    },
    watch: {
    },
    created() {
    },

}
</script>


<template lang="pug">

.quiz-app 

    router-view

</template>

<style lang="scss">
@import "./src/scss/main.scss";
</style>
