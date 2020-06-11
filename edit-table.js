Vue.component('edit-table', {
    props: {
        initalTable: Object, 
        tableIndex: Number,
    },
    template: `
        <div> 
            <div>Editing table <input v-model="newTable.label"></input> </div>
            <div class="container">
                <div is="edit-table-interval"
                    v-for="(interval, index) in newTable.intervals"
                    v-bind:interval="interval"
                    v-bind:interval-index="index"
                    v-bind:interval-count="newTable.intervals.length"
                    v-bind:key="interval.type+'-'+interval.duration+'-'+index"
                    v-on:update-duration="updateDuration"
                    v-on:update-type="updateType"
                    v-on:add-interval="addInterval"
                    v-on:delete-interval="deleteInterval"
                    v-on:up-interval="upInterval"
                    v-on:down-interval="downInterval"
                ></div>
            </div class="container">
            <div>Total time: {{ secondsToMS(totalDuration) }}</div>
            <button v-on:click="$emit('save-edit', newTable)">Save</button> 
            <button v-on:click="$emit('cancel-edit')">Cancel</button>
            <button v-on:click="revert">Revert</button> 
        </div>
    `,
    data: function() {
        return { 
            newTable: _.cloneDeep(this.initalTable),
        }
    }, 
    computed: {
        totalDuration: function() {
            return this.newTable.intervals.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
        }
    },
    created: function() {
    
    },
    methods: {
        revert: function() {
            this.newTable = _.cloneDeep(this.initalTable);
            this.$forceUpdate();
        },
        updateDuration: function(index_duration) {
            this.newTable.intervals[index_duration.index].duration = index_duration.duration;
        },
        updateType: function(index_type) {
            this.newTable.intervals[index_type.index].type = index_type.type;
        },
        secondsToMS: function(seconds) {
            return SECONDS_TO_MIN_SEC(seconds);
        },
        addInterval: function(index) {
            if (index+1 >= this.newTable.intervals.length) {
                this.newTable.intervals.push({ type: 'apnea', duration: 0});
            }
            else {
                this.newTable.intervals.splice(index+1, 0, { type: 'apnea', duration: 0});
            }
        },
        deleteInterval: function(index) {
            this.newTable.intervals.splice(index, 1);
        },        
        upInterval: function(index) {
            console.log('moving up');
            var old = _.cloneDeep(this.newTable.intervals[index]);
            this.newTable.intervals[index].duration = this.newTable.intervals[index-1].duration;
            this.newTable.intervals[index].type = this.newTable.intervals[index-1].type;
            this.newTable.intervals[index-1].duration = old.duration;
            this.newTable.intervals[index-1].type = old.type;
        },
        downInterval: function(index) {
            console.log('moving down');
            var old = _.cloneDeep(this.newTable.intervals[index]);
            this.newTable.intervals[index].duration = this.newTable.intervals[index+1].duration;
            this.newTable.intervals[index].type = this.newTable.intervals[index+1].type;
            this.newTable.intervals[index+1].duration = old.duration;
            this.newTable.intervals[index+1].type = old.type;
        }
    }
})