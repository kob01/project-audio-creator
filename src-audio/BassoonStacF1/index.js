import Audio_FA_stac_f1_A1M from "./FA_stac_f1_A1M.wav"
import Audio_FA_stac_f1_A2M from "./FA_stac_f1_A2M.wav"
import Audio_FA_stac_f1_A3M from "./FA_stac_f1_A3M.wav"
import Audio_FA_stac_f1_A4M from "./FA_stac_f1_A4M.wav"
import Audio_FA_stac_f1_B1 from "./FA_stac_f1_B1.wav"
import Audio_FA_stac_f1_C2 from "./FA_stac_f1_C2.wav"
import Audio_FA_stac_f1_C3 from "./FA_stac_f1_C3.wav"
import Audio_FA_stac_f1_C4 from "./FA_stac_f1_C4.wav"
import Audio_FA_stac_f1_C5 from "./FA_stac_f1_C5.wav"
import Audio_FA_stac_f1_C5M from "./FA_stac_f1_C5M.wav"
import Audio_FA_stac_f1_D2 from "./FA_stac_f1_D2.wav"
import Audio_FA_stac_f1_D3 from "./FA_stac_f1_D3.wav"
import Audio_FA_stac_f1_D4 from "./FA_stac_f1_D4.wav"
import Audio_FA_stac_f1_D5 from "./FA_stac_f1_D5.wav"
import Audio_FA_stac_f1_E2 from "./FA_stac_f1_E2.wav"
import Audio_FA_stac_f1_E3 from "./FA_stac_f1_E3.wav"
import Audio_FA_stac_f1_E4 from "./FA_stac_f1_E4.wav"
import Audio_FA_stac_f1_F2M from "./FA_stac_f1_F2M.wav"
import Audio_FA_stac_f1_F3M from "./FA_stac_f1_F3M.wav"
import Audio_FA_stac_f1_F4M from "./FA_stac_f1_F4M.wav"
import Audio_FA_stac_f1_G2M from "./FA_stac_f1_G2M.wav"
import Audio_FA_stac_f1_G3M from "./FA_stac_f1_G3M.wav"
import Audio_FA_stac_f1_G4M from "./FA_stac_f1_G4M.wav"

const sourceFile = [
  { name: "C2", src: Audio_FA_stac_f1_C2 },
  { name: "C3", src: Audio_FA_stac_f1_C3 },
  { name: "C4", src: Audio_FA_stac_f1_C4 },
  { name: "C5", src: Audio_FA_stac_f1_C5 },
  { name: "C5M", src: Audio_FA_stac_f1_C5M },
  { name: "D2", src: Audio_FA_stac_f1_D2 },
  { name: "D3", src: Audio_FA_stac_f1_D3 },
  { name: "D4", src: Audio_FA_stac_f1_D4 },
  { name: "D5", src: Audio_FA_stac_f1_D5 },
  { name: "E2", src: Audio_FA_stac_f1_E2 },
  { name: "E3", src: Audio_FA_stac_f1_E3 },
  { name: "E4", src: Audio_FA_stac_f1_E4 },
  { name: "F2M", src: Audio_FA_stac_f1_F2M },
  { name: "F3M", src: Audio_FA_stac_f1_F3M },
  { name: "F4M", src: Audio_FA_stac_f1_F4M },
  { name: "G2M", src: Audio_FA_stac_f1_G2M },
  { name: "G3M", src: Audio_FA_stac_f1_G3M },
  { name: "G4M", src: Audio_FA_stac_f1_G4M },
  { name: "A1M", src: Audio_FA_stac_f1_A1M },
  { name: "A2M", src: Audio_FA_stac_f1_A2M },
  { name: "A3M", src: Audio_FA_stac_f1_A3M },
  { name: "A4M", src: Audio_FA_stac_f1_A4M },
  { name: "B1", src: Audio_FA_stac_f1_B1 },
]

const sourceInformation = [
  { name: "C2", duration: 1.1147392290249434 },
  { name: "C3", duration: 1.0159410430839002 },
  { name: "C4", duration: 1.1269614512471655 },
  { name: "C5", duration: 1.1814285714285715 },
  { name: "C5M", duration: 1.111201814058957 },
  { name: "D2", duration: 1.144625850340136 },
  { name: "D3", duration: 0.9114739229024943 },
  { name: "D4", duration: 1.0799319727891157 },
  { name: "D5", duration: 1.1216326530612244 },
  { name: "E2", duration: 1.136326530612245 },
  { name: "E3", duration: 1.0945578231292517 },
  { name: "E4", duration: 1.1098866213151928 },
  { name: "F2M", duration: 1.0000680272108844 },
  { name: "F3M", duration: 1.0721995464852607 },
  { name: "F4M", duration: 1.129251700680272 },
  { name: "G2M", duration: 1.0619954648526078 },
  { name: "G3M", duration: 1.0987981859410432 },
  { name: "G4M", duration: 0.964421768707483 },
  { name: "A1M", duration: 1.0809297052154194 },
  { name: "A2M", duration: 1.2116780045351474 },
  { name: "A3M", duration: 1.1084353741496598 },
  { name: "A4M", duration: 1.1834467120181407 },
  { name: "B1", duration: 1.0181859410430838 },
]

const sourceSort = ["C2", "C3", "C4", "C5", "C5M", "D2", "D3", "D4", "D5", "E2", "E3", "E4", "F2M", "F3M", "F4M", "G2M", "G3M", "G4M", "A1M", "A2M", "A3M", "A4M", "B1"]

const result = sourceSort.map(i => Object.assign({}, sourceFile.find(i_ => i_.name === i), sourceInformation.find(i_ => i_.name === i)))

export default result