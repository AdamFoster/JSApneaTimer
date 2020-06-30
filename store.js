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
            //console.log(payload);
            state.tables[payload.tableIndex] = _.cloneDeep(payload.table);
        },
        deleteTable (state, tableIndex) {
            state.tables.intervals.splice(tableIndex, 1);
        },
        createCO2Table (state, max_breathold) {
            let table = { label: 'New CO2 Table', intervals: []};
            for (let i=120 ; i>=15 ; i-=15) {
                table.intervals.push({type: 'breathe', duration: i});
                table.intervals.push({type: 'apnea', duration: (max_breathold/2)|0});
            }
            state.tables.push(table);
        },
        createO2Table (state, max_breathold) {
            let table = { label: 'New O2 Table', intervals: []};
            for (let i=40 ; i<=80 ; i+=10) {
                table.intervals.push({type: 'breathe', duration: 120});
                table.intervals.push({type: 'apnea', duration: (max_breathold*i/100)|0});
            }
            state.tables.push(table);
        },
        createBlankTable (state) {
            state.tables.push(_.cloneDeep(state.emptyTable));
        }
    }
});