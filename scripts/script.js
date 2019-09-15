const Scene = require('Scene');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');

const myPulse = 1;

Patches.setPulseValue('myPulse', myPulse);

Diagnostics.log(myPulse);

