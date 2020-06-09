Vue.component('edit-table', {
    props: {
        initalTable: Object, 
        tableIndex: Number,
    },
    template: `
        <div> 
            <div>Edit table {{ newTable.label }} </div>
            <div>Total time: {{ secondsToMS(totalDuration) }}</div>
            <div class="container">
                <div is="edit-table-interval"
                    v-for="(interval, index) in newTable.intervals"
                    v-bind:interval="interval"
                    v-bind:interval-index="index"
                    v-bind:key="interval.type+'-'+interval.duration+'-'+index"
                    v-on:update-duration="updateDuration"
                    v-on:update-type="updateType"
                    v-on:add-interval="addInterval"
                    v-on:delete-interval="deleteInterval"
                ></div>
            </div class="container">
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
        }
    }
})