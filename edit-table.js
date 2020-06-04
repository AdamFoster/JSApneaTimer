Vue.component('edit-table', {
    props: {
        initalTable: Object, 
        tableIndex: Number,
    },
    template: `
        <div> 
            <div>Edit table {{ newTable.label }} </div>
            <div>({{ secondsToMS(totalDuration) }})</div>
            <ol>
                <li is="edit-table-interval"
                    v-for="(interval, index) in newTable.intervals"
                    v-bind:interval="interval"
                    v-bind:interval-index="index"
                    v-bind:key="interval.type+'-'+interval.duration+'-'+index"
                    v-on:update-duration="updateDuration"
                    v-on:update-type="updateType"
                ></li>
            </ol>
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
        secondsToMS(seconds) {
            return SECONDS_TO_MIN_SEC(seconds);
        },
    }
})