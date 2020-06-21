const routes = [
    { path: '/', name: 'home', component: Vue.component('list-tables') },
    { path: '/table/new', component: Vue.component('edit-table') },
    { path: '/table/:index/edit', component: Vue.component('edit-table') },
    { path: '/table/:index', component: Vue.component('timer') },
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        xtables: [], 
        emptyTable: {
            label: 'New table',
            intervals: [ { type: 'breathe', duration: 0} ],
        },
        tables: [
            {
                label: 'Demo CO2 table',
                intervals: [
                    { type: 'breathe', duration: 4 },
                    { type: 'apnea', duration: 4 },
                    { type: 'breathe', duration: 3 },
                    { type: 'apnea', duration: 4 },
                    { type: 'breathe', duration: 1 },
                    { type: 'apnea', duration: 4 },
                ]
            },
            {
                label: 'Demo O2 table',
                intervals: [
                    { type: 'breathe', duration: 4 },
                    { type: 'apnea', duration: 2 },
                    { type: 'breathe', duration: 4 },
                    { type: 'apnea', duration: 3 },
                    { type: 'breathe', duration: 4 },
                    { type: 'apnea', duration: 4 },
                ]
            }
        ],
    },
    mutations: {
        addTable (state, table) {
            state.tables.push(table);
        },
        updateTable (state, payload) { //table, tableIndex
            console.log(payload);
            state.tables[payload.tableIndex] = _.cloneDeep(payload.table);
        },
        deleteTable (state, tableIndex) {
            state.tables.intervals.splice(tableIndex, 1);
        },
    }
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
        createO2: function(max_breathold) {
            let max = Number(max_breathold);
            let table = { label: 'New O2 Table', intervals: []};
            for (let i=40 ; i<=80 ; i+=10) {
                table.intervals.push({type: 'breathe', duration: 120});
                table.intervals.push({type: 'apnea', duration: (max*i/100)|0});
            }
            this.tables.push(table);
            this.tableIndex = this.tables.length - 1;
            this.state = STATES.EDIT;
        },
        createCO2: function(max_breathold) {
            let max = Number(max_breathold);
            let table = { label: 'New CO2 Table', intervals: []};
            for (let i=120 ; i>=15 ; i-=15) {
                table.intervals.push({type: 'breathe', duration: i});
                table.intervals.push({type: 'apnea', duration: (max/2)|0});
            }
            this.tables.push(table);
            this.tableIndex = this.tables.length - 1;
            this.state = STATES.EDIT;
        },
    },
});

