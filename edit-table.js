const EditTable = Vue.component('edit-table', {
    props: {
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

            <a v-on:click.prevent="save" href="javascript:null;">Save</a> | 
            <router-link to="/">Cancel</router-link> | 
            <a v-on:click.prevent="revert" v-if="! isCreateTable" href="javascript:null;">Revert</a>
        </div>
    `,
    data: function() {
        return { 
            newTable: this.$route.name === 'createTable' ? 
                _.cloneDeep(this.$store.state.emptyTable):
                _.cloneDeep(this.$store.state.tables[this.$route.params.index]),
        }
    }, 
    computed: {
        totalDuration: function() {
            return this.newTable.intervals.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
        },
        isCreateTable: function() {
            return (this.$route.name === 'createTable');
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