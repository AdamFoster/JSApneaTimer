Vue.component('timer', {
    props: {
    },
    template: `
        <div class="container">
            <div class="row">{{ table.label }} ({{ secondsToMS(totalDuration) }} total time - {{ secondsToMS(timeLeft) }} left)</div>
            <div class="row">

                <div class="col">
                    <div class="container">
                        <div class="row d-flex justify-content-center">
                            <div class="col" style="z-index: 100">
                                <svg class="base-timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <g class="base-timer-circle">
                                        <circle class="base-timer-path-elapsed" cx="50" cy="50" r="45"></circle>
                                        <path class="base-timer-path-remaining"
                                            :stroke-dasharray="strokeArray"
                                            :class="ringColor" 
                                            d="
                                            M 50, 50
                                            m -45, 0
                                            a 45,45 0 1,0 90,0
                                            a 45,45 0 1,0 -90,0
                                            "
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            
                            <div class="timer-text-container" >
                                <p class="text-center timer-text-type">{{ currentInterval > -1 ? types[table.intervals[currentInterval].type] : "&nbsp" }}</p>
                                <p class="text-center timer-text">{{ timerDisplay }}</p>
                                <div class="d-flex justify-content-center">
                                    <button class="timer-button" v-bind:disabled="state != timerStates.paused && state != timerStates.done" v-on:click="reset"><b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise></button>
                                    <button class="timer-button" v-bind:disabled="state != timerStates.running" v-on:click="pause"><b-icon-pause></b-icon-pause></button>
                                    <button class="timer-button" v-bind:disabled="state != timerStates.ready && state != timerStates.paused" v-on:click="start" ><b-icon-play></b-icon-play></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <router-link to="/">Go back home</router-link> 
                    
                </div>
                
                <div class="col">
                    <div class="list-group">
                        <div v-for="(interval, index) in table.intervals" class="list-group-item" v-bind:class="{ active: index==currentInterval, 'interval-apnea': interval.type=='apnea', 'interval-breathe': interval.type=='breathe'}">
                            {{ types[interval.type] }} for {{ secondsToMS(interval.duration) }}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,
    data: function() {
        return {
            state: 'Ready',
            currentInterval: -1,
            elapsedTimeMillis: 0,
            intervalElapsedTimeMillis: 0,
            types: INTERVAL_TYPES_MAP,
            timerStates: {ready: 'Ready', paused: 'Paused', running: 'Running', done: 'Done', error: 'Error'},
            lastTick: 0,
            error: '',
            timerHandle: 0,
            audioContext: new AudioContext(),
            previousSecond: -1,
            volumeScale: this.$store.state.settings.volume / 100.0,
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
                this.previousSecond = 0;
            }
            else {
                this.error = 'Error trying to start a timer in "' + this.state + '" state';
                console.log(this.error);
            }
        },
        pause: function() {
            if (this.state == this.timerStates.running) {
                clearInterval(this.timerHandle);
                this.timerHandle = 0;
                this.state = this.timerStates.paused;
            }
            else {
                this.error = 'Error trying to pause a timer in "' + this.state + '" state';
                console.log(this.error);
            }
        },
        reset: function() {
            if (this.state == this.timerStates.done || this.state == this.timerStates.paused) {
                this.state = this.timerStates.ready;
                //this.table = _.cloneDeep(this.initalTable);
                this.currentInterval = -1;
                this.elapsedTimeMillis = 0;
                this.intervalElapsedTimeMillis = 0;
                this.lastTick = 0;
                this.error = '';
            }
            else {
                this.error = 'Error trying to reset a timer in "' + this.state + '" state';
                console.log(this.error);
            }
        },
        secondsToMS(seconds) {
            return SECONDS_TO_MIN_SEC(seconds);
        },
        tick() {
            if (this.state != this.timerStates.running) {
                this.error = 'Error trying to tick a timer in "' + this.state + '" state';
                console.log(this.error);
                return;
            }
            var newTick = Date.now();
            this.elapsedTimeMillis += (newTick - this.lastTick);
            this.intervalElapsedTimeMillis += (newTick - this.lastTick);

            //check for second flip
            let currentSecond = (this.intervalElapsedTimeMillis/1000|0)
            if (this.previousSecond != currentSecond) {
                //second has flipped
                let remainingSeconds = this.table.intervals[this.currentInterval].duration - currentSecond;
                if (0 < remainingSeconds && remainingSeconds <= 3) {
                    this.beep(50 * this.volumeScale, 440, 150);
                } 
            }
            this.previousSecond = currentSecond;

            if (this.intervalElapsedTimeMillis > this.table.intervals[this.currentInterval].duration * 1000) {
                //next interval
                this.intervalElapsedTimeMillis = this.intervalElapsedTimeMillis - this.table.intervals[this.currentInterval].duration * 1000; // carry the leftovers
                this.currentInterval++;
                this.beep(70 * this.volumeScale, 660, 150);
                if (this.currentInterval == this.table.intervals.length) {
                    //got to the end
                    clearInterval(this.timerHandle);
                    this.timerHandle = 0;
                    this.currentInterval = -1;
                    this.state  = this.timerStates.done;
                }
            }

            this.lastTick = newTick;
        },
        beep(vol, freq, duration) { //duration in ms
            let v = this.audioContext.createOscillator();
            let u = this.audioContext.createGain();
            v.connect(u);
            v.frequency.value = freq;
            v.type = "square";
            u.connect(this.audioContext.destination);
            u.gain.value = vol*0.01;
            v.start(this.audioContext.currentTime);
            v.stop(this.audioContext.currentTime + duration*0.001);
          },
          
    },
    computed: {
        table: function() {
            return this.$store.state.tables[this.$route.params.index];
        },
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
        },
        ringColor: function() {
            if (this.currentInterval > -1 && this.state == this.timerStates.running) {
                if (this.table.intervals[this.currentInterval].type == "apnea") {
                    return "color-apnea";
                }
                else {
                    return "color-breathe";
                }
            }
            else if (this.state == this.timerStates.paused) {
                return "color-paused";
            }
            else {
                return "color-other";
            }
        },
        strokeArray: function() {
            if (this.currentInterval == -1) {
                return "0 0"
            }
            var elapsed = (this.intervalElapsedTimeMillis) / (this.table.intervals[this.currentInterval].duration * 1000);
            return `${(283 * (1-elapsed))|0} 283`;
        }
    }
})
