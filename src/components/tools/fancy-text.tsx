import { useState } from "react"

const fancyMaps = {
  bold: {
    a: "𝐚",
    b: "𝐛",
    c: "𝐜",
    d: "𝐝",
    e: "𝐞",
    f: "𝐟",
    g: "𝐠",
    h: "𝐡",
    i: "𝐢",
    j: "𝐣",
    k: "𝐤",
    l: "𝐥",
    m: "𝐦",
    n: "𝐧",
    o: "𝐨",
    p: "𝐩",
    q: "𝐪",
    r: "𝐫",
    s: "𝐬",
    t: "𝐭",
    u: "𝐮",
    v: "𝐯",
    w: "𝐰",
    x: "𝐱",
    y: "𝐲",
    z: "𝐳",
    A: "𝐀",
    B: "𝐁",
    C: "𝐂",
    D: "𝐃",
    E: "𝐄",
    F: "𝐅",
    G: "𝐆",
    H: "𝐇",
    I: "𝐈",
    J: "𝐉",
    K: "𝐊",
    L: "𝐋",
    M: "𝐌",
    N: "𝐍",
    O: "𝐎",
    P: "𝐏",
    Q: "𝐐",
    R: "𝐑",
    S: "𝐒",
    T: "𝐓",
    U: "𝐔",
    V: "𝐕",
    W: "𝐖",
    X: "𝐗",
    Y: "𝐘",
    Z: "𝐙",
  },
  italic: {
    a: "𝑎",
    b: "𝑏",
    c: "𝑐",
    d: "𝑑",
    e: "𝑒",
    f: "𝑓",
    g: "𝑔",
    h: "ℎ",
    i: "𝑖",
    j: "𝑗",
    k: "𝑘",
    l: "𝑙",
    m: "𝑚",
    n: "𝑛",
    o: "𝑜",
    p: "𝑝",
    q: "𝑞",
    r: "𝑟",
    s: "𝑠",
    t: "𝑡",
    u: "𝑢",
    v: "𝑣",
    w: "𝑤",
    x: "𝑥",
    y: "𝑦",
    z: "𝑧",
    A: "𝐴",
    B: "𝐵",
    C: "𝐶",
    D: "𝐷",
    E: "𝐸",
    F: "𝐹",
    G: "𝐺",
    H: "𝐻",
    I: "ℐ",
    J: "𝐽",
    K: "𝐾",
    L: "𝐿",
    M: "𝑀",
    N: "𝑁",
    O: "𝑂",
    P: "𝑃",
    Q: "𝑄",
    R: "𝑅",
    S: "𝑆",
    T: "𝑇",
    U: "𝐔",
    V: "𝑉",
    W: "𝑊",
    X: "𝑋",
    Y: "𝑌",
    Z: "𝑍",
  },
  cursive: {
    a: "𝒶",
    b: "𝒷",
    c: "𝒸",
    d: "𝒹",
    e: "𝑒",
    f: "𝒻",
    g: "𝑔",
    h: "𝒽",
    i: "𝒾",
    j: "𝒿",
    k: "𝓀",
    l: "𝓁",
    m: "𝓂",
    n: "𝓃",
    o: "𝑜",
    p: "𝓅",
    q: "𝓆",
    r: "𝓇",
    s: "𝓈",
    t: "𝓉",
    u: "𝓊",
    v: "𝓋",
    w: "𝓌",
    x: "𝓍",
    y: "𝓎",
    z: "𝓏",
    A: "𝒜",
    B: "ℬ",
    C: "𝒞",
    D: "𝒟",
    E: "ℰ",
    F: "ℱ",
    G: "𝒢",
    H: "ℋ",
    I: "ℐ",
    J: "𝒥",
    K: "𝒦",
    L: "ℒ",
    M: "ℳ",
    N: "𝒩",
    O: "𝒪",
    P: "𝒫",
    Q: "𝒬",
    R: "ℛ",
    S: "𝒮",
    T: "𝒯",
    U: "𝒰",
    V: "𝒱",
    W: "𝒲",
    X: "𝒳",
    Y: "𝒴",
    Z: "𝒵",
  },
  gothic: {
    a: "𝔞",
    b: "𝔟",
    c: "𝔠",
    d: "𝔡",
    e: "𝔢",
    f: "𝔣",
    g: "𝔤",
    h: "𝔥",
    i: "𝔦",
    j: "𝔧",
    k: "𝔨",
    l: "𝔩",
    m: "𝔪",
    n: "𝔫",
    o: "𝔬",
    p: "𝔭",
    q: "𝔮",
    r: "𝔯",
    s: "𝔰",
    t: "𝔱",
    u: "𝔲",
    v: "𝔳",
    w: "𝔴",
    x: "𝔵",
    y: "𝔶",
    z: "𝔷",
    A: "𝔄",
    B: "𝔅",
    C: "ℭ",
    D: "𝔇",
    E: "𝔈",
    F: "𝔉",
    G: "𝔊",
    H: "ℌ",
    I: "ℑ",
    J: "𝔍",
    K: "𝔎",
    L: "𝔏",
    M: "𝔐",
    N: "𝔑",
    O: "𝔒",
    P: "𝔓",
    Q: "𝔔",
    R: "ℜ",
    S: "𝔖",
    T: "𝔗",
    U: "𝔘",
    V: "𝔙",
    W: "𝔚",
    X: "𝔛",
    Y: "𝔜",
    Z: "ℨ",
  },
  monospace: {
    a: "𝚊",
    b: "𝚋",
    c: "𝚌",
    d: "𝚍",
    e: "𝚎",
    f: "𝚏",
    g: "𝚐",
    h: "𝚑",
    i: "𝚒",
    j: "𝚓",
    k: "𝚔",
    l: "𝚕",
    m: "𝚖",
    n: "𝚗",
    o: "𝚘",
    p: "𝚙",
    q: "𝚚",
    r: "𝚛",
    s: "𝚜",
    t: "𝚝",
    u: "𝚞",
    v: "𝚟",
    w: "𝚠",
    x: "𝚡",
    y: "𝚢",
    z: "𝚣",
    A: "𝙰",
    B: "𝙱",
    C: "𝙲",
    D: "𝙳",
    E: "𝙴",
    F: "𝙵",
    G: "𝙶",
    H: "𝙷",
    I: "𝙸",
    J: "𝙹",
    K: "𝙺",
    L: "𝙻",
    M: "𝙼",
    N: "𝙽",
    O: "𝙾",
    P: "𝙿",
    Q: "𝚀",
    R: "𝚁",
    S: "𝚂",
    T: "𝚃",
    U: "𝚄",
    V: "𝚅",
    W: "𝚆",
    X: "𝚇",
    Y: "𝚈",
    Z: "𝚉",
  },
  double: {
    a: "𝕒",
    b: "𝕓",
    c: "𝕔",
    d: "𝕕",
    e: "𝕖",
    f: "𝕗",
    g: "𝕘",
    h: "𝕙",
    i: "𝕚",
    j: "𝕛",
    k: "𝕜",
    l: "𝕝",
    m: "𝕞",
    n: "𝕟",
    o: "𝕠",
    p: "𝕡",
    q: "𝕢",
    r: "𝕣",
    s: "𝕤",
    t: "𝕥",
    u: "𝕦",
    v: "𝕧",
    w: "𝕨",
    x: "𝕩",
    y: "𝕪",
    z: "𝕫",
    A: "𝔸",
    B: "𝔹",
    C: "ℂ",
    D: "𝔻",
    E: "𝔼",
    F: "𝔽",
    G: "𝔾",
    H: "ℍ",
    I: "𝕀",
    J: "𝕁",
    K: "𝕂",
    L: "𝕃",
    M: "𝕄",
    N: "ℕ",
    O: "𝕆",
    P: "ℙ",
    Q: "ℚ",
    R: "ℝ",
    S: "𝕊",
    T: "𝕋",
    U: "𝕌",
    V: "𝕍",
    W: "𝕎",
    X: "𝕏",
    Y: "𝕐",
    Z: "ℤ",
  },
  sans: {
    a: "𝖺",
    b: "𝖻",
    c: "𝖼",
    d: "𝖽",
    e: "𝖾",
    f: "𝖿",
    g: "𝗀",
    h: "𝗁",
    i: "𝗂",
    j: "𝗃",
    k: "𝗄",
    l: "𝗅",
    m: "𝗆",
    n: "𝗇",
    o: "𝗈",
    p: "𝗉",
    q: "𝗊",
    r: "𝗋",
    s: "𝗌",
    t: "𝗍",
    u: "𝗎",
    v: "𝗏",
    w: "𝗐",
    x: "𝗑",
    y: "𝗒",
    z: "𝗓",
    A: "𝖠",
    B: "𝖡",
    C: "𝖢",
    D: "𝖣",
    E: "𝖤",
    F: "𝖥",
    G: "𝖦",
    H: "𝖧",
    I: "𝖨",
    J: "𝖩",
    K: "𝖪",
    L: "𝖫",
    M: "𝖬",
    N: "𝖭",
    O: "𝖮",
    P: "𝖯",
    Q: "𝖰",
    R: "𝖱",
    S: "𝖲",
    T: "𝖳",
    U: "𝖴",
    V: "𝖵",
    W: "𝖶",
    X: "𝖷",
    Y: "𝖸",
    Z: "𝖹",
  },
  bubble: {
    a: "ⓐ",
    b: "ⓑ",
    c: "ⓒ",
    d: "ⓓ",
    e: "ⓔ",
    f: "ⓕ",
    g: "ⓖ",
    h: "ⓗ",
    i: "ⓘ",
    j: "ⓙ",
    k: "ⓚ",
    l: "ⓛ",
    m: "ⓜ",
    n: "ⓝ",
    o: "ⓞ",
    p: "ⓟ",
    q: "ⓠ",
    r: "ⓡ",
    s: "ⓢ",
    t: "ⓣ",
    u: "ⓤ",
    v: "ⓥ",
    w: "ⓦ",
    x: "ⓧ",
    y: "ⓨ",
    z: "ⓩ",
    A: "Ⓐ",
    B: "Ⓑ",
    C: "Ⓒ",
    D: "Ⓓ",
    E: "Ⓔ",
    F: "Ⓕ",
    G: "Ⓖ",
    H: "Ⓗ",
    I: "Ⓘ",
    J: "Ⓙ",
    K: "Ⓚ",
    L: "Ⓛ",
    M: "Ⓜ",
    N: "Ⓝ",
    O: "Ⓞ",
    P: "Ⓟ",
    Q: "Ⓠ",
    R: "Ⓡ",
    S: "Ⓢ",
    T: "Ⓣ",
    U: "Ⓤ",
    V: "Ⓥ",
    W: "Ⓦ",
    X: "Ⓧ",
    Y: "Ⓨ",
    Z: "Ⓩ",
  },
  square: {
    a: "🄰",
    b: "🄱",
    c: "🄲",
    d: "🄳",
    e: "🄴",
    f: "🄵",
    g: "🄶",
    h: "🄷",
    i: "🄸",
    j: "🄹",
    k: "🄺",
    l: "🄻",
    m: "🄼",
    n: "🄽",
    o: "🄾",
    p: "🄿",
    q: "🅀",
    r: "🅁",
    s: "🅂",
    t: "🅃",
    u: "🅄",
    v: "🅅",
    w: "🅆",
    x: "🅇",
    y: "🅈",
    z: "🅉",
    A: "🄰",
    B: "🄱",
    C: "🄲",
    D: "🄳",
    E: "🄴",
    F: "🄵",
    G: "🄶",
    H: "🄷",
    I: "🄸",
    J: "🄹",
    K: "🄺",
    L: "🄻",
    M: "🄼",
    N: "🄽",
    O: "🄾",
    P: "🄿",
    Q: "🅀",
    R: "🅁",
    S: "🅂",
    T: "🅃",
    U: "🅄",
    V: "🅅",
    W: "🅆",
    X: "🅇",
    Y: "🅈",
    Z: "🅉",
  },
  upside: {
    a: "ɐ",
    b: "q",
    c: "ɔ",
    d: "p",
    e: "ǝ",
    f: "ɟ",
    g: "ƃ",
    h: "ɥ",
    i: "ᴉ",
    j: "ɾ",
    k: "ʞ",
    l: "l",
    m: "ɯ",
    n: "u",
    o: "o",
    p: "d",
    q: "b",
    r: "ɹ",
    s: "s",
    t: "ʇ",
    u: "n",
    v: "ʌ",
    w: "ʍ",
    x: "x",
    y: "ʎ",
    z: "z",
    A: "∀",
    B: "ᗺ",
    C: "Ɔ",
    D: "ᗡ",
    E: "Ǝ",
    F: "ᖴ",
    G: "פ",
    H: "H",
    I: "I",
    J: "ſ",
    K: "ʞ",
    L: "˥",
    M: "W",
    N: "N",
    O: "O",
    P: "Ԁ",
    Q: "Q",
    R: "ᴿ",
    S: "S",
    T: "┴",
    U: "∩",
    V: "Λ",
    W: "M",
    X: "X",
    Y: "⅄",
    Z: "Z",
  },
  mirror: {
    a: "ɒ",
    b: "d",
    c: "ɔ",
    d: "b",
    e: "ɘ",
    f: "ʇ",
    g: "ǫ",
    h: "ʜ",
    i: "i",
    j: "ꞁ",
    k: "ʞ",
    l: "l",
    m: "m",
    n: "n",
    o: "o",
    p: "q",
    q: "p",
    r: "ɿ",
    s: "ƨ",
    t: "ƚ",
    u: "u",
    v: "v",
    w: "w",
    x: "x",
    y: "ʏ",
    z: "z",
    A: "A",
    B: "ᙠ",
    C: "Ɔ",
    D: "ᗡ",
    E: "Ǝ",
    F: "ꟻ",
    G: "Ә",
    H: "H",
    I: "I",
    J: "Ⴑ",
    K: "ʞ",
    L: "⅃",
    M: "M",
    N: "N",
    O: "O",
    P: "q",
    Q: "p",
    R: "ᴿ",
    S: "Ƨ",
    T: "T",
    U: "U",
    V: "V",
    W: "W",
    X: "X",
    Y: "Y",
    Z: "Z",
  },
  small: {
    a: "ᵃ",
    b: "ᵇ",
    c: "ᶜ",
    d: "ᵈ",
    e: "ᵉ",
    f: "ᶠ",
    g: "ᵍ",
    h: "ʰ",
    i: "ⁱ",
    j: "ʲ",
    k: "ᵏ",
    l: "ˡ",
    m: "ᵐ",
    n: "ⁿ",
    o: "ᵒ",
    p: "ᵖ",
    q: "q",
    r: "ʳ",
    s: "ˢ",
    t: "ᵗ",
    u: "ᵘ",
    v: "ᵛ",
    w: "ʷ",
    x: "ˣ",
    y: "ʸ",
    z: "ᶻ",
    A: "ᴬ",
    B: "ᴮ",
    C: "ᶜ",
    D: "ᴰ",
    E: "ᴱ",
    F: "ᶠ",
    G: "ᴳ",
    H: "ᴴ",
    I: "ᴵ",
    J: "ᴶ",
    K: "ᴷ",
    L: "ᴸ",
    M: "ᴹ",
    N: "ᴺ",
    O: "ᴼ",
    P: "ᴾ",
    Q: "Q",
    R: "ᴿ",
    S: "ˢ",
    T: "ᵀ",
    U: "ᵁ",
    V: "ⱽ",
    W: "ᵂ",
    X: "ˣ",
    Y: "ʸ",
    Z: "ᶻ",
  },
} as const

type StyleType = keyof typeof fancyMaps

const styleConfig = {
  bold: { name: "𝐁𝐨𝐥𝐝", color: "border-yellow-400/30 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400" },
  italic: { name: "𝑰𝒕𝒂𝒍𝒊𝒄", color: "border-blue-400/30 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400" },
  cursive: { name: "𝒞𝓊𝓇𝓈𝒾𝓋𝑒", color: "border-green-400/30 bg-green-500/20 hover:bg-green-500/30 text-green-400" },
  gothic: { name: "𝔊𝔬𝔱𝔥𝔦𝔠", color: "border-purple-400/30 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400" },
  monospace: { name: "𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎", color: "border-cyan-400/30 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400" },
  double: { name: "𝔻𝕠𝕦𝕓𝕝𝕖", color: "border-orange-400/30 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400" },
  sans: { name: "𝖲𝖺𝗇𝗌", color: "border-teal-400/30 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400" },
  bubble: { name: "Ⓑⓤⓑⓑⓛⓔ", color: "border-pink-400/30 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400" },
  square: { name: "🅂🅀🅄🄰🅁🄴", color: "border-indigo-400/30 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400" },
  upside: { name: "∩dsᴉpǝ", color: "border-red-400/30 bg-red-500/20 hover:bg-red-500/30 text-red-400" },
  mirror: { name: "ᴿoɿɿim", color: "border-emerald-400/30 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400" },
  small: { name: "ˢᵐᵃˡˡ", color: "border-violet-400/30 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400" },
}

const examples = {
  bold: { text: "𝐇𝐞𝐥𝐥𝐨 𝐖𝐨𝐫𝐥𝐝", description: "Perfect for emphasis and titles" },
  italic: { text: "𝑯𝒆𝒍𝒍𝒐 𝑾𝒐𝒓𝒍𝒅", description: "Great for quotes and emphasis" },
  cursive: { text: "ℋℯℓℓℴ 𝒲ℴ𝓇ℓ𝒹", description: "Elegant and decorative text" },
  gothic: { text: "ℌ𝔢𝔩𝔩𝔬 𝔚𝔬𝔯𝔩𝔡", description: "Dark and mysterious appearance" },
  monospace: { text: "𝙷𝚎𝚕𝚕𝚘 𝚆𝚘𝚛𝚕𝚍", description: "Code-like monospace styling" },
  double: { text: "ℍ𝕖𝕝𝕝𝕠 𝕎𝕠𝕣𝕝𝕕", description: "Double-struck mathematical style" },
  sans: { text: "𝖧𝖾𝗅𝗅𝗈 𝖶𝗈𝗋𝗅𝖽", description: "Clean sans-serif appearance" },
  bubble: { text: "Ⓗⓔⓛⓛⓞ Ⓦⓞⓡⓛⓓ", description: "Fun bubble letters" },
  square: { text: "🄷🄴🄻🄻🄾 🅆🄾🅁🄻🄳", description: "Bold squared letters" },
  upside: { text: "plɹoM ollǝH", description: "Upside down flipped text" },
  mirror: { text: "Hɘllo Woɿlb", description: "Horizontally mirrored text" },
  small: { text: "ᴴᵉˡˡᵒ ᵂᵒʳˡᵈ", description: "Superscript small text" },
}

export default function FancyTextGenerator() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [selectedStyle, setSelectedStyle] = useState<StyleType | null>(null)
  const [copied, setCopied] = useState(false)

  const generateFancy = (style: StyleType) => {
    if (!inputText.trim()) {
      setOutputText("")
      return
    }

    const map = fancyMaps[style]
    let result = ""

    for (const char of inputText) {
      result += map[char as keyof typeof map] || char
    }

    setOutputText(result)
    setSelectedStyle(style)
  }

  const copyToClipboard = async () => {
    if (!outputText) {
      alert("Please generate some fancy text first!")
      return
    }

    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
      alert("Failed to copy text. Please try again.")
    }
  }

  const handleInputChange = (value: string) => {
    setInputText(value)
    if (selectedStyle && value.trim()) {
      generateFancy(selectedStyle)
    } else {
      setOutputText("")
    }
  }

  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Fancy Text Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your text into fancy, stylized characters. Generate bold, italic, cursive, gothic, and many more
            unique text styles for social media, usernames, and creative projects!
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-400/20 rounded-lg">
            <div className="p-8">
              <div className="space-y-6">
                {/* Input Section */}
                <div>
                  <label htmlFor="fancy-input" className="block text-lg font-semibold text-white mb-3">
                    Enter Your Text
                  </label>
                  <input
                    id="fancy-input"
                    type="text"
                    placeholder="Type your text here..."
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/30 rounded-md text-white placeholder-gray-400 text-lg focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-colors"
                  />
                </div>

                {/* Style Buttons */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">Choose Style</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {(Object.keys(styleConfig) as StyleType[]).map((style) => (
                      <button
                        key={style}
                        onClick={() => generateFancy(style)}
                        className={`px-3 py-2 rounded-md border font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm ${styleConfig[style].color}`}
                      >
                        {styleConfig[style].name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Section */}
                <div>
                  <label htmlFor="fancy-output" className="block text-lg font-semibold text-white mb-3">
                    Generated Fancy Text
                  </label>
                  <textarea
                    id="fancy-output"
                    value={outputText}
                    readOnly
                    placeholder="Your fancy text will appear here..."
                    className="w-full px-4 py-3 bg-slate-700/30 border border-gray-600/20 rounded-md text-white placeholder-gray-500 resize-none text-lg min-h-[128px] focus:outline-none"
                  />
                </div>

                {/* Copy Button */}
                <button
                  onClick={copyToClipboard}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg rounded-md transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={!outputText}
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy Fancy Text
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Examples Section */}
          <div className="mt-12 bg-slate-800/30 backdrop-blur-sm border border-gray-600/20 rounded-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white text-center mb-6">Text Style Examples</h2>
            </div>
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(Object.keys(examples) as StyleType[]).map((style) => (
                  <div key={style} className="space-y-3">
                    <h3 className={`text-lg font-semibold ${styleConfig[style].color.split(" ")[4]}`}>
                      {styleConfig[style].name} Style
                    </h3>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="text-xl mb-2">{examples[style].text}</p>
                      <p className="text-sm text-gray-400">{examples[style].description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
