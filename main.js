audio = "";
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectDetector.detect(video, gotResult);
}

function modelLoaded()
{
    console.log("ModelLoaded");
    status = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function preload()
{
    audio = loadSound("emergency_alert.mp3");
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i=0; i < objects.length; i++)
        {
        if (objects[i].label == "person")
        {
           console.log("stopped");
            audio.stop();
            document.getElementById("status").innerHTML = "Baby Found";
        }
        else {
            console.log("played");
            audio.play();
            document.getElementById("status").innerHTML = "Baby Not Found";
        }
    }
    if (objects.length == 0)
    {
        console.log("played");
        audio.play();
        document.getElementById("status").innerHTML = "Baby Not Found";
    }
}
}