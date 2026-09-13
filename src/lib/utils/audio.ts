/**
 * Web Audio API Acoustic Lounge Synthesizer.
 * Generates warm, low-frequency atmospheric chords in the client browser.
 * Zero external audio files or MP3 network bandwidth required.
 */
class AmbientLoungeSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying: boolean = false;

  private init(): void {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      this.ctx = new AudioCtxClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  /**
   * Starts playing the warm ambient harmonic background.
   */
  start(): void {
    this.init();
    if (!this.ctx || !this.masterGain || this.isPlaying) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Warm Major 9th chord frequencies: F2 (87.31Hz), A2 (110.00Hz), C3 (130.81Hz), E3 (164.81Hz), G3 (196.00Hz)
    const frequencies = [87.31, 110.0, 130.81, 164.81, 196.0];
    this.oscillators = [];

    const now = this.ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      // Soft sine waves with gentle triangle undertones
      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detune for rich analog chorus effect
      osc.detune.setValueAtTime((idx - 2) * 3, now);

      // Low volume per oscillator to prevent harshness
      const voiceGain = idx === 0 ? 0.08 : 0.04;
      gain.gain.setValueAtTime(voiceGain, now);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now);
      this.oscillators.push(osc);
    });

    // Smooth 3-second fade in
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(0.12, now + 3);

    this.isPlaying = true;
  }

  /**
   * Stops the ambient lounge sound with a smooth fade out.
   */
  stop(): void {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.5);

    setTimeout(() => {
      this.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1600);
  }

  toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  get playing(): boolean {
    return this.isPlaying;
  }
}

export const ambientSynth = new AmbientLoungeSynth();
