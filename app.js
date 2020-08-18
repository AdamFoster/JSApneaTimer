const routes = [
    { path: '/', name: 'home', component: Vue.component('list-tables') },
    { path: '/table/new', name: 'createTable', component: Vue.component('create-table') },
    { path: '/table/import', name: 'importTable', component: Vue.component('import-table') },
    { path: '/table/:index/edit', name: 'editTable', component: Vue.component('edit-table') },
    { path: '/table/:index/export', name: 'exportTable', component: Vue.component('export-table') },
    { path: '/table/:index', name: 'timer', component: Vue.component('timer') },
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

var app = new Vue({
    router, store,
    el: '#app',
    beforeCreate() { this.$store.commit('initialiseStore');},
    data: {

    },
    methods: {

    },
});

