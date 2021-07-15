var initvalue = 3;
var volumelevel = 1;
var paneltoken = false;
var searchtoken = false;
var thumbnails_index = 0;

function sendfirstinfo() {
  console.log("first connection");
  let url = window.location.href;
  if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?(\?app\=desktop)?$/.test(
      url
    )
  ) {
    chrome.runtime.sendMessage({
      firstc: true,
      msg: "panelscreen",
    });
  } else if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?watch/.test(url)
  ) {
    chrome.runtime.sendMessage({
      firstc: true,
      msg: "videoscreen",
      speed: document.getElementsByTagName("video")[0].playbackRate,
      volume: document.getElementsByClassName("video-stream")[0].volume,
      playcounter: document
        .getElementsByClassName("ytp-play-button")[0]
        .attributes["aria-label"].nodeValue.slice(0, -4),
    });
    initvalue = document.getElementsByTagName("video")[0].playbackRate * 4 - 1;
    volumelevel = document.getElementsByClassName("video-stream")[0].volume;
  } else if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?results\?search\_query\=/.test(
      url
    )
  ) {
    chrome.runtime.sendMessage({
      firstc: true,
      msg: "searchscreen",
    });
  }
}

function sendinfo() {
  console.log("later connection");
  let url = window.location.href;
  if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?(\?app\=desktop)?$/.test(
      url
    )
  ) {
    chrome.runtime.sendMessage({
      firstc: false,
      msg: "panelscreen",
    });
  } else if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?watch/.test(url)
  ) {
    chrome.runtime.sendMessage({
      firstc: false,
      msg: "videoscreen",
      playcounter: document
        .getElementsByClassName("ytp-play-button")[0]
        .attributes["aria-label"].nodeValue.slice(0, -4),
    });
  } else if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?results\?search\_query\=/.test(
      url
    )
  ) {
    chrome.runtime.sendMessage({
      firstc: false,
      msg: "searchscreen",
    });
  }
}

let lastUrl = location.href;
sendinfo();
// console.log("sent initial");

new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    sendinfo();
  }
}).observe(document, { subtree: true, childList: true });

var vidopanels;
var panelcounter;
var carrotbutton;
let columnnum = 1;
var muted = 0;
var carrot = false;

function setcolumn() {
  if (window.innerWidth > 1143) {
    columnnum = 4;
  } else if (window.innerWidth > 887) {
    columnnum = 3;
  } else {
    columnnum = 2;
  }
}
window.addEventListener("resize", setcolumn);
setcolumn();
function panelscreen() {
  paneltoken = true;
  console.log("panels");
  carrotbutton = document.querySelectorAll(
    "ytd-button-renderer#show-more-button"
  );
  for (let i of carrotbutton) {
    i.style.padding = "2px 0px 0px 0px";
    i.style.borderBottom = "6px solid red";
  }
  var carrottoken = 0;
  var carrotarray = new Array(carrotbutton.length);
  for (let index = 0; index < carrotbutton.length; index++) {
    carrotarray[index] = index;
  }
  carrot = false;
  panelcounter = 0;
  videopanels = document.querySelectorAll("ytd-rich-item-renderer");
  videopanels[panelcounter].style.borderBottom = "6px solid dodgerblue";
  let videomarginb = parseFloat(
    getComputedStyle(videopanels[panelcounter], null)
      .getPropertyValue("margin-bottom")
      .slice(0, -2)
  );
  let newvideomarginb = videomarginb - 6;
  videopanels[panelcounter].style.marginBottom = newvideomarginb + "px";
  videopanels[panelcounter].scrollIntoView({ block: "center" });
  window.addEventListener(
    "keydown",
    function (event) {
      if (carrot) {
        carrotbutton[carrotarray[carrottoken]].style.borderBottom =
          "6px solid red";
        if (event.code === "ArrowDown") {
          let x = panelcounter % columnnum;
          while (videopanels[panelcounter].offsetTop == 0) {
            panelcounter++;
          }
          panelcounter += x;
          carrottoken++;
        } else if (event.code === "ArrowUp") {
          let x = panelcounter % columnnum;
          while (videopanels[panelcounter].offsetTop == 0) {
            panelcounter -= 1;
          }
          panelcounter = panelcounter + x + 1 - columnnum;
        } else if (event.code === "ArrowLeft") {
          while (videopanels[panelcounter].offsetTop == 0) {
            panelcounter -= 1;
          }
        } else if (event.code === "ArrowRight") {
          while (videopanels[panelcounter].offsetTop == 0) {
            panelcounter++;
          }
          carrottoken++;
        } else if (event.code === "Enter") {
          let x = panelcounter % columnnum;
          while (videopanels[panelcounter].offsetTop == 0) {
            panelcounter -= 1;
          }
          panelcounter = panelcounter + x + 1;
          carrotbutton[carrotarray[carrottoken]].click();
          carrotarray.splice(carrottoken, 1);
          console.log(carrotarray[carrottoken]);
        }
        carrot = false;
        videopanels[panelcounter].scrollIntoView({ block: "center" });
        videomarginb = parseFloat(
          getComputedStyle(videopanels[panelcounter], null)
            .getPropertyValue("margin-bottom")
            .slice(0, -2)
        );
        newvideomarginb = videomarginb - 6;
        videopanels[panelcounter].style.marginBottom = newvideomarginb + "px";
        videopanels[panelcounter].style.borderBottom = "6px solid dodgerblue";
      } else {
        videopanels = document.querySelectorAll("ytd-rich-item-renderer");
        videopanels[panelcounter].style.borderBottom = "none";
        videopanels[panelcounter].style.marginBottom = videomarginb + "px";
        var z = false;
        if (event.code === "ArrowDown") {
          panelcounter += columnnum;
        } else if (event.code === "ArrowUp") {
          panelcounter -= columnnum;
          z = true;
        } else if (event.code === "ArrowLeft") {
          panelcounter -= 1;
          z = true;
        } else if (event.code === "ArrowRight") {
          panelcounter += 1;
        }
        if (panelcounter < 0) {
          panelcounter = 0;
        }
        if (videopanels[panelcounter].offsetTop == 0) {
          if (z) {
            carrottoken -= 1;
          }
          carrotbutton[carrotarray[carrottoken]].style.borderBottom =
            "6px solid dodgerblue";
          carrot = true;
        } else {
          videopanels[panelcounter].scrollIntoView({ block: "center" });
          videomarginb = parseFloat(
            getComputedStyle(videopanels[panelcounter], null)
              .getPropertyValue("margin-bottom")
              .slice(0, -2)
          );
          newvideomarginb = videomarginb - 6;
          videopanels[panelcounter].style.marginBottom = newvideomarginb + "px";
          videopanels[panelcounter].style.borderBottom = "6px solid dodgerblue";
        }
      }
      event.preventDefault();
    },
    true
  );
}

function searchscreen() {
  searchtoken=true;
  var thumbnails = document.querySelectorAll("#thumbnail");
  thumbnails.forEach(
    (Element) => (Element.parentElement.parentElement.style.borderRight = "")
  );
  let search_keys = { 37: -1, 38: -1, 39: +1, 40: +1 };
  let more = false;
  let ele;
  let moreele;
  let up;
  thumbnails[thumbnails_index].parentElement.parentElement.style.borderRight =
    "6px solid dodgerblue";
  function doelse() {
    if (more) {
      thumbnails_index -= search_keys[event.keyCode];
      more = false;
    }
    thumbnails_index += search_keys[event.keyCode];
    if (thumbnails_index < 0) thumbnails_index = 0;
    if (thumbnails_index < thumbnails.length) {
      thumbnails[
        thumbnails_index
      ].parentElement.parentElement.style.borderRight = "6px solid dodgerblue";
      thumbnails[thumbnails_index].scrollIntoView({
        block: "center",
        behaviour: "smooth",
      });
    }
    thumbnails = document.querySelectorAll("#thumbnail");
  }

  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.code === "Enter") {
      if (more) {
        moreele.firstElementChild.click();
        thumbnails = document.querySelectorAll("#thumbnail");
        if (!up) thumbnails_index += 1;
        else {
        }
        thumbnails[
          thumbnails_index
        ].parentElement.parentElement.style.borderRight =
          "6px solid dodgerblue";
        thumbnails[thumbnails_index].scrollIntoView({
          block: "center",
          behaviour: "smooth",
        });

        more = false;
      } else this.document.location=thumbnails[thumbnails_index].href;
    } else if (
      event.keyCode == 37 ||
      event.keyCode == 38 ||
      event.keyCode == 39 ||
      event.keyCode == 40
    ) {
      thumbnails[
        thumbnails_index
      ].parentElement.parentElement.style.borderRight = "";
      if (more) {
        thumbnails_index += search_keys[event.keyCode];
        document
          .querySelectorAll("div#more")
          .forEach((Element) => (Element.style.borderBottom = ""));
      }

      if (
        thumbnails[
          thumbnails_index
        ].parentElement.parentElement.nodeName.toLowerCase() ===
        "ytd-playlist-renderer"
      ) {
        ele = thumbnails[thumbnails_index].parentElement.parentElement;
      } else {
        ele =
          thumbnails[thumbnails_index].parentElement.parentElement
            .parentElement;
      }

      if (
        ele.parentElement.nextElementSibling !== null &&
        search_keys[event.keyCode] == +1
      ) {
        if (
          ele.parentElement.lastElementChild == ele &&
          ele.parentElement.nextElementSibling.id == "more" &&
          ele.parentElement.nextElementSibling.getAttribute("hidden") != ""
        ) {
          ele.parentElement.nextElementSibling.style.borderBottom =
            "6px solid dodgerblue";
          more = true;
          moreele = ele.parentElement.nextElementSibling;
          up = false;
        } else doelse();
      } else if (
        ele.previousElementSibling !== null &&
        search_keys[event.keyCode] == -1
      ) {
        if (
          ele.previousElementSibling.nodeName.toLowerCase() ==
            "ytd-shelf-renderer" &&
          ele.previousElementSibling.firstElementChild.children[1].firstElementChild.children[1].getAttribute(
            "hidden"
          ) != ""
        ) {
          console.log("entered");
          var shelf = ele.previousElementSibling;
          shelf.firstElementChild.children[1].firstElementChild.children[1].style.borderBottom =
            "6px solid dodgerblue";
          more = true;
          moreele =
            shelf.firstElementChild.children[1].firstElementChild.children[1];
          up = true;
        } else doelse();
      } else doelse();
    }
  });
}

function volumeset() {
  document.getElementsByClassName("video-stream")[0].volume = volumelevel;
  console.log(volumelevel);
}
function videoscreen() {
  setInterval(volumeset, 50);
}

function volup() {
  volumelevel += 0.1;
  volumelevel = Math.min(1, volumelevel);
  volumeset();
}
function voldown() {
  volumelevel -= 0.1;
  volumelevel = Math.max(0, volumelevel);
  volumeset();
}

function screene() {
  console.log("fullscreen dabaya tha");
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyF",
    key: "f",
    shiftKey: false,
    keyCode: 70,
  });
  document.dispatchEvent(e);
}
function vol() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyM",
    key: "m",
    shiftKey: false,
    keyCode: 77,
  });
  document.dispatchEvent(e);
}
function stepback() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyP",
    key: "P",
    shiftKey: true,
    keyCode: 80,
  });
  document.dispatchEvent(e);
}
function stepfor() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyN",
    key: "N",
    shiftKey: true,
    keyCode: 78,
  });
  document.dispatchEvent(e);
  //setTimeout(volumeset,1000);
}

function leftbutton() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "ArrowLeft",
    key: "ArrowLeft",
    shiftKey: false,
    keyCode: 37,
  });
  document.dispatchEvent(e);
}
function rightbutton() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "ArrowRight",
    key: "ArrowRight",
    shiftKey: false,
    keyCode: 39,
  });
  document.dispatchEvent(e);
}
function upbutton() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "ArrowUp",
    key: "ArrowUp",
    shiftKey: false,
    keyCode: 38,
  });
  document.dispatchEvent(e);
}
function downbutton() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "ArrowDown",
    key: "ArrowDown",
    shiftKey: false,
    keyCode: 40,
  });
  document.dispatchEvent(e);
}

function caption() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyC",
    key: "c",
    shiftKey: false,
    keyCode: 67,
  });
  document.dispatchEvent(e);
}

function changeback() {
  window.history.back();
  // setTimeout(volumeset,1000);
}
function changeselect() {
  if (carrot == true) {
    var e = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      charCode: "0",
      code: "Enter",
      key: "Enter",
      shiftKey: false,
      keyCode: 13,
    });
    document.dispatchEvent(e);
  } else {
    this.document.location = videopanels[panelcounter].querySelector("a").href;
  }
  // setTimeout(volumeset,1000);
}
function searchselect() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "Enter",
    key: "Enter",
    shiftKey: false,
    keyCode: 13,
  });
  document.dispatchEvent(e);
}
function youtube() {
  this.document.location = "https://www.youtube.com/";
}
function youtubesearch(searchquery) {
  thumbnails_index=0;
  searchtoken=false;
  this.document.location = `https://www.youtube.com/results?search_query=${searchquery}`;
}
function changeplay() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyK",
    key: "k",
    shiftKey: false,
    keyCode: 75,
  });
  document.dispatchEvent(e);
}

function speed(rangeSliderValue) {
  console.log(initvalue, rangeSliderValue);
  if (rangeSliderValue > initvalue) {
    var e = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      charCode: "0",
      code: "Period",
      key: ">",
      shiftKey: true,
      keyCode: 190,
    });
    for (let i = 0; i < rangeSliderValue - initvalue; i++) {
      console.log("hi hi hi increased");
      document.dispatchEvent(e);
    }
  } else {
    var e = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      charCode: "0",
      code: "Comma",
      key: "<",
      shiftKey: true,
      keyCode: 188,
    });
    for (let i = 0; i < initvalue - rangeSliderValue; i++) {
      console.log("hi hi hi decreased");
      document.dispatchEvent(e);
    }
  }
  initvalue = rangeSliderValue;
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, _sender, sendResponse) {
  if (message === "stepback") {
    stepback();
  } else if (message === "stepfor") {
    stepfor();
  } else if (message === "leftbutton") {
    leftbutton();
  } else if (message === "rightbutton") {
    rightbutton();
  } else if (message === "upbutton") {
    upbutton();
  } else if (message === "downbutton") {
    downbutton();
  } else if (message === "caption") {
    caption();
  } else if (message === "screene") {
    screene();
  } else if (message === "vol") {
    vol();
  } else if (message === "changeplay") {
    changeplay();
  } else if (message === "changeselect") {
    changeselect();
  } else if (message === "changeback") {
    changeback();
  } else if (message === "volup") {
    volup();
  } else if (message === "voldown") {
    voldown();
  } else if (message === "panelscreen") {
    searchtoken = false;
    if (paneltoken === false) {
      panelscreen();
    }
  } else if (message === "searchscreen") {
    paneltoken = false;
    console.log(searchtoken);
    if (searchtoken === false) {
      searchscreen();
    }
  } else if (message === "videoscreen") {
    sear = false;
    paneltoken = false;
    videoscreen();
  } else if (message === "youtube") {
    youtube();
  } else if (message === "searchselect") {
    searchselect();
  } else if (message.split(",")[0] == "speed") {
    speed(Number(message.split(",")[1]));
  } else if (message === "sendMeURL") {
    sendfirstinfo();
  } else if (message.split(",")[0] == "volume") {
    volumelevel = Number(message.split(",")[1]);
    console.log(volumelevel);
    console.log("Bring it on");
  } else if (message.split(",")[0] == "speedlevel") {
    initvalue = Number(message.split(",")[1]);
  } else if (message.split(",")[0] == "search") {
    let searchquery = message.split(",")[1];
    searchquery = encodeURIComponent(searchquery);
    youtubesearch(searchquery);
  }
}

var d = new Date();
console.log("Content Scripts Working " + d.toLocaleTimeString());


