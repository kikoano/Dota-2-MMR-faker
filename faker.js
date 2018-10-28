const soloX = 1594; // 1621
const soloY = 200;

const emptyX = 1594;
const emptyY = 200;

const soloCommaX = 1602;
const soloCommaY = 209;

const partyX = 1594; //1621
const partyY = 222;

const partyCommaX = 1602;
const partyCommaY = 231;

const emptyMedalX = 264;
const emptyMedalY = 179;

const medalX = 276;
const medalY = 187;

//real witdh on 1,7 is 7 
let images = new Map();
for (let i = 0; i <= 9; i++) {
  images.set(i.toString(), new Image());
  images.get(i.toString()).src = "images/numbers/" + i.toString() + ".png";
}
images.set(",", new Image());
images.get(",").src = "images/numbers/,.png";
images.set("empty", new Image());
images.get("empty").src = "images/empty.png";
images.set("empty medal", new Image());
images.get("empty medal").src = "images/empty medal.png";
images.set("immortal1000", new Image());
images.get("immortal1000").src = "images/medals/immortal1000.png";

let previewImage = new Image();

let solo;
let party;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;

let len = images.size;
let counter = 0;
let drawImages = false;

images.forEach((val, key) => {
  console.log(key, val);
  val.addEventListener('load', incrementCounter, false);
});

function incrementCounter() {
  counter++;
  if (counter === len) {
    drawImages = true;
    console.log("All images loaded!");
  }
}

function updateImage() {
  if (drawImages && previewImage.complete) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(previewImage, 0, 0);
    ctx.drawImage(images.get("empty"), emptyX, emptyY);
    ctx.drawImage(images.get("empty medal"), emptyMedalX, emptyMedalY);
    ctx.drawImage(images.get("immortal1000"), medalX, medalY);
    if (solo > 999)
      ctx.drawImage(images.get(","), soloCommaX, soloCommaY);
    if (party > 999)
      ctx.drawImage(images.get(","), partyCommaX, partyCommaY);

    let shift = 4 - solo.length;
    let space = 0;
    for (let i = 0; i < 4; i++) {
      if (i == 1)
        space = 3;
      ctx.drawImage(images.get(solo[i]), soloX + 8 * i + space + shift * 8, soloY);
    }
    shift = 4 - party.length;
    space = 0;
    for (let i = 0; i < 4; i++) {
      if (i == 1)
        space = 3;
      ctx.drawImage(images.get(party[i]), partyX + 8 * i + space + shift * 8, partyY);
    }
  }
}

document.getElementById("fileInput").addEventListener("change", function () {
  var file = this.files[0];
  window.URL = window.URL || window.webkitURL;
  var blobURL = window.URL.createObjectURL(file);
  previewImage.src = blobURL;

  document.getElementById("solo").disabled = false;
  document.getElementById("party").disabled = false;
});
function validateMMR(mmr) {
  var regex = /^[1-9][0-9]*$/;
  if (regex.test(mmr) && mmr > 0 && mmr < 10000)
    return true;
  return false;
}
/*[...document.getElementsByClassName("mmr")].forEach((elem, index) => {
  elem.addEventListener("input", e => {
    if (!validateMMR(e.target.value))
      e.target.value = e.target.value.substring(0, e.target.value.length - 1);
  });
});*/
for (elem of document.getElementsByClassName("mmr")) {
  elem.addEventListener("input", e => {
    if (!validateMMR(e.target.value))
      e.target.value = e.target.value.substring(0, e.target.value.length - 1);
    else {
      if (e.target.id == "solo")
        solo = e.target.value;
      else
        party = e.target.value;
      updateImage();
    }
  });
}

