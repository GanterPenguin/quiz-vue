"use strict";

import "core-js";
import "regenerator-runtime";

import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapActions } from 'vuex';
import Layout from './layout';
import store from './store';

export default class QuizApp {

    constructor(selector) {

        const el = document.querySelector(selector);

        //const router = new VueRouter({ routes });
        Vue.use(VueRouter);

        let vm = new Vue({
            store,
            //router,
            data: {
                params: el.dataset,
            },
            methods: {
            },
            created() {
            },
            el,
            render: h => h(Layout),
        });
    }

}
