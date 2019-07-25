"use strict";

export default {
    init(state, data) {
        state.apiData = data._links;
        state.initialized = true;
    }
};
