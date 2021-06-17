# Poan

Poan is an interactive audiovisual work. **Click [here](https://ilginicozu.github.io/poan/)** to see the work.

### Introductions

Mouse Click = Starts the composition.

Mouse X axis = Changes the number of recursioned circles.

Mouse Y axis = Applies a lowpass filter to the composition.

**Find your sweetspot and enjoy!**

![Image of Yaktocat](https://github.com/IlginIcozu/poan/blob/main/poan.png)


## Description of the Work

Poan is an audio-reactive work. Recursive circles, animated waveforms (generated by fft analysis) and a grayscale color palatte are used to form a minimalistic feel.

Since Poan is an audio-reactive work, a new piece could be composed and replaced with the current one. Simply copy your composition to the folder and replace the name of the existing file. For example; 

```javascript
function preload(){
  file1 = loadSound("den4.mp3");  /// Change den4.mp3 to your file name and type.
}
```
You can tweak these parameters to adjust the audio-reactivity according to your composition;

```javascript
  let circleSize = 600;  /// Change this one to adjust the middle circle size
  let shake = 50;        /// Change this one to adjust the circles' x axis movement density.
 
  let d = map(vol, 0, 0.5, 5, circleSize);
  let tit = map(vol, 0, 0.5, 0, shake);
```
