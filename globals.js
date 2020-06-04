var INTERVAL_TYPE_APNEA = 'apnea';
var INTERVAL_TYPE_BREATHE = 'breathe';
var INTERVAL_TYPES = [INTERVAL_TYPE_APNEA, INTERVAL_TYPE_BREATHE];
var INTERVAL_TYPES_MAP = [
    {value: INTERVAL_TYPE_APNEA, text: 'Apnea'}, 
    {value: INTERVAL_TYPE_BREATHE, text: 'Breathe'}
];

var STATES = {
    TIMER: 'timer',
    EDIT: 'edit',
    LIST: 'list'
};