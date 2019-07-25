"use strict";

export default {
    async init(context, params) {
        let apiData = await fetch(params.apiLink);

        if(!apiData.ok) {
            throw new Error('Connection error');
        }

        let data = await apiData.json();

        context.commit("init", data);
    }
};
