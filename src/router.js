import Router from "vue-router";
import Vue from 'vue';

Vue.use(Router);

const routes = [
    {
        path: '/search',
        component: require('./components/Search').default,
        name: 'search'
    },
];

export default new Router({
    mode: 'history',
    routes: routes,
});