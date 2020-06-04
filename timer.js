Vue.component('timer', {
    props: {
        initalTable: Object, 
        tableIndex: Number,
    },
    template: `
        <div>
            <div>{{ table.label }} </div>
            <div>({{ totalDuration }} seconds)</div>
            <button v-on:click="start" if="state == 'ready' || state == 'paused'">Start</button>
            <button v-on:click="pause" if="state == 'running'">Pause</button>
            <button v-on:click="$emit('done', tableIndex)">Exit</button> 
        </div>
    `,
    data: function() {
        return {
            state: 'ready',
            table: _.cloneDeep(this.initalTable),
        };
    },
    computed: {
        totalDuration: function() {
            return this.table.intervals.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
        }
    }
})
