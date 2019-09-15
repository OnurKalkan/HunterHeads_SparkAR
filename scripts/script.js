const Scene = require('Scene');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');
const CameraInfo = require('CameraInfo');


const isR1 = CameraInfo.isRecordingVideo.monitor();
Patches.setPulseValue('myPulse', isR1);



