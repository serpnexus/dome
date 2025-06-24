---
title: "Zero Width Joiner"
code: "U+200D"
description: "An empty character for joining two characters without any visible separation. It is commonly used in creating complex scripts and emoji sequences."
category: "zero-width"
html: "&#8205;"
example: ""
featured: true
order: 2
longDescription: "The Zero Width Joiner (ZWJ) is an invisible character used to join two or more characters together. It's most famously used in emoji sequences to create new combined emoji, but it also has important uses in complex scripts like Arabic and Indic scripts."
useCases: 
  - "Creating emoji sequences like family emoji (👨‍👩‍👧‍👦) or profession emoji (👩‍💻)"
  - "Controlling the joining behavior of characters in scripts like Arabic"
  - "Creating ligatures in certain writing systems"
  - "Combining multiple emojis into a single visual representation"
---

## What is the Zero Width Joiner?

The Zero Width Joiner (ZWJ) is a special Unicode character (U+200D) that has no width and is not visible when displayed. Its primary purpose is to indicate that two or more characters should be joined together when rendered.

### How ZWJ works with emojis

When the ZWJ is placed between two or more emojis, it signals to the rendering system that these emojis should be combined into a single emoji if possible. This is how we get complex emojis like:

- 👨‍👩‍👧‍👦 Family emoji (man + ZWJ + woman + ZWJ + girl + ZWJ + boy)
- 👩‍💻 Woman technologist (woman + ZWJ + laptop)
- 🏳️‍🌈 Rainbow flag (white flag + ZWJ + rainbow)

### The technical side of ZWJ

The ZWJ works by creating a ligature between characters. A ligature is a special rendering where multiple characters are displayed as a single glyph. In traditional typography, ligatures are used to combine certain letter pairs like "fi" into a single, more aesthetically pleasing character.

With emojis, the ZWJ extends this concept to create new meanings by combining existing emojis.

### Implementing ZWJ in your content

To use ZWJ in your content:

1. Copy the ZWJ character (you can get it from InvisibleText.me)
2. Place it between the emojis you want to combine
3. Test the combination on your target platform (not all platforms support all ZWJ sequences)
