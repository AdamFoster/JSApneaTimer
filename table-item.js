Vue.component('table-item', {
    props: {
        table: Object, 
        tableIndex: Number,
    },
    template: `
        <li class="list-item"> 
            <div>{{ table.label }} </div>
            <div>({{ secondsToMS(totalDuration) }})</div>
            <button v-on:click="$emit('edit-table', tableIndex)">Edit</button>
            <button v-on:click="$emit('go-table', tableIndex)">Go</button> 
        </li>
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
