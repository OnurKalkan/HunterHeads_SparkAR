const Scene = require('Scene');
const CameraInfo = require('CameraInfo');
const Animation = require('Animation');
const Materials = require('Materials');
//const Diagnostics = require('Diagnostics');
const Time = require('Time');

const plane1 = Scene.root.find('LeftFood');
const plane2 = Scene.root.find('RightFood');
const plane3 = Scene.root.find('DownFood');
const plane4 = Scene.root.find('UpFood');
const TimerText = Scene.root.find('TimerText2');
//const ScoreText = Scene.root.find('ScoreText');
const driver1time = 5000;
const driver2time = 9000;
const driver3time = 7000;
const driver4time = 11000;
const oneSecond = 1000;
var x = 15;

//I just added a dummy comment

var foods = ['Donut', 'Cake', 'IceCream', 'Cupcake', 'Pie', 'Broccoli', 'Carrot', 'Eggplant', 'Pepper', 'Tomato', 'Crab', 'Fish', 'Octo', 'Shrimp', 'Turtle'];

const timeDriverParameters = { durationMilliseconds: 5000, loopCount: Infinity, mirror: false };
const timeDriverParameters2 = { durationMilliseconds: 9000, loopCount: Infinity, mirror: false };
const timeDriverParameters3 = { durationMilliseconds: 7000, loopCount: Infinity, mirror: false };
const timeDriverParameters4 = { durationMilliseconds: 11000, loopCount: Infinity, mirror: false };

// Create a time driver using the parameters
const timeDriver = Animation.timeDriver(timeDriverParameters);
const timeDriver2 = Animation.timeDriver(timeDriverParameters2);
const timeDriver3 = Animation.timeDriver(timeDriverParameters3);
const timeDriver4 = Animation.timeDriver(timeDriverParameters4);

/*timeDriver.start();
timeDriver2.start();
timeDriver3.start();
timeDriver4.start();*/

function ChangePlane1Mat() {
    var ranNo = Math.floor(Math.random() * 15);
    const material = Materials.get(foods[ranNo]);
    plane1.material = material;
}

Time.setInterval(ChangePlane1Mat, driver1time);
Time.setInterval(ChangePlane2Mat, driver2time);
Time.setInterval(ChangePlane3Mat, driver3time);
Time.setInterval(ChangePlane4Mat, driver4time);
Time.setInterval(TimerOnText, oneSecond);

// Create a sampler with a quadratic change in and out from -5 to 5
const quadraticSampler = Animation.samplers.easeInOutQuad(-0.25, 0.25);
const quadraticSampler2 = Animation.samplers.easeInOutQuad(0.4, -0.4);
const quadraticSampler3 = Animation.samplers.easeInOutQuad(-0.35, 0.35);
const quadraticSampler4 = Animation.samplers.easeInOutQuad(0.5, -0.5);

// Create an animation combining the driver and sampler
const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
const translationAnimation2 = Animation.animate(timeDriver2, quadraticSampler2);
const translationAnimation3 = Animation.animate(timeDriver3, quadraticSampler3);
const translationAnimation4 = Animation.animate(timeDriver4, quadraticSampler4);

// Bind the translation animation signal to the x-axis position signal of the plane
plane1.transform.x = translationAnimation;
plane2.transform.x = translationAnimation2;
plane3.transform.y = translationAnimation3;
plane4.transform.y = translationAnimation4;


CameraInfo.isRecordingVideo.monitor().subscribeWithSnapshot({ isRecording: CameraInfo.isRecordingVideo },
    function (snapshot) {
        if (snapshot.newValue == true && snapshot.oldValue == false) {            
            timeDriver.start();
            timeDriver2.start();
            timeDriver3.start();
            timeDriver4.start();
        }
        else {
            timeDriver.reset();
            timeDriver2.reset();
            timeDriver3.reset();
            timeDriver4.reset();
            timeDriver.stop();
            timeDriver2.stop();
            timeDriver3.stop();
            timeDriver4.stop();            
        }
    })

function TimerOnText() {
    TimerText.text = 'Time: ' + x.toString();

    if (x > 0) {
        x = x - 1;
    }

}

function ChangePlane2Mat() {
    var ranNo = Math.floor(Math.random() * 15);
    const material = Materials.get(foods[ranNo]);
    plane2.material = material;
}

function ChangePlane3Mat() {
    var ranNo = Math.floor(Math.random() * 15);
    const material = Materials.get(foods[ranNo]);
    plane3.material = material;
}

function ChangePlane4Mat() {
    var ranNo = Math.floor(Math.random() * 15);
    const material = Materials.get(foods[ranNo]);
    plane4.material = material;
}

/*timeDriver.onCompleted().subscribe(
    function () {
        plane1.material = material;
        Diagnostics.log('Yellow World!');
    });*/


