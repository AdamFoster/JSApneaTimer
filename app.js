const routes = [
    { path: '/', name: 'home', component: Vue.component('list-tables') },
    { path: '/table/new', name: 'createTable', component: Vue.component('create-table') },
    { path: '/table/:index/edit', name: 'editTable', component: Vue.component('edit-table') },
    { path: '/table/:index', name: 'timer', component: Vue.component('timer') },
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

var app = new Vue({
    router, store,
    el: '#app',
    data: {
        state: 'list', //'edit', 'run'
        tableIndex: -1,
    },
    methods: {
        editTable: function(tableIndex) {
            this.tableIndex = tableIndex;
            this.state = STATES.EDIT;
        },
        goTable: function(tableIndex) {
            this.tableIndex = tableIndex;
            this.state = STATES.TIMER;
        },
        newTable: function() {
            this.tableIndex = -1;
            this.state = STATES.CREATE;
        },
        saveEdit: function(newTable) {
            if (this.tableIndex > -1) {
                this.tables[this.tableIndex] = newTable;
            }
            else {
                this.tables.push(newTable);
            }
            this.tableIndex = -1;
            this.state = STATES.LIST;
        },
        cancelEdit: function() {
            this.tableIndex = -1;
            this.state = STATES.LIST;
        },
        done: function() {
            this.tableIndex = -1;
            this.state = STATES.LIST;
        },
        createBlank: function() {
            this.tableIndex = -1;
            this.state = STATES.EDIT;
        },
        createCancel: function() {
            this.tableIndex = -1;
            this.state = STATES.LIST;
        },
    },
});

