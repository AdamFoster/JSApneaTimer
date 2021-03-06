var INTERVAL_TYPE_APNEA = 'apnea';
var INTERVAL_TYPE_BREATHE = 'breathe';
var INTERVAL_TYPES = [INTERVAL_TYPE_APNEA, INTERVAL_TYPE_BREATHE];

var INTERVAL_TYPES_MAP = {
    apnea: 'Apnea', 
    breathe: 'Breathe'
}

function SECONDS_TO_MIN_SEC(seconds) {
    m = seconds/60|0;
    s = seconds%60;
    return (''+m).padStart(2, '0') + ":" + (''+s).padStart(2, '0');
}

var SHORTHAND_TYPES = {
    apnea: 'a',
    breathe: 'b'
}
