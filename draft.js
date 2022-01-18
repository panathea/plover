const additions = {
  "AOELD/SRAOEUS": "Edelweiss",
  "AOED/*L/SRAOEUS": "Edelweiss",
  "PRO/SPEBGS": "prospection",
  "A/KUFPL": "accustom",
  "KRAO*UT": "crwth",
  KAFRL: "camel",
  "HAFRP/SHAOEUR": "Hampshire",
  "NU/HAFRP/SHAOEUR": "New Hampshire",
  "HAFRP/*ER": "hamper",
  "OE/HREUFRP/KWRAD": "Olympiad",
  "PHEL/TPHROUS": "mellifluous",
  "PHEL/TPHRAOUS": "mellifluous",
  "HREUR/SEUFT": "lyricist",
  "TKPWRO*EUPB": "groyne",
  "R*EF": "rev",
  REF: "ref",
  "REF/HROG": "reflog",
  "RAOE/SULT": "result",
  "RAOE/S*ULT": "result",
  "TKE/PHOET/SRAEUT": "demotivate",
  "TPEUG/TEUF": "figurative",
  "T*UPL": "tuple",
  "A/STPALT": "asphalt",
  WHAOF: "whoof",
  "WHAOPS/KWREU/DAEUS/KWREU": "whoopsy-daisy",
  "KROD/SKW*EUPBG/*L": "crodsquinkle",
  "KROD/SKW*EUPBG/*L": "crodsquinkle",
  "TPROB/SKOT/*L": "frobscottle",
  "TPROB/SKOLT": "frobscottle",
  "TPROBS/KOT/*L": "frobscottle",
  "TPROBS/KOLT": "frobscottle",
  "TPHRUPL/*ER": "flummer",
  TPHRUPL: "flum",
  "A/HRAOEPBLGS": "allegiance",
  "A/POEUPBTD": "appointed",
  "A/RAEUD": "arrayed",
  SROEUTD: "voided",
  "A/SROEUTD": "avoided",
  "A/TEPBTD": "attended",
  "A/TOEPLT": "atonement",
  "A/TPEURPLGS": "affirmation",
  "A/TPHAOEULT": "annihilate",
  "ABL/TROS": "albatross",
  AEUTD: "aided",
  "A/SRAPBT/TKPWARD": "avant-garde",
  "AFPBT/TKPWARD": "avant-garde",
  "A*FPBT/TKPWARD": "avant-garde",
  "APL/KWRAPBS": "ambiance",
  "APL/PWEU/KWRAPBS": "ambiance",
  "APL/PWAOE/KWRAPBS": "ambiance",
  "AFRP/TPAOEU": "amplify",
  "AFRPL/TPAOEU": "amplify",
  "AG/SRAEUTD": "aggravated",
  "AL/KPAPBD/KWRA": "Alexandria",
  "AO*EUFLD": "Island",
  AOEULDZ: "islands", // Conflicts with eyelids
  "AO*EULD": "idle",
  "AOURBG/KWRA": "eureka",
  "APB/HRO*G": "analogue",
  "APB/TKAOEUDZ": "anodized",
  "TKAOU/TPRAEUPB": "Dufresne",
  APBLGT: "agility",
  ARPT: "apart",
  "ART/KHRAEUTD": "articulated",
  "ART/PWAOUTS": "attributes",
  "AUFR/KROUTD": "overcrowded",
  "EBGS/KHRAOUTD": "excluded",
  "EBGS/SEPB/TREUFT/TEU": "eccentricity",
  "EBGS/SEPB/TREUFT/KWREU": "eccentricity",
  "EBGS/SEPB/TR*EUS": "eccentrist",
  "EBGS/SEPB/TREUFT": "eccentrist",
};

/**
 * - remove explicit entry for visits (now we can fold -S on activists)
 * - remove explicit entry for testing and tested (now we can fold -G on attesting and attested)
 **/

const removals = [
  "TPHRIBGT/-D",
  "SKP/HREUR/SEUFT",
  "-T/PHET",
  "-T/PHET/PWOLG",
  "-T/PHET/REUBG",
  "SKO/SO*/THE",
  "KWR-S",
];
/**
 * "EBGS/EUG/WOUS": "exiguous"
"EBGT/-BL": "equitable" (for those who don't know steno-school KWET for equity)
"EFR/SREFPBS": "effervescence"
"EPB/TEPBGS": "intention" (for people who forget how to spell when the going gets hard)
"EPL/PWROEUD/*ERG": "embroidering" (because embroid is not a root)
"EPLS/REU": "emissary"
"ROEUR/KWROUS": "erroneously"
"ER/ROEPBS/HREU": "erroneously"
"ER/TKPWOPL/TER": "ergometer"
"EUFRP/SRAOEUS": "improvise"
"EUFRP/SRAOEUZ": "improvise"
"EUPB/EBGS/PHREUFT": "inexplicit" (or remove misstroke EUPB/EBGS for index)
"EUPB/KAOPBLT": "inconsistently"
"EUPB/ST*EUPBGT": "instinct"
"STPHAPBLT": "instantly"
"SPWEPBTD": "intended"
"EUT/TEUF": "iterative"
"EURT/TEUF": "iterative"
"HAEPBS": "happiness"
"HAEUPBS": "heinous"
"HAPL/PWRURG": "hamburger"
"HAS/KWREPBD": "hacienda"
"HAS/KWREPB/TKA": "hacienda"
"HEBGS/TKPWOPBL": "hexagonal"
"HR*EUL/PUT": "Lilliput"
"HRA/TEBGS": "LaTeX" (for people who pronounce it correctly)
"HRAOER/K-L": "lyrical" (common enough for one to slop a little and forget to use the root word)
remove explicit entry for lights (now we can fold -S on eletrolytes)
remove explicit entry for rating (now we can fold -G on liberating)
"HUB/ARD": "hubbard"
"HUB/BARD": "hubbard"
"K-BLT": "accountability"
"KABG/TPOEUPB": "cacophony"
"KAUPB/TAEUPBLG/KWROPB": "contagion"
"KAUPB/WHRAOUGS": "convolution"
"KAUPB/WHRAOUT": "convolute"
"KAURPBT/SRER/SEU": "controversy" (for those without the brief but with the contra prefix)
"KAURPBT/SRERS/KWREU": "controversy" (for those without the brief but with the contra prefix)
"KEP/HRER": "Kepler"
"KEPB": "ken" (keep asterisked version for the proper name Ken)
"KHAOER/HRAOEGD": "cheerleading"
"KHAOES/PWRURG": "cheeseburger"
"KHAOEZ/PWRURG": "cheeseburger"
"KHAOUZ": "chews"
"KHRAOEUTD": "collided"
"KHRAT/*ERG": "clattering"
"KHREUFP": "cliche" (orthographic)
"KHROR/PHRAFT": "chloroplast"
"KOEUPL/PWRA": "Coimbra"
"KPAPLGS": "examination" (alternate brief)
"KWAOEPB/HRAOEPB": "Queen Leene" (a pleasant surprise designed for TypeRacer aficionados)
"O*EUPBD/KREUPBL": "endocrinal"
"O*EUT/PHEU": "autonomy"
"O*URZ": "ourselves" (common enough to concede a misstroke on the -SZ; or, for certain lazy people)
"OEB/KWREU/WAPB": "Obi-Wan"
"OFT/HRER": "ostler"
"P-RBT": "punishment"
"PAELG": "pealing"
"PAOEPB/KHRAD": "piña colada"
"PEPBT/TOPB/EUBG": "pentatonic"
"PEPBT/TO*PBG": "pentatonic"
"PEPBT/TOPBG": "pentatonic"
"PER/SKWRA": "Pera"
"PHAERBGSZ": "matrices"
"PHAOER/K-L": "miracle"
"PHAOEUPBTD": "minded"
"PHARPBLG/SA*EUGS": "marginalization" (#savethestrokes)
"PHERPLZ": "memorize"
"PHER/KAPBT/HREUFT": "mercantilist"
"PHER/KAPBT/HREUFPL": "mercantilism"
"PHO*FR/KWRUS": "Morpheus"
"PHOPBT/TPHOUS": "monotonous" (#strokelivesmatter)
"PHOR/ROE": "morrow" (save asterisked version for Morrow)
"PHO*ET": "mote"
"PHROPB/EUBG": "moronic"
"POEUL/HAOERL": "polyhedral"
"PREP/TAEUGS": "precipitation"
"PREUPB/SEPS": "princeps"
"PRO/POEFL": "proposal" (reasonable alternative to the brief)
"PRO/TOS": "Protoss" (it already translates, might as well capitalize)
"PUBG/KA": "pukka"
"RARTD": "regarded"
"S*EUG/WOUS": "exiguous"
"SHAU/SHA*PBG": "Shawshank"
"SKETD": "scheduled"
"SORPL/SAULT": "somersault"
"SOUPBTD": "sounded"
"SPAOED/R*UPBG": "speedrunning"
"SPAOED/R*UPB": "speedrun"
"SPOPBTD": "responded"
"SR*ELTD": "veldt"
"SR*EUPL/KWRUPL": "Vimium"
"SR-RB": "vanish"
"TPAU/RAEU": "foray"
 **/
