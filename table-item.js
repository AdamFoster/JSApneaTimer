Vue.component('table-item', {
    props: {
        table: Object, 
        tableIndex: Number,
    },
    template: `
        <li> 
            <div>{{ table.label }} </div>
            <div>({{ totalDuration }} seconds)</div>
            <button v-on:click="$emit('edit-table', tableIndex)">Edit</button>
            <button v-on:click="$emit('go-table', tableIndex)">Go</button> 
        </li>
    `,
    computed: {
        totalDuration: function() {
            return this.table.intervals.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
        }
    }
})
