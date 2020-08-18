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
                                <button v-on:click="newCO2">New CO2 table</button>
                                <button v-on:click="newO2">New O2 table</button>
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
                                <button v-on:click="newBlank">New blank table</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col my-4">
                    <router-link to="/">Cancel</router-link>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {
            max: 0,
        };
    },
    methods: {
        newCO2: function() {
            if (Number(this.max) > 0) {
                this.$store.commit('createCO2Table', Number(this.max) );
                this.$router.push('/table/' + (this.$store.state.tables.length-1));
            }
            else {
                console.log("Error: max must be a number > 0");
            }
        },
        newO2: function() {
            if (Number(this.max) > 0) {
                this.$store.commit('createO2Table', Number(this.max) );
                this.$router.push('/table/' + (this.$store.state.tables.length-1));
            }
            else {
                console.log("Error: max must be a number > 0");
            }
        },
        newBlank: function() {
            this.$store.commit('createBlankTable');
            this.$router.push('/table/' + (this.$store.state.tables.length-1));
        },
    }
})
