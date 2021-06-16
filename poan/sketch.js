let file1;
let file2;
let file3;
let slider;
let sliderRate;
let button1;
let button2;
let button3;
let amp;
let xoff = 0;
let yoff = 0;
let zoff = 0;
let inc = 1;
let lpf;


function preload(){
  file1 = loadSound("den4.mp3");
}

function setup() {
  createCanvas(800, 800);
  
  //slider = createSlider(0,1, 0.5, 0.01);
  amp = new p5.Amplitude();
  //sliderRate = createSlider(0, 3,1, 0.01);
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
    // button1.html("stop");
  } else {
    file1.stop();
    //button1.html("play");
  }
}




function draw() {

  background(29);


  lpf.freq(map(mouseY, 0, height, 4000, 0));
  xoff += 0.001;
  yoff += 0.01;
  zoff += 0.001;
  //song.setVolume(slider.value());

  // background(file3.currentTime());
  //let pan = file3.getPan();

  let vol = amp.getLevel();
  let d = map(vol, 0, 0.5, 5, 600);
  let tit = map(vol, 0, 0.5, 0, 50);
  let wid = map(mouseX, 0, width, width / 2 - 20, width / 2 + 20);
  let alpMult2 = map(vol, 0, 0.5, 2, 3);
  let alpMult = map(mouseX, 0, width, 4, 1);
  let alpha = map(vol, 0, 0.5, 0, 300)
  //let pa = map(pan, -1, 1, -20, 20);

  let spe = fft.analyze();

  let freq = fft.getEnergy(100);



  let d2 = map(vol, 0, 0.5, 2, 700);
  //map(noise(xoff, yoff, zoff), 0,1, 29, 49)


  strokeWeight(1);
  stroke(233);
  noFill();
  rec(d, tit, alpMult, alpMult2);
  fill(map(freq, 0, 255, 255, 100));
  ellipse(width / 2, height / 2, d2);





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
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();

  beginShape();
  stroke(233, alpha);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(y, x);
  }
  endShape();



}

function rec(di, ti, alp, alp2) {
  for (var i = 0; i < 600; i = i + 20) {

    stroke(233, 255 - i / alp * alp2)

    let x = random(width / 2 - ti, height / 2 + ti);
    //let y = random(height / 2 - ti, height / 2 + ti);
    ellipse(x, height / 2, di + i);
  }
}