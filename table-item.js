Vue.component('table-item', {
    props: {
        table: Object, 
        tableIndex: Number,
    },
    template: `
        <div class="row my-2"> 
            <div class="col-sm">{{ table.label }} </div>
            <div class="col-sm">{{ secondsToMS(totalDuration) }}</div>
            <div class="col-sm">
                <router-link :to="'/table/'+tableIndex+'/edit'">Edit</router-link>
                <router-link :to="'/table/'+tableIndex">Go</router-link>
            </div>
        </div>
    `,
    methods: {
        secondsToMS(seconds) {
            return SECONDS_TO_MIN_SEC(seconds);
        },
    },
    computed: {
        totalDuration: function() {
            return this.table.intervals.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
        }
    }
})
