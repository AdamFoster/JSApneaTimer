Vue.component('create-table', {
    props: {

    },
    template: `
        <div class="container"> 
            <div class="row">
                <div class="col-sm-auto">
                    <h2>Create a new table</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-auto">
                    <div class="container border">     
                        <div class="row">
                            <div class="col mt-2 mb-1">
                                Max breathold: <input v-model="max" style="width: 60px" ></input> seconds
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mb-2">
                                <button v-on:click="$emit('new-co2', max)">New CO2 table</button>
                                <button v-on:click="$emit('new-o2', max)">New O2 table</button>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
             <div class="row">
                <div class="col">OR</div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="container">     
                        <div class="row">
                            <div class="col-sm-auto my-2">                
                                <button v-on:click="$emit('new-blank', max)">New blank table</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col my-4">
                    <button v-on:click="$emit('new-cancel', max)">Cancel</button>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {
            max: 0,
        };
    }
})
