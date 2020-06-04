var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        state: 'list', //'edit', 'run'
        tableIndex: -1,
        tables: [
            {
                label: 'Demo CO2 table',
                intervals: [
                    { type: 'breathe', duration: 4},
                    { type: 'apnea', duration: 4},
                    { type: 'breathe', duration: 3},
                    { type: 'apnea', duration: 4},
                    { type: 'breathe', duration: 1},
                    { type: 'apnea', duration: 4},
                ]
            },
            {
                label: 'Demo O2 table',
                intervals: [
                    { type: 'breathe', duration: 4},
                    { type: 'apnea', duration: 2},
                    { type: 'breathe', duration: 4},
                    { type: 'apnea', duration: 3},
                    { type: 'breathe', duration: 4},
                    { type: 'apnea', duration: 4},
                ]
            }
        ]
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
        saveEdit: function(newTable) {
            this.tables[this.tableIndex] = newTable;
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
        }
    },
})