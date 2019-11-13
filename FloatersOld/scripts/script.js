const Scene = require('Scene');
const Patches = require('Patches');
const CameraInfo = require('CameraInfo');
const Time = require('Time');
const NativeUI = require('NativeUI');
const Textures = require('Textures'); 

var ScorePlane = Scene.root.find('Score Text');
const TimerText = Scene.root.find('Timer Text');
const ScoreCanvas = Scene.root.find('Score Screen Canvas');
const Crown = Scene.root.find('Crown Plane');
var xValue = 13;
TimerText.hidden = true; 

//
//Picker Script starts here
//
const sweetTex = Textures.get('sweets');
const vegTex = Textures.get('veggies');
const seaTex = Textures.get('seafood'); 
//
const picker = NativeUI.picker;
const index = 0;
//
const configuration = {

    selectedIndex: index,

    items: [
        { image_texture: seaTex },
        { image_texture: sweetTex },
        { image_texture: vegTex }
    ]
};
//
picker.configure(configuration);
picker.visible = true;
//
picker.selectedIndex.monitor().subscribe(function (index) {
    var indexNum = index.newValue;
    Patches.setScalarValue('indexNum', indexNum);
});  
//
//Picker Script ends here
//

const HeartShaped = Scene.root.find('emitter0');
HeartShaped.hidden = true;

const RFood = Scene.root.find('Sw Right Food');
const LFood = Scene.root.find('Sw Left Food');
const UFood = Scene.root.find('Sw Up Food');
//
const LSFood = Scene.root.find('Sea Left Food');
const RSFood = Scene.root.find('Sea Right Food');
const USFood = Scene.root.find('Sea Up Food');
//
const VLFood = Scene.root.find('Veg Left Food');
const VRFood = Scene.root.find('Veg Right Food');
const VUFood = Scene.root.find('Veg Up Food');

const GLeft = Scene.root.find('Good Sea');
const GRight = Scene.root.find('Good Sweets');
const GUp = Scene.root.find('Good Veggies');
const ONLeft = Scene.root.find('Oh-No Sea');
const ONRight = Scene.root.find('Oh-No Sweets');
const ONUp = Scene.root.find('Oh-No Veggies');

const GLeftT = GLeft.transform;
const GRightT = GRight.transform;
const GUpT = GUp.transform;
const ONLeftT = ONLeft.transform;
const ONRightT = ONRight.transform;
const ONUpT = ONUp.transform;

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
        HeartShaped.hidden = false;

        RFood.hidden = true;
        LFood.hidden = true;
        UFood.hidden = true;
        LSFood.hidden = true;
        RSFood.hidden = true;
        USFood.hidden = true;
        VLFood.hidden = true;
        VRFood.hidden = true;
        VUFood.hidden = true;

        stopIntervalTimer();
        xValue--;
        GLeftT.x = 1;
        GRightT.x = 1;
        GUpT.x = 1;
        ONLeftT.x = 1;
        ONRightT.x = 1;
        ONUpT.x = 1;
    }
    TimerText.text = 'Time: ' + xValue.toString();
}

CameraInfo.isRecordingVideo.monitor().subscribeWithSnapshot({ isRecording: CameraInfo.isRecordingVideo },
    function (snapshot) {
        if (snapshot.newValue == true && snapshot.oldValue == false)
        {
            Time.setInterval(TimerOnText, oneSecond);
            picker.visible = false;
            TimerText.hidden = false; 
        }
        else
        {            
            picker.visible = true;
            TimerText.hidden = true;            
        }
    })




