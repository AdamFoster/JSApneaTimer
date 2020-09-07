Vue.component('list-tables', {
    props: {
        
    },
    template: `
        <div> 
            <p>Select a table</p>
            <div class="container">
                <div class="row my-2 d-none d-sm-flex">
                    <div class="col-sm"><p class="font-weight-bold">Name</p></div>
                    <div class="col-sm"><p class="font-weight-bold">Total Time</p></div>
                    <div class="col-sm"><p class="font-weight-bold">Action</p></div>
                </div>
                <div is="table-item" 
                    v-for="(table, index) in tables"
                    v-bind:table="table"
                    v-bind:table-index="index"
                    v-bind:key="table.label"
                    v-on:delete-table="deleteTable"
                ></div>
            </div>
            <router-link :to="'/table/new'">Create Table</router-link> | 
            <router-link :to="'/settings'">Settings</router-link>
        </div>
    `,
    data: function() {
        return {};
    }, 
    computed: Vuex.mapState({
        tables: 'tables'
    } ),
    created: function() {
    
    },
    methods: {
        deleteTable(tableIndex) {
            console.log('Deleting ' + tableIndex);
            this.$store.commit('deleteTable', Number(tableIndex) );
        }
    }
});