Vue.component('timer', {
    props: {
        initalTable: Object, 
        tableIndex: Number,
    },
    template: `
        <div>
            <div>{{ table.label }} </div>
            <div>{{ timerStates[state] }}</div>
            <div>{{ state == 'running' || state == 'paused' ? secondsToMS(table.intervals[currentInterval].duration) : "00:00" }}</div>
            <ol>
                <li v-for="interval in table.intervals">
                    {{ types[interval.type] }} for {{ secondsToMS(interval.duration) }}
                </li>
            </ol>
            <button v-if="state == 'ready' || state == 'paused'" v-on:click="start">Start</button>
            <button v-if="state == 'running'" v-on:click="pause">Pause</button>
            <button v-on:click="$emit('done', tableIndex)">Exit</button> 
            <div>{{ secondsToMS(totalDuration - (elapsedTimeMillis/1000)) }} left</div>
            <div>({{ secondsToMS(totalDuration) }} total time)</div>
        </div>
    `,
    data: function() {
        return {
            state: 'ready',
            table: _.cloneDeep(this.initalTable),
            currentInterval: -1,
            elapsedTimeMillis: 0,
            intervalElapsedTimeMillis: 0,
            types: INTERVAL_TYPES_MAP,
            timerStates: {ready: 'Ready', paused: 'Paused', running: 'Running', done: 'Done'}
        };
    },
    methods: {
        start: function() {
            if (this.state == 'ready' || this.state == 'paused') {
                this.state = 'running';
                if (this.currentInterval == -1) {
                    this.currentInterval = 0;
                }
            }
            else {

            }
        },
        pause: function() {

        },
        secondsToMS(seconds) {
            m = seconds/60|0;
            s = seconds%60;
            return (''+m).padStart(2, '0') + ":" + (''+s).padStart(2, '0');
        }
    },
    computed: {
        totalDuration: function() {
            return this.table.intervals.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
        },

    }
})
