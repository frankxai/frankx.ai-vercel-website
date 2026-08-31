'use client';

import React, { useState, useEffect, useRef } from 'react';

interface StemChannel {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  volume: number; // 0.0 - 1.0
  muted: boolean;
  frequencyDescription: string;
}

export default function AmbientStemMixer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.7);
  const [activePreset, setActivePreset] = useState<string>('Deep Focus');
  const [stems, setStems] = useState<StemChannel[]>([
    {
      id: 'solar',
      name: 'Solar Resonance',
      subtitle: '432 Hz Harmonic Drone',
      color: 'from-amber-400 to-amber-600',
      volume: 0.65,
      muted: false,
      frequencyDescription: '432 Hz Root + 648 Hz Perfect Fifth',
    },
    {
      id: 'shimmer',
      name: 'Ethereal Shimmer',
      subtitle: 'Luminous High Chords',
      color: 'from-cyan-400 to-blue-600',
      volume: 0.5,
      muted: false,
      frequencyDescription: '864 Hz Octave + Shimmer Modulation',
    },
    {
      id: 'grounding',
      name: 'Sub-Bass Grounding',
      subtitle: '55 Hz Earth Frequency',
      color: 'from-rose-400 to-purple-600',
      volume: 0.6,
      muted: false,
      frequencyDescription: '55 Hz Pure Sine Sub-Octave',
    },
    {
      id: 'binaural',
      name: 'Binaural Alpha Flow',
      subtitle: '10 Hz Brainwave Entrainment',
      color: 'from-emerald-400 to-teal-600',
      volume: 0.75,
      muted: false,
      frequencyDescription: 'L: 216 Hz · R: 226 Hz (10 Hz Alpha Beat)',
    },
  ]);

  // Audio Context and Node references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const stemNodesRef = useRef<{
    solar?: { gain: GainNode; osc1: OscillatorNode; osc2: OscillatorNode };
    shimmer?: { gain: GainNode; osc: OscillatorNode; lfo: OscillatorNode; lfoGain: GainNode };
    grounding?: { gain: GainNode; osc: OscillatorNode };
    binaural?: {
      gain: GainNode;
      oscL: OscillatorNode;
      panL: StereoPannerNode;
      oscR: OscillatorNode;
      panR: StereoPannerNode;
    };
  }>({});

  const initAudioEngine = () => {
    if (audioCtxRef.current) return;

    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(masterVolume, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // 1. Solar Resonance (432Hz + 648Hz)
    const solarGain = ctx.createGain();
    solarGain.gain.setValueAtTime(stems[0].muted ? 0 : stems[0].volume * 0.15, ctx.currentTime);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    solarGain.connect(filter);
    filter.connect(masterGain);

    const solarOsc1 = ctx.createOscillator();
    solarOsc1.type = 'sine';
    solarOsc1.frequency.setValueAtTime(432, ctx.currentTime);
    solarOsc1.connect(solarGain);
    solarOsc1.start();

    const solarOsc2 = ctx.createOscillator();
    solarOsc2.type = 'triangle';
    solarOsc2.frequency.setValueAtTime(216, ctx.currentTime);
    solarOsc2.connect(solarGain);
    solarOsc2.start();

    // 2. Ethereal Shimmer (864Hz modulated)
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(stems[1].muted ? 0 : stems[1].volume * 0.08, ctx.currentTime);
    shimmerGain.connect(masterGain);

    const shimmerOsc = ctx.createOscillator();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.setValueAtTime(864, ctx.currentTime);

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.2, ctx.currentTime); // Slow 0.2Hz wave
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(8, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(shimmerOsc.frequency);
    lfo.start();

    shimmerOsc.connect(shimmerGain);
    shimmerOsc.start();

    // 3. Sub-Bass Grounding (55Hz)
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(stems[2].muted ? 0 : stems[2].volume * 0.25, ctx.currentTime);
    subGain.connect(masterGain);

    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(55, ctx.currentTime);
    subOsc.connect(subGain);
    subOsc.start();

    // 4. Binaural Alpha Beat (L: 216Hz, R: 226Hz -> 10Hz Alpha pulse)
    const binGain = ctx.createGain();
    binGain.gain.setValueAtTime(stems[3].muted ? 0 : stems[3].volume * 0.12, ctx.currentTime);
    binGain.connect(masterGain);

    const oscL = ctx.createOscillator();
    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(216, ctx.currentTime);
    const panL = ctx.createStereoPanner ? ctx.createStereoPanner() : (ctx as any).createPanner();
    if (panL.pan) panL.pan.setValueAtTime(-1, ctx.currentTime);
    oscL.connect(panL);
    panL.connect(binGain);
    oscL.start();

    const oscR = ctx.createOscillator();
    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(226, ctx.currentTime);
    const panR = ctx.createStereoPanner ? ctx.createStereoPanner() : (ctx as any).createPanner();
    if (panR.pan) panR.pan.setValueAtTime(1, ctx.currentTime);
    oscR.connect(panR);
    panR.connect(binGain);
    oscR.start();

    stemNodesRef.current = {
      solar: { gain: solarGain, osc1: solarOsc1, osc2: solarOsc2 },
      shimmer: { gain: shimmerGain, osc: shimmerOsc, lfo, lfoGain },
      grounding: { gain: subGain, osc: subOsc },
      binaural: { gain: binGain, oscL, panL, oscR, panR },
    };
  };

  const handleTogglePlay = async () => {
    if (!audioCtxRef.current) {
      initAudioEngine();
    }

    if (audioCtxRef.current?.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    if (isPlaying) {
      // Fade out
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(
          0.0001,
          audioCtxRef.current.currentTime,
          0.05
        );
      }
      setIsPlaying(false);
    } else {
      // Fade in
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(
          masterVolume,
          audioCtxRef.current.currentTime,
          0.05
        );
      }
      setIsPlaying(true);
    }
  };

  const handleMasterVolume = (val: number) => {
    setMasterVolume(val);
    if (masterGainRef.current && audioCtxRef.current && isPlaying) {
      masterGainRef.current.gain.setTargetAtTime(val, audioCtxRef.current.currentTime, 0.05);
    }
  };

  const handleStemVolume = (index: number, val: number) => {
    setStems((prev) => {
      const next = [...prev];
      next[index].volume = val;
      return next;
    });

    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const nodes = stemNodesRef.current;

    const baseMults = [0.15, 0.08, 0.25, 0.12];
    const targetGain = stems[index].muted ? 0 : val * baseMults[index];

    if (index === 0 && nodes.solar) nodes.solar.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
    if (index === 1 && nodes.shimmer) nodes.shimmer.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
    if (index === 2 && nodes.grounding) nodes.grounding.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
    if (index === 3 && nodes.binaural) nodes.binaural.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
  };

  const handleToggleMute = (index: number) => {
    setStems((prev) => {
      const next = [...prev];
      next[index].muted = !next[index].muted;
      return next;
    });

    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const nodes = stemNodesRef.current;
    const baseMults = [0.15, 0.08, 0.25, 0.12];
    const targetGain = !stems[index].muted ? 0 : stems[index].volume * baseMults[index];

    if (index === 0 && nodes.solar) nodes.solar.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
    if (index === 1 && nodes.shimmer) nodes.shimmer.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
    if (index === 2 && nodes.grounding) nodes.grounding.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
    if (index === 3 && nodes.binaural) nodes.binaural.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
  };

  const handleApplyPreset = (presetName: string) => {
    setActivePreset(presetName);
    let targetVols = [0.65, 0.5, 0.6, 0.75];

    if (presetName === 'Solar Awakening') {
      targetVols = [0.9, 0.4, 0.3, 0.5];
    } else if (presetName === 'Deep Focus') {
      targetVols = [0.5, 0.2, 0.8, 0.95];
    } else if (presetName === 'Cosmic Sanctuary') {
      targetVols = [0.6, 0.9, 0.5, 0.4];
    } else if (presetName === 'Silent Stillness') {
      targetVols = [0.3, 0.1, 0.4, 0.2];
    }

    targetVols.forEach((v, idx) => {
      handleStemVolume(idx, v);
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-[#07080B]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-amber-500/5 space-y-6">
      {/* Ambient gold glow */}
      <div className="absolute top-0 right-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-mono font-medium">
            <span>✨</span> Web Audio API 4-Stem Engine
          </div>
          <h3 className="text-xl font-bold text-white font-serif tracking-tight">
            The Ambient Stem Sanctuary
          </h3>
          <p className="text-xs text-amber-200/60 font-sans">
            Real-time procedural 432 Hz harmonic soundscape calibrated for reading and deep presence.
          </p>
        </div>

        {/* Master Play Button & Master Volume */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleTogglePlay}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
              isPlaying
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-amber-400/20 ring-2 ring-amber-400/30 animate-pulse'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-amber-500/10'
            }`}
          >
            <span>{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'Pause Ambient Stems' : 'Immerse in Stems'}</span>
          </button>

          {/* Master Volume */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-amber-400">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={masterVolume}
              onChange={(e) => handleMasterVolume(parseFloat(e.target.value))}
              className="w-20 accent-amber-400 h-1.5 rounded-lg cursor-pointer bg-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Soundscape Presets */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider whitespace-nowrap">
          Presets:
        </span>
        {['Deep Focus', 'Solar Awakening', 'Cosmic Sanctuary', 'Silent Stillness'].map((p) => (
          <button
            key={p}
            onClick={() => handleApplyPreset(p)}
            className={`px-3 py-1 text-xs font-mono rounded-lg transition-all whitespace-nowrap border ${
              activePreset === p
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* 4 Stems Mixing Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stems.map((stem, idx) => (
          <div
            key={stem.id}
            className={`p-4 rounded-2xl border transition-all ${
              stem.muted
                ? 'bg-slate-950/40 border-slate-900 opacity-60'
                : 'bg-slate-900/70 border-slate-800/80 shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-white font-serif">
                  {stem.name}
                </h4>
                <p className="text-[11px] text-amber-300/70 font-mono mt-0.5">
                  {stem.subtitle}
                </p>
              </div>
              <button
                onClick={() => handleToggleMute(idx)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-md border transition-colors ${
                  stem.muted
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {stem.muted ? 'Muted' : 'Active'}
              </button>
            </div>

            {/* Fader */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Fader</span>
                <span>{Math.round(stem.volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                disabled={stem.muted}
                value={stem.volume}
                onChange={(e) => handleStemVolume(idx, parseFloat(e.target.value))}
                className="w-full accent-amber-400 h-1.5 rounded-lg cursor-pointer bg-slate-800"
              />
              <p className="text-[10px] text-slate-500 font-mono pt-1 truncate">
                {stem.frequencyDescription}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-[11px] font-mono text-slate-500">
        <div>
          Tip: Listen with headphones to experience the 10 Hz binaural alpha brainwave beat.
        </div>
        <div className="text-amber-400/80">
          Zero downloads required · 100% Client-Side Web Audio
        </div>
      </div>
    </div>
  );
}
