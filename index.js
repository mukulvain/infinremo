
var x=0;
var y=0; 
var z=0;
var w=0;

document.getElementById("p").className="disabled fas fa-arrow-left fa-3x";
document.getElementById("p6").innerHTML="<i class='disabled fas fa-step-forward fa-2x'></i>";
document.getElementById("p6").className="button2 step-forward";
document.getElementById("p7").innerHTML="<i class='disabled fas fa-volume-mute fa-2x'></i>";
document.getElementById("p7").className="button2 mute";
document.getElementById("p8").innerHTML="<i class='disabled fas fa-step-backward fa-2x'></i>";
document.getElementById("p8").className="button2 step-backward";
document.getElementById("p10").innerHTML="<i class='disabled fas fa-expand fa-2x'></i>";
document.getElementById("p10").className="button2 expand";



function change(){
    if (x==0){
        document.getElementById("p1").innerHTML="<i class='enabled fas fa-play fa-2x'></i>";
        document.getElementById("p2").innerHTML="<i class='enabled fas fa-backward fa-2x'></i>";
        document.getElementById("p3").innerHTML="<i class='enabled fas fa-forward fa-2x'></i>";
        document.getElementById("p4").innerHTML="<i class='enabled fas fa-volume-up fa-2x'></i>";
        document.getElementById("p5").innerHTML="<i class='enabled fas fa-volume-down fa-2x'></i>";
    }
    else if(x%2==1){
        document.getElementById("p1").innerHTML="<i class='enabled fas fa-pause fa-2x'></i>";        
    }
    else{
        document.getElementById("p1").innerHTML="<i class='enabled fas fa-play fa-2x'></i>";
    }

    if (z==0){
        document.getElementById("p").className="enabled fas fa-arrow-left fa-3x";
        document.getElementById("p6").innerHTML="<i class='enabled fas fa-step-forward fa-2x'></i>";
        document.getElementById("p6").className="button1 step-forward";
        document.getElementById("p7").innerHTML="<i class='enabled fas fa-volume-mute fa-2x'></i>";
        document.getElementById("p7").className="button1 mute";
        document.getElementById("p8").innerHTML="<i class='enabled fas fa-step-backward fa-2x'></i>";
        document.getElementById("p8").className="button1 step-backward";
        document.getElementById("p10").innerHTML="<i class='enabled fas fa-expand fa-2x'></i>";
        document.getElementById("p10").className="button1 expand";
        z=z+1;
    }

    x=x+1;
}

function changeback(){
    if (y%2==0){
        document.getElementById("p1").innerHTML="Select";
        document.getElementById("p2").innerHTML="<i class='enabled fas fa-chevron-left fa-2x'></i>";
        document.getElementById("p3").innerHTML="<i class='enabled fas fa-chevron-right fa-2x'></i>";
        document.getElementById("p4").innerHTML="<i class='enabled fas fa-chevron-up fa-2x'></i>";
        document.getElementById("p5").innerHTML="<i class='enabled fas fa-chevron-down fa-2x'></i>";
        document.getElementById("p10").className="button1 expand";
        document.getElementById("p10").innerHTML="<i class='enabled fas fa-expand fa-2x'></i>";
        document.getElementById("p").className="disabled fas fa-arrow-left fa-3x";
        document.getElementById("p6").innerHTML="<i class='disabled fas fa-step-forward fa-2x'></i>";
        document.getElementById("p6").className="button2 step-forward";
        document.getElementById("p7").innerHTML="<i class='disabled fas fa-volume-mute fa-2x'></i>";
        document.getElementById("p7").className="button2 mute";
        document.getElementById("p8").innerHTML="<i class='disabled fas fa-step-backward fa-2x'></i>";
        document.getElementById("p8").className="button2 step-backward";
        document.getElementById("p10").innerHTML="<i class='disabled fas fa-expand fa-2x'></i>";
        document.getElementById("p10").className="button2 expand";
        w=0;
        z=0;
        x=0;
    }
}

function screen(){
    if (z==1){
        if (y%2==0){
            document.getElementById("p10").innerHTML="<i class='enabled fas fa-compress fa-2x'></i>";
            document.getElementById("p").className="disabled fas fa-arrow-left fa-3x";
            document.getElementById("p9").innerHTML="<i class='disabled fas fa-search fa-2x'></i>";
            document.getElementById("p9").className="button2 search";
        }
        else{
            document.getElementById("p10").innerHTML="<i class='enabled fas fa-expand fa-2x'></i>";
            document.getElementById("p").className="enabled fas fa-arrow-left fa-3x";
            document.getElementById("p9").innerHTML="<i class='enabled fas fa-search fa-2x'></i>";
            document.getElementById("p9").className="button1 search";

        }
        y=y+1;
    }
}

function vol(){
    if (z==1){
        if (w%2==0){
            document.getElementById("p7").innerHTML="<i class='enabled fas fa-volume-up fa-2x'></i>";
        }
        else{
            document.getElementById("p7").innerHTML="<i class='enabled fas fa-volume-mute fa-2x'></i>";
        }
        w=w+1;
    }
}

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this
    }    
}
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}


function leftb(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "ArrowLeft",
        key : "ArrowLeft",
        shiftKey : false,
        keyCode : 37
    });
    document.dispatchEvent(e);
}
function rightb(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "ArrowRight",
        key : "ArrowRight",
        shiftKey : false,
        keyCode : 39
    });
    document.dispatchEvent(e);
}
function upb(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "ArrowUp",
        key : "ArrowUp",
        shiftKey : false,
        keyCode : 38
    });
    document.dispatchEvent(e);
}
function downb(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "ArrowDown",
        key : "ArrowDown",
        shiftKey : false,
        keyCode : 40
    });
    document.dispatchEvent(e);
}


window.addEventListener("keydown", function(event) {
    console.log(event);
  }, true);
