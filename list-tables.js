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
                    v-on:edit-table="$emit(editTable)"
                    v-on:go-table="$emit(goTable)"
                ></div>
            </div>
            <button v-on:click="$emit(newTable)">Create Table</button>
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

    }
});