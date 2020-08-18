const ExportTable = Vue.component('export-table', {
    props: {
    },
    template: `
        <div> 
            <div>Exporting table <input v-model="table.label"></input> </div>
            <div>Total time: {{ secondsToMS(totalDuration) }}</div>
            <div>Query string: {{ queryString }}</div>
            <router-link to="/">Home</router-link>
        </div>
    `,
    data: function() {
        return { 
            table: _.cloneDeep(this.$store.state.tables[this.$route.params.index]),
        }
    }, 
    computed: {
        totalDuration: function() {
            return this.table.intervals.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
        },
        queryString: function() {
            let v = this.table.intervals.reduce( (accumulator, currentInterval, currentIndex, array) => {
                accumulator.push(SHORTHAND_TYPES[currentInterval.type] + currentInterval.duration);
                return accumulator;
            }, []); 
            return v.join(",");
        }
    },
    created: function() {
    
    },
    methods: {
        secondsToMS: function(seconds) {
            return SECONDS_TO_MIN_SEC(seconds);
        },
    }
})