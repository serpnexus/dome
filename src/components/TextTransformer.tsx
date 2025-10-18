import React from "react"
import { useState, useEffect } from "react"
import { transformToBold, transformToItalic, transformToCursive, transformToBubble, transformToReverse, transformToInstagramFonts, transformToFancyText, transformToMirrorText, transformToSmallText, transformToUpsideDownText } from "../utils/textTransformers"
import { translateToWingdings, translateToUwU, translateToOldEnglish } from "../utils/translators"
import { generateStylishFonts, generateFacebookFonts, generateIGFonts } from "../utils/fontGenerators"
import { generateGlitchText, generateHalfElfNames, generateAestheticUsernames, generateCatNames, generateQuirks } from "../utils/specialGenerators"
import { translateToVietnamese, translateToSimlish, translateToHighValyrian } from "../utils/specialTranslators"
import { generateFantasyFonts, generateMetalFont, generateCreepyFonts, generateTikTokFont, generateDiscordBold, generateDemonicSymbols, generateCurvedText } from "../utils/specialFonts"

interface TextTransformerProps {
  title: string
  description: string
  transformType:
    | "bold"
    | "italic"
    | "cursive"
    | "bubble"
    | "reverse" 
    | "instagram"
    | "fancy"
    | "wingdings"
    | "uwu"
    | "oldenglish"
    | "stylish"
    | "facebook"
    | "igfonts"
    | "glitch"
    | "halfelf"
    | "aesthetic"
    | "curved"
    | "vietnamese"
    | "discordbold"
    | "catnames"
    | "fantasy"
    | "quirks"
    | "metal"
    | "demonic"
    | "simlish"
    | "tiktok"
    | "creepy"
    | "valyrian"
    | "small"
    | "mirror"
    | "upsidedown"
  placeholder?: string
  isGenerator?: boolean
}

const TextTransformer = ({
  title,
  description,
  transformType,
  placeholder = "Enter your text here",
  isGenerator = false,
}: TextTransformerProps) => {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState<string | string[]>("")
  const [copied, setCopied] = useState<number | boolean>(false)

  const getTransformation = (text: string, type: string) => {
    switch (type) {
      case "bold":
        return transformToBold(text)
      case "italic":
        return transformToItalic(text)
      case "cursive":
        return transformToCursive(text)
      case "bubble":
        return transformToBubble(text)
      case "reverse":
        return transformToReverse(text)
      case "instagram":
        return transformToInstagramFonts(text)
      case "fancy":
        return transformToFancyText(text)
      case "wingdings":
        return translateToWingdings(text)
      case "uwu":
        return translateToUwU(text)
      case "oldenglish":
        return translateToOldEnglish(text)
      case "stylish":
        return generateStylishFonts(text)
      case "facebook":
        return generateFacebookFonts(text)
      case "igfonts":
        return generateIGFonts(text)
      case "glitch":
        return generateGlitchText(text)
      case "halfelf":
        return generateHalfElfNames()
      case "aesthetic":
        return generateAestheticUsernames(text)
      case "curved":
        return generateCurvedText(text)
      case "vietnamese":
        return translateToVietnamese(text)
      case "discordbold":
        return generateDiscordBold(text)
      case "catnames":
        return generateCatNames()
      case "fantasy":
        return generateFantasyFonts(text)
      case "quirks":
        return generateQuirks()
      case "metal":
        return generateMetalFont(text)
      case "demonic":
        return generateDemonicSymbols(text)
      case "simlish":
        return translateToSimlish(text)
      case "tiktok":
        return generateTikTokFont(text)
      case "creepy":
        return generateCreepyFonts(text)
      case "valyrian":
        return translateToHighValyrian(text)
      case "small":
        return transformToSmallText(text)
      case "mirror":
        return transformToMirrorText(text)
      case "upsidedown":
        return transformToUpsideDownText(text)
      default:
        return text
    }
  }

  useEffect(() => {
    if (isGenerator || inputText.trim()) {
      const result = getTransformation(inputText, transformType)
      setOutputText(result)
    } else {
      setOutputText(Array.isArray(outputText) ? [] : "")
    }
  }, [inputText, transformType, isGenerator])

  const handleCopy = (textToCopy: string, index?: number) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(index !== undefined ? index : true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = textToCopy
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        setCopied(index !== undefined ? index : true)
        setTimeout(() => setCopied(false), 2000)
      })
  }

  const handleGenerate = () => {
    const result = getTransformation(inputText, transformType)
    setOutputText(result)
  }

  const isMultipleOutputs = [
    "instagram",
    "fancy",
    "stylish",
    "facebook",
    "igfonts",
    "glitch",
    "halfelf",
    "aesthetic",
    "curved",
    "catnames",
    "fantasy",
    "quirks",
    "creepy",
  ].includes(transformType)

  const isNameGenerator = ["halfelf", "catnames", "quirks"].includes(transformType)

  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        <div className="py-4 text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">{title}</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">{description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* Input Section */}
          <div className="bg-gradient-to-b from-navy-800 to-navy-900 border-navy-600 shadow-[0_8px_32px_rgba(18,28,65,0.4)] rounded-xl overflow-hidden border border-navy-600/50 backdrop-blur-sm transition-transform hover:translate-y-[-2px]">
            <div className="p-4 bg-gradient-to-r from-navy-700 to-navy-800 text-yellow-400 border-b border-navy-600/50 flex items-center gap-2">
              <span className="text-lg font-medium">
                {isNameGenerator ? "Generator Options" : "Input Text"}
              </span>
            </div>
            <div className="p-8">
              {!isNameGenerator ? (
                <>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-60 p-6 text-white bg-navy-700/90 border border-navy-600/50 rounded-xl resize-none placeholder-gray-400 backdrop-blur-sm shadow-inner transition-colors focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20"
                    aria-label="Input text to transform"
                  />
                  <div className="mt-4 text-sm text-gray-300 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400/70" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    Characters: {inputText.length}
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  {transformType === "aesthetic" && (
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter a base word (optional)"
                      className="w-full p-6 text-white bg-navy-700/90 border border-navy-600/50 rounded-xl focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400/50 placeholder-gray-400 backdrop-blur-sm shadow-inner transition-all duration-200"
                    />
                  )}
                  <button
                    onClick={handleGenerate}
                    className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400/20 to-yellow-400/10 hover:from-yellow-400/30 hover:to-yellow-400/20 text-yellow-400 font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 border border-yellow-400/20 hover:border-yellow-400/30 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(255,215,0,0.1)] backdrop-blur-sm flex items-center justify-center gap-2 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate{" "}
                    {transformType === "halfelf" ? "Names" : transformType === "catnames" ? "Cat Names" : "Quirks"}
                  </button>
                  <div className="text-sm text-gray-300 flex items-center gap-2 p-4 bg-navy-700/30 rounded-xl border border-navy-600/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400/70" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Click the button above to generate new{" "}
                    {transformType === "halfelf"
                      ? "half-elf names"
                      : transformType === "catnames"
                        ? "cat names"
                        : "character quirks"}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-b from-navy-800 to-navy-900 shadow-[0_8px_32px_rgba(18,28,65,0.4)] rounded-xl overflow-hidden border border-navy-600/50 backdrop-blur-sm transition-transform hover:translate-y-[-2px]">
            <div className="p-4 bg-gradient-to-r from-navy-700 to-navy-800 border-b border-navy-600/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400/70" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
                <span className="text-lg font-medium text-yellow-400">
                  {isMultipleOutputs ? "Generated Results" : "Transformed Text"}
                </span>
              </div>
              {!isMultipleOutputs && typeof outputText === "string" && outputText && (
                <button
                  onClick={() => handleCopy(outputText as string)}
                  className="inline-flex items-center px-4 py-2 border border-navy-600/50 text-sm font-medium rounded-lg text-yellow-400 bg-navy-900/80 hover:bg-navy-950 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 hover:scale-105 backdrop-blur-sm gap-2"
                  aria-label="Copy transformed text"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copied === true ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <div className="p-8">
              {!isMultipleOutputs ? (
                <div className="w-full h-60 p-6 border border-navy-600/50 rounded-xl overflow-auto bg-navy-700/90 text-white break-all backdrop-blur-sm shadow-inner">
                  {outputText || (
                    <div className="flex items-center gap-3 text-gray-400 italic">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400/50" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      Your transformed text will appear here...
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {Array.isArray(outputText) && outputText.length > 0 ? (
                    outputText.map((output, index) => (
                      <div
                        key={index}
                        className="p-6 border border-navy-600/50 rounded-xl bg-navy-700/90 relative group backdrop-blur-sm transition-all duration-200 hover:bg-navy-700 hover:border-navy-600"
                      >
                        <div className="pr-20 break-all text-white min-h-[1.5rem]">{output}</div>
                        <button
                          onClick={() => handleCopy(output, index)}
                          className="absolute top-3 right-3 inline-flex items-center px-4 py-2 border border-navy-600/50 text-sm font-medium rounded-lg text-yellow-400 bg-navy-900/80 hover:bg-navy-950 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 transform opacity-0 group-hover:opacity-100 hover:scale-105 backdrop-blur-sm gap-2"
                          aria-label={`Copy style ${index + 1}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          {copied === index ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center gap-3 text-gray-400 italic text-center py-12 bg-navy-700/30 rounded-xl border border-navy-600/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400/50" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                      {isNameGenerator
                        ? "Click the generate button to create new results..."
                        : "Enter some text to see the different styles..."}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TextTransformer