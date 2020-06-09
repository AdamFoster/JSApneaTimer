Vue.component('edit-table-interval', {
    props: {
        interval: Object, 
        intervalIndex: Number,
    },
    template: `
        <div class="row my-2"> 
            <div class="col">
                <select v-model="type">
                    <option v-for="(value, key) of type_map" v-bind:value="key">
                        {{ value }}
                    </option>
                </select>
                for 
                <input v-model="duration" style="width: 60px"></input>
                seconds
                <button v-on:click="$emit('add-interval', intervalIndex)"><b-icon-plus-circle></b-icon-plus-circle></button>
                <button v-on:click="$emit('delete-interval', intervalIndex)"><b-icon-trash></b-icon-trash></button>
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
    },
    watch: {
        duration: function(newDuration, oldDuration) {
            if (! isNaN(newDuration)) {
                this.$emit('update-duration', {index: this.intervalIndex, duration: Number(newDuration)});
            }
        },
        type: function(newType, oldType) {
            this.$emit('update-type', {index: this.intervalIndex, type: newType});
        }
    }
})