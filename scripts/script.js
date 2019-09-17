const Scene = require('Scene');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');
const CameraInfo = require('CameraInfo');
const Time = require('Time');

var ScorePlane = Scene.root.find('Score Text');
const TimerText = Scene.root.find('Timer Text');
const ScoreCanvas = Scene.root.find('Score Screen Canvas');
const StarterCanvas = Scene.root.find('Start Screen Canvas');
const Crown = Scene.root.find('Crown Plane');
var xValue = 13;

ScoreCanvas.hidden = true;

const isR1 = CameraInfo.isRecordingVideo.monitor();
Patches.setPulseValue('myPulse', isR1);

const isSC = CameraInfo.isCapturingPhoto.monitor();
Patches.setPulseValue('screenshot', isSC);

const oneSecond = 1000;

Time.setInterval(CheckTheScore, oneSecond);

function CheckTheScore()
{
    var patchScore = Patches.getScalarValue('ScoreFromPatches').pinLastValue();
    ScorePlane.text = 'Score: ' + patchScore.toString();
}

function TimerOnText() {
    TimerText.text = 'Time: ' + xValue.toString();

    if (xValue > 0) {
        xValue = xValue - 1;
    }
    else
    {
        ScoreCanvas.hidden = false;
        Crown.hidden = false;
    }
}

CameraInfo.isRecordingVideo.monitor().subscribeWithSnapshot({ isRecording: CameraInfo.isRecordingVideo },
    function (snapshot) {
        if (snapshot.newValue == true && snapshot.oldValue == false)
        {
            Time.setInterval(TimerOnText, oneSecond);
            StarterCanvas.hidden = true;
        }
        else
        {            
            TimerText.hidden = true;
        }
    })




