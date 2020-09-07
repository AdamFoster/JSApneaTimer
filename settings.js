const Settings = Vue.component('settings', {
    props: {
    },
    template: `
        <div> 
            <h2>Settings</h2>
                <transition name="slide-fade">
                    <div v-if="showAlert" class="alert alert-success" role="alert">
                        Saved
                    </div>
                </transition>
                <form>
                    <div class="form-group">
                        <label for="volume">Volume</label>
                        <input v-model="settings.volume" type="number" class="form-control" id="volume" aria-describedby="volumeHelp" placeholder="Set Volume (0-100)">
                        <small id="volumeHelp" class="form-text text-muted">Volume of beeps. 0 is off, 100 is loud. Default 50.</small>
                    </div>
                </form>
            
            <a v-on:click.prevent="save" href="javascript:null;">Save</a> | 
            <router-link to="/">Cancel</router-link> | 
            <router-link to="/">Home</router-link>
        </div>
    `,
    data: function() {
        return { 
            settings: _.cloneDeep(this.$store.state.settings),
            showAlert: false,
        }
    }, 
    computed: {
        
    },
    created: function() {
    
    },
    methods: {
        save: function() {
            this.$store.commit('updateSettings', this.settings )
            this.showAlert = true;
            setTimeout(() => this.showAlert = false, 3000);
            console.log("Saving");
        }
    }
})