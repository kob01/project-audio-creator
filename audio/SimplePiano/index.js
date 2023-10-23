import Audio_a0 from './a0.m4a'
import Audio_a0m from './a0m.m4a'
import Audio_a1 from './a1.m4a'
import Audio_a1m from './a1m.m4a'
import Audio_a2 from './a2.m4a'
import Audio_a2m from './a2m.m4a'
import Audio_a3 from './a3.m4a'
import Audio_a3m from './a3m.m4a'
import Audio_a4 from './a4.m4a'
import Audio_a4m from './a4m.m4a'
import Audio_a5 from './a5.m4a'
import Audio_a5m from './a5m.m4a'
import Audio_a6 from './a6.m4a'
import Audio_a6m from './a6m.m4a'
import Audio_a7 from './a7.m4a'
import Audio_a7m from './a7m.m4a'
import Audio_b0 from './b0.m4a'
import Audio_b1 from './b1.m4a'
import Audio_b2 from './b2.m4a'
import Audio_b3 from './b3.m4a'
import Audio_b4 from './b4.m4a'
import Audio_b5 from './b5.m4a'
import Audio_b6 from './b6.m4a'
import Audio_b7 from './b7.m4a'
import Audio_c1 from './c1.m4a'
import Audio_c1m from './c1m.m4a'
import Audio_c2 from './c2.m4a'
import Audio_c2m from './c2m.m4a'
import Audio_c3 from './c3.m4a'
import Audio_c3m from './c3m.m4a'
import Audio_c4 from './c4.m4a'
import Audio_c4m from './c4m.m4a'
import Audio_c5 from './c5.m4a'
import Audio_c5m from './c5m.m4a'
import Audio_c6 from './c6.m4a'
import Audio_c6m from './c6m.m4a'
import Audio_c7 from './c7.m4a'
import Audio_c7m from './c7m.m4a'
import Audio_c8 from './c8.m4a'
import Audio_d1 from './d1.m4a'
import Audio_d1m from './d1m.m4a'
import Audio_d2 from './d2.m4a'
import Audio_d2m from './d2m.m4a'
import Audio_d3 from './d3.m4a'
import Audio_d3m from './d3m.m4a'
import Audio_d4 from './d4.m4a'
import Audio_d4m from './d4m.m4a'
import Audio_d5 from './d5.m4a'
import Audio_d5m from './d5m.m4a'
import Audio_d6 from './d6.m4a'
import Audio_d6m from './d6m.m4a'
import Audio_d7 from './d7.m4a'
import Audio_d7m from './d7m.m4a'
import Audio_e1 from './e1.m4a'
import Audio_e2 from './e2.m4a'
import Audio_e3 from './e3.m4a'
import Audio_e4 from './e4.m4a'
import Audio_e5 from './e5.m4a'
import Audio_e6 from './e6.m4a'
import Audio_e7 from './e7.m4a'
import Audio_f1 from './f1.m4a'
import Audio_f1m from './f1m.m4a'
import Audio_f2 from './f2.m4a'
import Audio_f2m from './f2m.m4a'
import Audio_f3 from './f3.m4a'
import Audio_f3m from './f3m.m4a'
import Audio_f4 from './f4.m4a'
import Audio_f4m from './f4m.m4a'
import Audio_f5 from './f5.m4a'
import Audio_f5m from './f5m.m4a'
import Audio_f6 from './f6.m4a'
import Audio_f6m from './f6m.m4a'
import Audio_f7 from './f7.m4a'
import Audio_f7m from './f7m.m4a'
import Audio_g1 from './g1.m4a'
import Audio_g1m from './g1m.m4a'
import Audio_g2 from './g2.m4a'
import Audio_g2m from './g2m.m4a'
import Audio_g3 from './g3.m4a'
import Audio_g3m from './g3m.m4a'
import Audio_g4 from './g4.m4a'
import Audio_g4m from './g4m.m4a'
import Audio_g5 from './g5.m4a'
import Audio_g5m from './g5m.m4a'
import Audio_g6 from './g6.m4a'
import Audio_g6m from './g6m.m4a'
import Audio_g7 from './g7.m4a'
import Audio_g7m from './g7m.m4a'

const source = [
  { _id: 'SimplePiano', id: 'SimplePiano.A0', name: "A0", codeInclued: [["Digit1"]], codeMain: ["Digit1"], volume: 1, src: Audio_a0 },
  { _id: 'SimplePiano', id: 'SimplePiano.A0M', name: "A0M", codeInclued: [["Digit2"]], codeMain: ["Digit2"], volume: 1, src: Audio_a0m },
  { _id: 'SimplePiano', id: 'SimplePiano.B0', name: "B0", codeInclued: [["Digit3"]], codeMain: ["Digit3"], volume: 1, src: Audio_b0 },
  { _id: 'SimplePiano', id: 'SimplePiano.C1', name: "C1", codeInclued: [['KeyR', 'KeyA']], codeExclude: ["Space"], codeMain: ['KeyR', 'KeyA'], volume: 1, src: Audio_c1 },
  { _id: 'SimplePiano', id: 'SimplePiano.C1M', name: "C1M", codeInclued: [["Space", 'KeyR', 'KeyA']], codeExclude: [], codeMain: ['KeyR', 'KeyA'], volume: 1, src: Audio_c1m },
  { _id: 'SimplePiano', id: 'SimplePiano.D1', name: "D1", codeInclued: [['KeyT', 'KeyA']], codeExclude: ["Space"], codeMain: ['KeyT', 'KeyA'], volume: 1, src: Audio_d1 },
  { _id: 'SimplePiano', id: 'SimplePiano.D1M', name: "D1M", codeInclued: [["Space", 'KeyT', 'KeyA']], codeExclude: [], codeMain: ['KeyT', 'KeyA'], volume: 1, src: Audio_d1m },
  { _id: 'SimplePiano', id: 'SimplePiano.E1', name: "E1", codeInclued: [['KeyY', 'KeyA']], codeExclude: ["Space"], codeMain: ['KeyY', 'KeyA'], volume: 1, src: Audio_e1 },
  { _id: 'SimplePiano', id: 'SimplePiano.F1', name: "F1", codeInclued: [['KeyU', 'KeyA']], codeExclude: ["Space"], codeMain: ['KeyU', 'KeyA'], volume: 1, src: Audio_f1 },
  { _id: 'SimplePiano', id: 'SimplePiano.F1M', name: "F1M", codeInclued: [["Space", 'KeyU', 'KeyA']], codeExclude: [], codeMain: ['KeyU', 'KeyA'], volume: 1, src: Audio_f1m },
  { _id: 'SimplePiano', id: 'SimplePiano.G1', name: "G1", codeInclued: [['KeyI', 'KeyA']], codeExclude: ["Space"], codeMain: ['KeyI', 'KeyA'], volume: 1, src: Audio_g1 },
  { _id: 'SimplePiano', id: 'SimplePiano.G1M', name: "G1M", codeInclued: [["Space", 'KeyI', 'KeyA']], codeExclude: [], codeMain: ['KeyI', 'KeyA'], volume: 1, src: Audio_g1m },
  { _id: 'SimplePiano', id: 'SimplePiano.A1', name: "A1", codeInclued: [['KeyO', 'KeyA']], codeExclude: ["Space"], codeMain: ['KeyO', 'KeyA'], volume: 1, src: Audio_a1 },
  { _id: 'SimplePiano', id: 'SimplePiano.A1M', name: "A1M", codeInclued: [["Space", 'KeyO', 'KeyA']], codeExclude: [], codeMain: ['KeyO', 'KeyA'], volume: 1, src: Audio_a1m },
  { _id: 'SimplePiano', id: 'SimplePiano.B1', name: "B1", codeInclued: [['KeyP', 'KeyA']], codeExclude: ["Space"], codeMain: ['KeyP', 'KeyA'], volume: 1, src: Audio_b1 },
  { _id: 'SimplePiano', id: 'SimplePiano.C2', name: "C2", codeInclued: [['KeyR', 'KeyS']], codeExclude: ["Space"], codeMain: ['KeyR', 'KeyS'], volume: 1, src: Audio_c2 },
  { _id: 'SimplePiano', id: 'SimplePiano.C2M', name: "C2M", codeInclued: [["Space", 'KeyR', 'KeyS']], codeExclude: [], codeMain: ['KeyR', 'KeyS'], volume: 1, src: Audio_c2m },
  { _id: 'SimplePiano', id: 'SimplePiano.D2', name: "D2", codeInclued: [['KeyT', 'KeyS']], codeExclude: ["Space"], codeMain: ['KeyT', 'KeyS'], volume: 1, src: Audio_d2 },
  { _id: 'SimplePiano', id: 'SimplePiano.D2M', name: "D2M", codeInclued: [["Space", 'KeyT', 'KeyS']], codeExclude: [], codeMain: ['KeyT', 'KeyS'], volume: 1, src: Audio_d2m },
  { _id: 'SimplePiano', id: 'SimplePiano.E2', name: "E2", codeInclued: [['KeyY', 'KeyS']], codeExclude: ["Space"], codeMain: ['KeyY', 'KeyS'], volume: 1, src: Audio_e2 },
  { _id: 'SimplePiano', id: 'SimplePiano.F2', name: "F2", codeInclued: [['KeyU', 'KeyS']], codeExclude: ["Space"], codeMain: ['KeyU', 'KeyS'], volume: 1, src: Audio_f2 },
  { _id: 'SimplePiano', id: 'SimplePiano.F2M', name: "F2M", codeInclued: [["Space", 'KeyU', 'KeyS']], codeExclude: [], codeMain: ['KeyU', 'KeyS'], volume: 1, src: Audio_f2m },
  { _id: 'SimplePiano', id: 'SimplePiano.G2', name: "G2", codeInclued: [['KeyI', 'KeyS']], codeExclude: ["Space"], codeMain: ['KeyI', 'KeyS'], volume: 1, src: Audio_g2 },
  { _id: 'SimplePiano', id: 'SimplePiano.G2M', name: "G2M", codeInclued: [["Space", 'KeyI', 'KeyS']], codeExclude: [], codeMain: ['KeyI', 'KeyS'], volume: 1, src: Audio_g2m },
  { _id: 'SimplePiano', id: 'SimplePiano.A2', name: "A2", codeInclued: [['KeyO', 'KeyS']], codeExclude: ["Space"], codeMain: ['KeyO', 'KeyS'], volume: 1, src: Audio_a2 },
  { _id: 'SimplePiano', id: 'SimplePiano.A2M', name: "A2M", codeInclued: [["Space", 'KeyO', 'KeyS']], codeExclude: [], codeMain: ['KeyO', 'KeyS'], volume: 1, src: Audio_a2m },
  { _id: 'SimplePiano', id: 'SimplePiano.B2', name: "B2", codeInclued: [['KeyP', 'KeyS']], codeExclude: ["Space"], codeMain: ['KeyP', 'KeyS'], volume: 1, src: Audio_b2 },
  { _id: 'SimplePiano', id: 'SimplePiano.C3', name: "C3", codeInclued: [['KeyR', 'KeyD']], codeExclude: ["Space"], codeMain: ['KeyR', 'KeyD'], volume: 1, src: Audio_c3 },
  { _id: 'SimplePiano', id: 'SimplePiano.C3M', name: "C3M", codeInclued: [["Space", 'KeyR', 'KeyD']], codeExclude: [], codeMain: ['KeyR', 'KeyD'], volume: 1, src: Audio_c3m },
  { _id: 'SimplePiano', id: 'SimplePiano.D3', name: "D3", codeInclued: [['KeyT', 'KeyD']], codeExclude: ["Space"], codeMain: ['KeyT', 'KeyD'], volume: 1, src: Audio_d3 },
  { _id: 'SimplePiano', id: 'SimplePiano.D3M', name: "D3M", codeInclued: [["Space", 'KeyT', 'KeyD']], codeExclude: [], codeMain: ['KeyT', 'KeyD'], volume: 1, src: Audio_d3m },
  { _id: 'SimplePiano', id: 'SimplePiano.E3', name: "E3", codeInclued: [['KeyY', 'KeyD']], codeExclude: ["Space"], codeMain: ['KeyY', 'KeyD'], volume: 1, src: Audio_e3 },
  { _id: 'SimplePiano', id: 'SimplePiano.F3', name: "F3", codeInclued: [['KeyU', 'KeyD']], codeExclude: ["Space"], codeMain: ['KeyU', 'KeyD'], volume: 1, src: Audio_f3 },
  { _id: 'SimplePiano', id: 'SimplePiano.F3M', name: "F3M", codeInclued: [["Space", 'KeyU', 'KeyD']], codeExclude: [], codeMain: ['KeyU', 'KeyD'], volume: 1, src: Audio_f3m },
  { _id: 'SimplePiano', id: 'SimplePiano.G3', name: "G3", codeInclued: [['KeyI', 'KeyD']], codeExclude: ["Space"], codeMain: ['KeyI', 'KeyD'], volume: 1, src: Audio_g3 },
  { _id: 'SimplePiano', id: 'SimplePiano.G3M', name: "G3M", codeInclued: [["Space", 'KeyI', 'KeyD']], codeExclude: [], codeMain: ['KeyI', 'KeyD'], volume: 1, src: Audio_g3m },
  { _id: 'SimplePiano', id: 'SimplePiano.A3', name: "A3", codeInclued: [['KeyO', 'KeyD']], codeExclude: ["Space"], codeMain: ['KeyO', 'KeyD'], volume: 1, src: Audio_a3 },
  { _id: 'SimplePiano', id: 'SimplePiano.A3M', name: "A3M", codeInclued: [["Space", 'KeyO', 'KeyD']], codeExclude: [], codeMain: ['KeyO', 'KeyD'], volume: 1, src: Audio_a3m },
  { _id: 'SimplePiano', id: 'SimplePiano.B3', name: "B3", codeInclued: [['KeyP', 'KeyD']], codeExclude: ["Space"], codeMain: ['KeyP', 'KeyD'], volume: 1, src: Audio_b3 },
  { _id: 'SimplePiano', id: 'SimplePiano.C4', name: "C4", codeInclued: [['KeyR', 'KeyZ']], codeExclude: ["Space"], codeMain: ['KeyR', 'KeyZ'], volume: 1, src: Audio_c4 },
  { _id: 'SimplePiano', id: 'SimplePiano.C4M', name: "C4M", codeInclued: [["Space", 'KeyR', 'KeyZ']], codeExclude: [], codeMain: ['KeyR', 'KeyZ'], volume: 1, src: Audio_c4m },
  { _id: 'SimplePiano', id: 'SimplePiano.D4', name: "D4", codeInclued: [['KeyT', 'KeyZ']], codeExclude: ["Space"], codeMain: ['KeyT', 'KeyZ'], volume: 1, src: Audio_d4 },
  { _id: 'SimplePiano', id: 'SimplePiano.D4M', name: "D4M", codeInclued: [["Space", 'KeyT', 'KeyZ']], codeExclude: [], codeMain: ['KeyT', 'KeyZ'], volume: 1, src: Audio_d4m },
  { _id: 'SimplePiano', id: 'SimplePiano.E4', name: "E4", codeInclued: [['KeyY', 'KeyZ']], codeExclude: ["Space"], codeMain: ['KeyY', 'KeyZ'], volume: 1, src: Audio_e4 },
  { _id: 'SimplePiano', id: 'SimplePiano.F4', name: "F4", codeInclued: [['KeyU', 'KeyZ']], codeExclude: ["Space"], codeMain: ['KeyU', 'KeyZ'], volume: 1, src: Audio_f4 },
  { _id: 'SimplePiano', id: 'SimplePiano.F4M', name: "F4M", codeInclued: [["Space", 'KeyU', 'KeyZ']], codeExclude: [], codeMain: ['KeyU', 'KeyZ'], volume: 1, src: Audio_f4m },
  { _id: 'SimplePiano', id: 'SimplePiano.G4', name: "G4", codeInclued: [['KeyI', 'KeyZ']], codeExclude: ["Space"], codeMain: ['KeyI', 'KeyZ'], volume: 1, src: Audio_g4 },
  { _id: 'SimplePiano', id: 'SimplePiano.G4M', name: "G4M", codeInclued: [["Space", 'KeyI', 'KeyZ']], codeExclude: [], codeMain: ['KeyI', 'KeyZ'], volume: 1, src: Audio_g4m },
  { _id: 'SimplePiano', id: 'SimplePiano.A4', name: "A4", codeInclued: [['KeyO', 'KeyZ']], codeExclude: ["Space"], codeMain: ['KeyO', 'KeyZ'], volume: 1, src: Audio_a4 },
  { _id: 'SimplePiano', id: 'SimplePiano.A4M', name: "A4M", codeInclued: [["Space", 'KeyO', 'KeyZ']], codeExclude: [], codeMain: ['KeyO', 'KeyZ'], volume: 1, src: Audio_a4m },
  { _id: 'SimplePiano', id: 'SimplePiano.B4', name: "B4", codeInclued: [['KeyP', 'KeyZ']], codeExclude: ["Space"], codeMain: ['KeyP', 'KeyZ'], volume: 1, src: Audio_b4 },
  { _id: 'SimplePiano', id: 'SimplePiano.C5', name: "C5", codeInclued: [['KeyR', 'KeyX']], codeExclude: ["Space"], codeMain: ['KeyR', 'KeyX'], volume: 1, src: Audio_c5 },
  { _id: 'SimplePiano', id: 'SimplePiano.C5M', name: "C5M", codeInclued: [["Space", 'KeyR', 'KeyX']], codeExclude: [], codeMain: ['KeyR', 'KeyX'], volume: 1, src: Audio_c5m },
  { _id: 'SimplePiano', id: 'SimplePiano.D5', name: "D5", codeInclued: [['KeyT', 'KeyX']], codeExclude: ["Space"], codeMain: ['KeyT', 'KeyX'], volume: 1, src: Audio_d5 },
  { _id: 'SimplePiano', id: 'SimplePiano.D5M', name: "D5M", codeInclued: [["Space", 'KeyT', 'KeyX']], codeExclude: [], codeMain: ['KeyT', 'KeyX'], volume: 1, src: Audio_d5m },
  { _id: 'SimplePiano', id: 'SimplePiano.E5', name: "E5", codeInclued: [['KeyY', 'KeyX']], codeExclude: ["Space"], codeMain: ['KeyY', 'KeyX'], volume: 1, src: Audio_e5 },
  { _id: 'SimplePiano', id: 'SimplePiano.F5', name: "F5", codeInclued: [['KeyU', 'KeyX']], codeExclude: ["Space"], codeMain: ['KeyU', 'KeyX'], volume: 1, src: Audio_f5 },
  { _id: 'SimplePiano', id: 'SimplePiano.F5M', name: "F5M", codeInclued: [["Space", 'KeyU', 'KeyX']], codeExclude: [], codeMain: ['KeyU', 'KeyX'], volume: 1, src: Audio_f5m },
  { _id: 'SimplePiano', id: 'SimplePiano.G5', name: "G5", codeInclued: [['KeyI', 'KeyX']], codeExclude: ["Space"], codeMain: ['KeyI', 'KeyX'], volume: 1, src: Audio_g5 },
  { _id: 'SimplePiano', id: 'SimplePiano.G5M', name: "G5M", codeInclued: [["Space", 'KeyI', 'KeyX']], codeExclude: [], codeMain: ['KeyI', 'KeyX'], volume: 1, src: Audio_g5m },
  { _id: 'SimplePiano', id: 'SimplePiano.A5', name: "A5", codeInclued: [['KeyO', 'KeyX']], codeExclude: ["Space"], codeMain: ['KeyO', 'KeyX'], volume: 1, src: Audio_a5 },
  { _id: 'SimplePiano', id: 'SimplePiano.A5M', name: "A5M", codeInclued: [["Space", 'KeyO', 'KeyX']], codeExclude: [], codeMain: ['KeyO', 'KeyX'], volume: 1, src: Audio_a5m },
  { _id: 'SimplePiano', id: 'SimplePiano.B5', name: "B5", codeInclued: [['KeyP', 'KeyX']], codeExclude: ["Space"], codeMain: ['KeyP', 'KeyX'], volume: 1, src: Audio_b5 },
  { _id: 'SimplePiano', id: 'SimplePiano.C6', name: "C6", codeInclued: [['KeyR', 'KeyC']], codeExclude: ["Space"], codeMain: ['KeyR', 'KeyC'], volume: 1, src: Audio_c6 },
  { _id: 'SimplePiano', id: 'SimplePiano.C6M', name: "C6M", codeInclued: [["Space", 'KeyR', 'KeyC']], codeExclude: [], codeMain: ['KeyR', 'KeyC'], volume: 1, src: Audio_c6m },
  { _id: 'SimplePiano', id: 'SimplePiano.D6', name: "D6", codeInclued: [['KeyT', 'KeyC']], codeExclude: ["Space"], codeMain: ['KeyT', 'KeyC'], volume: 1, src: Audio_d6 },
  { _id: 'SimplePiano', id: 'SimplePiano.D6M', name: "D6M", codeInclued: [["Space", 'KeyT', 'KeyC']], codeExclude: [], codeMain: ['KeyT', 'KeyC'], volume: 1, src: Audio_d6m },
  { _id: 'SimplePiano', id: 'SimplePiano.E6', name: "E6", codeInclued: [['KeyY', 'KeyC']], codeExclude: ["Space"], codeMain: ['KeyY', 'KeyC'], volume: 1, src: Audio_e6 },
  { _id: 'SimplePiano', id: 'SimplePiano.F6', name: "F6", codeInclued: [['KeyU', 'KeyC']], codeExclude: ["Space"], codeMain: ['KeyU', 'KeyC'], volume: 1, src: Audio_f6 },
  { _id: 'SimplePiano', id: 'SimplePiano.F6M', name: "F6M", codeInclued: [["Space", 'KeyU', 'KeyC']], codeExclude: [], codeMain: ['KeyU', 'KeyC'], volume: 1, src: Audio_f6m },
  { _id: 'SimplePiano', id: 'SimplePiano.G6', name: "G6", codeInclued: [['KeyI', 'KeyC']], codeExclude: ["Space"], codeMain: ['KeyI', 'KeyC'], volume: 1, src: Audio_g6 },
  { _id: 'SimplePiano', id: 'SimplePiano.G6M', name: "G6M", codeInclued: [["Space", 'KeyI', 'KeyC']], codeExclude: [], codeMain: ['KeyI', 'KeyC'], volume: 1, src: Audio_g6m },
  { _id: 'SimplePiano', id: 'SimplePiano.A6', name: "A6", codeInclued: [['KeyO', 'KeyC']], codeExclude: ["Space"], codeMain: ['KeyO', 'KeyC'], volume: 1, src: Audio_a6 },
  { _id: 'SimplePiano', id: 'SimplePiano.A6M', name: "A6M", codeInclued: [["Space", 'KeyO', 'KeyC']], codeExclude: [], codeMain: ['KeyO', 'KeyC'], volume: 1, src: Audio_a6m },
  { _id: 'SimplePiano', id: 'SimplePiano.B6', name: "B6", codeInclued: [['KeyP', 'KeyC']], codeExclude: ["Space"], codeMain: ['KeyP', 'KeyC'], volume: 1, src: Audio_b6 },
  { _id: 'SimplePiano', id: 'SimplePiano.C7', name: "C7", codeInclued: [['KeyR', 'KeyV']], codeExclude: ["Space"], codeMain: ['KeyR', 'KeyV'], volume: 1, src: Audio_c7 },
  { _id: 'SimplePiano', id: 'SimplePiano.C7M', name: "C7M", codeInclued: [["Space", 'KeyR', 'KeyV']], codeExclude: [], codeMain: ['KeyR', 'KeyV'], volume: 1, src: Audio_c7m },
  { _id: 'SimplePiano', id: 'SimplePiano.D7', name: "D7", codeInclued: [['KeyT', 'KeyV']], codeExclude: ["Space"], codeMain: ['KeyT', 'KeyV'], volume: 1, src: Audio_d7 },
  { _id: 'SimplePiano', id: 'SimplePiano.D7M', name: "D7M", codeInclued: [["Space", 'KeyT', 'KeyV']], codeExclude: [], codeMain: ['KeyT', 'KeyV'], volume: 1, src: Audio_d7m },
  { _id: 'SimplePiano', id: 'SimplePiano.E7', name: "E7", codeInclued: [['KeyY', 'KeyV']], codeExclude: ["Space"], codeMain: ['KeyY', 'KeyV'], volume: 1, src: Audio_e7 },
  { _id: 'SimplePiano', id: 'SimplePiano.F7', name: "F7", codeInclued: [['KeyU', 'KeyV']], codeExclude: ["Space"], codeMain: ['KeyU', 'KeyV'], volume: 1, src: Audio_f7 },
  { _id: 'SimplePiano', id: 'SimplePiano.F7M', name: "F7M", codeInclued: [["Space", 'KeyU', 'KeyV']], codeExclude: [], codeMain: ['KeyU', 'KeyV'], volume: 1, src: Audio_f7m },
  { _id: 'SimplePiano', id: 'SimplePiano.G7', name: "G7", codeInclued: [['KeyI', 'KeyV']], codeExclude: ["Space"], codeMain: ['KeyI', 'KeyV'], volume: 1, src: Audio_g7 },
  { _id: 'SimplePiano', id: 'SimplePiano.G7M', name: "G7M", codeInclued: [["Space", 'KeyI', 'KeyV']], codeExclude: [], codeMain: ['KeyI', 'KeyV'], volume: 1, src: Audio_g7m },
  { _id: 'SimplePiano', id: 'SimplePiano.A7', name: "A7", codeInclued: [['KeyO', 'KeyV']], codeExclude: ["Space"], codeMain: ['KeyO', 'KeyV'], volume: 1, src: Audio_a7 },
  { _id: 'SimplePiano', id: 'SimplePiano.A7M', name: "A7M", codeInclued: [["Space", 'KeyO', 'KeyV']], codeExclude: [], codeMain: ['KeyO', 'KeyV'], volume: 1, src: Audio_a7m },
  { _id: 'SimplePiano', id: 'SimplePiano.B7', name: "B7", codeInclued: [['KeyP', 'KeyV']], codeExclude: ["Space"], codeMain: ['KeyP', 'KeyV'], volume: 1, src: Audio_b7 },
  { _id: 'SimplePiano', id: 'SimplePiano.C8', name: "C8", codeInclued: [["Digit0"]], codeMain: ["Digit0"], volume: 1, src: Audio_c8 },
]

export default source