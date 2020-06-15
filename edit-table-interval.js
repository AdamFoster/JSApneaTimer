Vue.component('edit-table-interval', {
    props: {
        interval: Object, 
        intervalIndex: Number,
        intervalCount: Number
    },
    template: `
        <div class="row my-2"> 
            <div class="col-auto">
                <select v-model="type">
                    <option v-for="(value, key) of type_map" v-bind:value="key">
                        {{ value }}
                    </option>
                </select>
                for 
                <input v-model="duration" style="width: 60px" type="number"></input>
                seconds
            </div>
            <div class="col-auto">
                <button v-on:click="$emit('add-interval', intervalIndex)"><b-icon-plus-circle></b-icon-plus-circle></button>
                <button v-on:click="$emit('delete-interval', intervalIndex)"><b-icon-trash></b-icon-trash></button>
                <button v-on:click="$emit('up-interval', intervalIndex)" v-bind:disabled="intervalIndex == 0"><b-icon-arrow-up></b-icon-arrow-up></button>
                <button v-on:click="$emit('down-interval', intervalIndex)" v-bind:disabled="intervalIndex+1 == intervalCount"><b-icon-arrow-down></b-icon-arrow-down></button>
            </div>
        </div>
    `,
    data: function() {
        return {
            duration: this.interval.duration,
            type: this.interval.type,
            type_map: INTERVAL_TYPES_MAP,
        }
    },
    computed: {

    },
    methods: {
        updateDuration: function() {
            this.$emit('update-duration', {index: this.intervalIndex, duration: Number(this.duration)});
        }
    },
    watch: {
        duration: function(newDuration, oldDuration) {
            if (! isNaN(newDuration)) {
                _.debounce(this.updateDuration, 1000)();
                //this.$emit('update-duration', {index: this.intervalIndex, duration: Number(newDuration)});
            }
        },
        type: function(newType, oldType) {
            this.$emit('update-type', {index: this.intervalIndex, type: newType});
        }
    }
})