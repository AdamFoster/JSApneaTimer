const ImportTable = Vue.component('import-table', {
    props: {
    },
    template: `
        <div> 
            <div class="my-2">Imported table: <input v-model="newTable.label"></input> </div>
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
            <div class="my-2">Total time: {{ secondsToMS(totalDuration) }}</div>
            <button v-on:click="save">Save</button> 
            <router-link to="/">Cancel</router-link>
            <button v-on:click="revert" v-if="! isCreateTable">Revert</button> 
        </div>
    `,
    data: function() {
        return { 
            newTable: {
                label: "Imported table name",
                intervals: this.$route.query.t ? this.$route.query.t.split(',').reduce((accumulator, string, currentIndex, array) => {
                    let interval = {
                        type: string[0] === "a" ? "apnea" : "breathe",
                        duration: Number(string.substring(1))
                    }
                    accumulator.push(interval);
                    return accumulator;
                }, []) : [],
            }
        }
    }, 
    computed: {
        totalDuration: function() {
            return this.newTable.intervals.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
        },
        isCreateTable: function() {
            return (true);
        }
    },
    created: function() {
    
    },
    methods: {
        save: function() {
            if (this.isCreateTable) {
                this.$store.commit('addTable', this.newTable )
            }
            else {
                this.$store.commit('updateTable', {table: this.newTable, tableIndex: this.$route.params.index} )
            }
            this.$router.push('/')
        },
        revert: function() {
            this.newTable = this.$route.name === 'createTable' ? 
                _.cloneDeep(this.$store.state.emptyTable):
                _.cloneDeep(this.$store.state.tables[this.$route.params.index])
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