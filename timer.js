Vue.component('timer', {
    props: {
        initalTable: Object, 
        tableIndex: Number,
    },
    template: `
        <div>
            <div>{{ table.label }} </div>
            <div>{{ timerStates[state] }}</div>
            <div>{{ timerDisplay }}</div>
            <ol>
                <li v-for="interval in table.intervals">
                    {{ types[interval.type] }} for {{ secondsToMS(interval.duration) }}
                </li>
            </ol>
            <button v-if="state == timerStates.ready || state == timerStates.paused" v-on:click="start">Start</button>
            <button v-if="state == timerStates.running" v-on:click="pause">Pause</button>
            <button v-on:click="$emit('done', tableIndex)">Exit</button> 
            <div>{{ secondsToMS(timeLeft) }} left</div>
            <div>({{ secondsToMS(totalDuration) }} total time)</div>
        </div>
    `,
    data: function() {
        return {
            state: 'Ready',
            table: _.cloneDeep(this.initalTable),
            currentInterval: -1,
            elapsedTimeMillis: 0,
            intervalElapsedTimeMillis: 0,
            types: INTERVAL_TYPES_MAP,
            timerStates: {ready: 'Ready', paused: 'Paused', running: 'Running', done: 'Done', error: 'Error'},
            lastTick: 0,
            error: '',
            timerHandle: 0,
        };
    },
    methods: {
        start: function() {
            if (this.state == this.timerStates.ready || this.state == this.timerStates.paused) {
                this.state = this.timerStates.running;
                if (this.currentInterval == -1) {
                    this.currentInterval = 0;
                }
                this.lastTick = Date.now();
                this.timerHandle = setInterval(() => this.tick(), 50);
            }
            else {
                this.error = 'Error trying to start a timer in "' + this.state + '" state';
                console.log(this.error);
            }
        },
        pause: function() {
            if (this.state == this.timerStates.running) {
                clearInterval(this.intervalHandle);
                this.timerHandle = 0;
                this.state = this.timerStates.paused;
            }
            else {
                this.error = 'Error trying to pause a timer in "' + this.state + '" state';
                console.log(this.error);
            }
        },
        secondsToMS(seconds) {
            return SECONDS_TO_MIN_SEC(seconds);
        },
        tick() {
            var newTick = Date.now();
            this.elapsedTimeMillis += (newTick - this.lastTick);
            this.intervalElapsedTimeMillis += (newTick - this.lastTick);

            this.lastTick = newTick;
        }
    },
    computed: {
        totalDuration: function() {
            return this.table.intervals.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
        },
        timeLeft: function() {
            return this.totalDuration - (this.elapsedTimeMillis/1000|0);
        },
        timerDisplay: function() {
            if (this.state == this.timerStates.running || this.state == this.timerStates.paused) {
                return this.secondsToMS(this.table.intervals[this.currentInterval].duration - (this.intervalElapsedTimeMillis/1000|0));
            }
            else if (this.state == this.timerStates.ready) {
                return 'Ready';
            }
            else {
                return 'Done';
            }
        }

    }
})
