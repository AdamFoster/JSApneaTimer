Vue.component('edit-table', {
  props: {
    initalTable: Object, 
    tableIndex: Number,
  },
  template: `
    <div> 
      <div>Edit table {{ newTable.label }} </div>
      <div>({{ totalDuration }} seconds)</div>
      <button v-on:click="$emit('save-edit', {action})">Save</button> 
      <button v-on:click="$emit('cancel-edit')">Cancel</button>
      <button v-on:click="">Revert</button> 
    </div>
  `,
  data: function() {
    return {
      action: 'cancel', 
      newTable: _.cloneDeep(this.initalTable),
    }
  }, 
  computed: {
    totalDuration: function() {
      return this.newTable.intervals.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
    }
  },
  created: function() {
    //this.newTable = 
  },
  methods: {
    reset: function() {
      this.newTable = _.cloneDeep(this.table);
    }
  }
})