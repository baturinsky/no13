let _audC = new (window.AudioContext || window.webkitAudioContext);
let _aud_MV = 10; //master volumne

export default class Tone {
  oscillator:OscillatorNode;
  current:number
  gain:GainNode;

  constructor(length, type?) {
    this.current = _audC.currentTime;
    this.oscillator = _audC.createOscillator();
    this.gain = _audC.createGain();

    if (type) this.oscillator.type = type;
    this.oscillator.frequency.value = 0;
    this.gain.gain.value = 0;
    this.oscillator.connect(this.gain);
    this.gain.connect(_audC.destination);

    this.oscillator.start(0);
    this.oscillator.stop(this.current + length);
  }

  f(...args) {
    if (args.length == 1) { this.oscillator.frequency.value = args[0]; return this; }
    for (let i = 0; i < args.length; i += 1)
      this.oscillator.frequency.linearRampToValueAtTime(args[i], this.current + i / (args.length - 1) * length);
    return this;
  }

  v(...args) {
    if (args.length == 1) { this.gain.gain.value = args[0] * _aud_MV; return this; }
    for (let i = 0; i < args.length; i += 1)
      this.gain.gain.linearRampToValueAtTime(args[i] * _aud_MV, this.current + i / (args.length - 1) * length);
    return this;
  }

}

export function tone(...args){
  return new Tone(...args);
}
