const Scene = require('Scene');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');
const CameraInfo = require('CameraInfo');
const Time = require('Time');
const TouchGestures = require('TouchGestures');
const Materials = require('Materials');

var ScorePlane = Scene.root.find('Score Text');
const TimerText = Scene.root.find('Timer Text');
const ScoreCanvas = Scene.root.find('Score Screen Canvas');
const StarterCanvas = Scene.root.find('Start Screen Canvas');
const Crown = Scene.root.find('Crown Plane');
var xValue = 13;

const plane_C_Sweets = Scene.root.find('ChooseSweets');
const plane_C_Veggies = Scene.root.find('ChooseVeggies');
const plane_C_Fishes = Scene.root.find('ChooseSea');
//
const Sweet_Mat_1 = Materials.get('Sweet Foods Mat');
const Sweet_Mat_2 = Materials.get('RedSweet');
const Veggies_Mat_1 = Materials.get('Veggie Foods Mat');
const Veggies_Mat_2 = Materials.get('RedVeg');
const Fish_Mat_1 = Materials.get('Sea Foods Mat');
const Fish_Mat_2 = Materials.get('RedSea');

const RFood = Scene.root.find('Right Food');
const LFood = Scene.root.find('Left Food');
const UFood = Scene.root.find('Up Food');
const UnFood = Scene.root.find('Under Food');

const GLeft = Scene.root.find('GoodLeft');
const GRight = Scene.root.find('GoodRight');
const GUp = Scene.root.find('GoodUp');
const GDown = Scene.root.find('GoodDown');
const ONLeft = Scene.root.find('Oh-No Left');
const ONRight = Scene.root.find('Oh-No Right');
const ONUp = Scene.root.find('Oh-No Up');
const ONDown = Scene.root.find('Oh-No Down');

const GLeftT = GLeft.transform;
const GRightT = GRight.transform;
const GUpT = GUp.transform;
const GDownT = GDown.transform;
const ONLeftT = ONLeft.transform;
const ONRightT = ONRight.transform;
const ONUpT = ONUp.transform;
const ONDownT = ONDown.transform;



ScoreCanvas.hidden = true;

const isR1 = CameraInfo.isRecordingVideo.monitor();
Patches.setPulseValue('myPulse', isR1);

const isSC = CameraInfo.isCapturingPhoto.monitor();
Patches.setPulseValue('screenshot', isSC);

var oneSecond = 1000;

const scoreTime = Time.setInterval(CheckTheScore, oneSecond);

function CheckTheScore()
{
    var patchScore = Patches.getScalarValue('ScoreFromPatches').pinLastValue();
    ScorePlane.text = 'Score: ' + patchScore.toString();
}

function stopIntervalTimer()
{
    Time.clearInterval(scoreTime);
}

function TimerOnText()
{    
    if (xValue > 1)
    {
        xValue--;        
    }
    else if (xValue == 1)
    {
        ScoreCanvas.hidden = false;
        Crown.hidden = false;
        RFood.hidden = true;
        LFood.hidden = true;
        UFood.hidden = true;
        UnFood.hidden = true;
        stopIntervalTimer();
        xValue--;
        GLeftT.x = 1;
        GRightT.x = 1;
        GUpT.x = 1;
        GDownT.x = 1;
        ONLeftT.x = 1;
        ONRightT.x = 1;
        ONUpT.x = 1;
        ONDownT.x = 1;
    }
    TimerText.text = 'Time: ' + xValue.toString();
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

TouchGestures.onTap(plane_C_Sweets).subscribe(function (gesture)
{
    plane_C_Sweets.material = Sweet_Mat_2;
    plane_C_Veggies.material = Veggies_Mat_1;
    plane_C_Fishes.material = Fish_Mat_1;
});

TouchGestures.onTap(plane_C_Veggies).subscribe(function (gesture) {
    plane_C_Sweets.material = Sweet_Mat_1;
    plane_C_Veggies.material = Veggies_Mat_2;
    plane_C_Fishes.material = Fish_Mat_1;
});

TouchGestures.onTap(plane_C_Fishes).subscribe(function (gesture) {
    plane_C_Sweets.material = Sweet_Mat_1;
    plane_C_Veggies.material = Veggies_Mat_1;
    plane_C_Fishes.material = Fish_Mat_2;
});




