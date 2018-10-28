const soloX = 1594;
const soloY = 200;

const emptyX = 1594;
const emptyY = 200;

const soloCommaX = 1602;
const soloCommaY = 209;

const partyX = 1594;
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
for (let i = 1; i <= 38; i++) {
  images.set("m" + i.toString(), new Image());
  images.get("m" + i.toString()).src = "images/medals/" + i.toString() + ".png";
}
images.set(",", new Image());
images.get(",").src = "images/numbers/,.png";
images.set("empty", new Image());
images.get("empty").src = "images/empty.png";
images.set("empty medal", new Image());
images.get("empty medal").src = "images/empty medal.png";

let previewImage = new Image();

let solo;
let party;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;

let counter = 0;
let drawImages = false;

images.forEach((val, key) => {
  val.addEventListener('load', incrementCounter, false);
});

function incrementCounter() {
  counter++;
  if (counter === images.size) {
    drawImages = true;
    console.log("All images loaded!");
  }
}
function drawMMR(mmr, x, y, xx, yy) {
  if (mmr) {
    if (mmr.length > 3)
      ctx.drawImage(images.get(","), xx, yy);
    let shift = 4 - mmr.length;
    let space = 0;
    for (let i = 0; i < mmr.length; i++) {
      if (i == 1 && mmr.length > 3)
        space = 3;
      ctx.drawImage(images.get(mmr[i]), x + 8 * i + space + shift * 8, y);
    }
  }
}
function drawMedal() {
  ctx.drawImage(images.get("empty medal"), emptyMedalX, emptyMedalY);
  let mmr = solo;
  if (Number(party) > Number(solo)) {
    if(solo >= 4800)
     mmr = solo;
    else if (party >= 4800)
      mmr = 4800;
    else
      mmr = party
  }
  if (mmr < 160)
    ctx.drawImage(images.get("m1"), medalX, medalY);
  else if (mmr > 5600 && mmr <= 7400)
    ctx.drawImage(images.get("m36"), medalX, medalY);
  else if (mmr > 7400 && mmr <= 7800)
    ctx.drawImage(images.get("m37"), medalX, medalY);
  else if (mmr > 7800)
    ctx.drawImage(images.get("m38"), medalX, medalY);
  else {
    let medal = Math.ceil(mmr / 160);
    ctx.drawImage(images.get("m" + medal), medalX, medalY);
  }
}

function updateImage() {
  if (drawImages && previewImage.complete) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(previewImage, 0, 0);
    ctx.drawImage(images.get("empty"), emptyX, emptyY);
    drawMMR(solo, soloX, soloY, soloCommaX, soloCommaY);
    drawMMR(party, partyX, partyY, partyCommaX, partyCommaY);
    drawMedal();
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
/*[...document.getElementsByClassName("mmr")].forEach((elem, index) => {
  elem.addEventListener("input", e => {
    if (!validateMMR(e.target.value))
      e.target.value = e.target.value.substring(0, e.target.value.length - 1);
  });
});*/
for (elem of document.getElementsByClassName("mmr")) {
  elem.addEventListener("input", e => {
    if (e.target.value < 0)
      e.target.value = 1;
    else if (e.target.value > 9999){
      let temp =e.target.value;
      e.target.value = temp.substring(0,temp.length-1);
    }
    else {
      if (e.target.id == "solo")
        solo = e.target.value;
      else
        party = e.target.value;
      updateImage();
    }
  });
}

