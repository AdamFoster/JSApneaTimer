var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    editIndex: -1,
    tables: [
      {
        label: 'Demo CO2 table',
        intervals: [
          { type: 'breathe', duration: 4},
          { type: 'apnea', duration: 4},
          { type: 'breathe', duration: 3},
          { type: 'apnea', duration: 4},
          { type: 'breathe', duration: 1},
          { type: 'apnea', duration: 4},
        ]
      },
      {
        label: 'Demo O2 table',
        intervals: [
          { type: 'breathe', duration: 4},
          { type: 'apnea', duration: 2},
          { type: 'breathe', duration: 4},
          { type: 'apnea', duration: 3},
          { type: 'breathe', duration: 4},
          { type: 'apnea', duration: 4},
        ]
      }
    ]
  },
  methods: {
    editTable: function(tableIndex) {
      this.editIndex = tableIndex;
    },
    saveEdit: function(newTable) {
      this.editIndex = -1;
    },
    cancelEdit: function() {
      this.editIndex = -1;
    }
  },
})