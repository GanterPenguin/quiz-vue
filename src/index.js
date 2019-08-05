"use strict";

import "core-js";
import "regenerator-runtime/runtime";

import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapActions } from 'vuex';
import Quasar, { QLinearProgress } from 'quasar';
import Layout from './layout';
import store from './store';
import Quizzes from './components/quizzes';
import Quiz from './components/quiz';
import Statistics from "./components/statistics";

export default class QuizApp {

    constructor(selector) {

        const el = document.querySelector(selector);
        const routes = [
            { path: '/', component: Quizzes },
            { path: '/quiz/:id', component: Quiz },
            { path: '/statistics/:id', component: Statistics },
        ];

        const router = new VueRouter({ routes });

        Vue.use(VueRouter);

        Vue.use(Quasar, {
            components: {
                QLinearProgress
            }
        });

        let vm = new Vue({
            store,
            router,
            data: {
                params: el.dataset,
            },
            methods: {
                ...mapActions(['init']),
            },
            created() {
                this.init(this.params);
            },
            el,
            render: h => h(Layout),
        });
    }

}
