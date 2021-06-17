let file1;
let file2;
let file3;
let slider;
let sliderRate;
let button1;
let button2;
let button3;
let amp;
let lpf;


function preload(){
  file1 = loadSound("den4.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  amp = new p5.Amplitude(); 
  fft = new p5.FFT();
  background(29);
  angleMode(DEGREES)
  lpf = new p5.Filter('lowpass');
  lpf.process(file1);
}


function mousePressed() {
  if (!file1.isPlaying()) {
    file1.play();
    file1.setVolume(0.5);
  } else {
    file1.stop();
  }
}


function draw() {

  background(29);


  lpf.freq(map(mouseY, 0, height, 4000, 0));


  let vol = amp.getLevel();
  let d = map(vol, 0, 0.5, 5, 600);
  let tit = map(vol, 0, 0.5, 0, 50);
  let wid = map(mouseX, 0, width, width / 2 - 20, width / 2 + 20);
  let alpMult2 = map(vol, 0, 0.5, 2, 3);
  let alpMult = map(mouseX, 0, width, 6, 1);
  let alpha = map(vol, 0, 0.5, 0, 300)


  let spe = fft.analyze();
  let freq = fft.getEnergy(100);
  let d2 = map(vol, 0, 0.5, 2, 700);
 


  strokeWeight(1);
  stroke(233);
  noFill();
  rec(d, tit, alpMult, alpMult2);
  fill(map(freq, 0, 255, 255, 100));
  ellipse(width / 2, height / 2, d2);



  //// FFT Analyses waveform

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(29);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, width / 2 - d2 / 2, width / 2 + d2 / 2);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();

  beginShape();
  stroke(233, alpha);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, windowWidth);
    let y = map(waveform[i], -1, 1, 0, windowHeight);
    vertex(x, y);
  }
  endShape();

  beginShape();
  stroke(233, alpha);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, windowHeight);
    let y = map(waveform[i], -1, 1, 0, windowWidth);
    vertex(y, x);
  }
  endShape();
}


function rec(di, ti, alp, alp2) {
  for (var i = 0; i < 2000; i = i + 20) {
    stroke(233, 255 - i / alp * alp2)
    let x = width/2 + ti * floor(random(-1,1));
    ellipse(x, height / 2, di + i);
  }
}
