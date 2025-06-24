---
title: "Zero Width Space"
code: "U+200B"
description: "An invisible character for formatting digital text. It allows word breaks or line breaks without adding a visible space."
category: "zero-width"
html: "&#8203;"
example: ""
featured: true
order: 1
longDescription: "The Zero Width Space (ZWSP) is an invisible character that's used primarily for word breaking in languages that don't use spaces between words, such as Thai or Japanese. It can also be used to enable line breaking opportunities without displaying a visible space."
useCases: 
  - "Creating line break opportunities in long words or URLs without adding visible spaces"
  - "Formatting text in social media posts where spaces might be collapsed"
  - "Creating 'empty' messages or posts that appear blank"
  - "Adding invisible markers in text for tracking or formatting purposes"
---

## Common Uses

The Zero Width Space (ZWSP) is an invisible character that's used primarily for word breaking in languages that don't use spaces between words, such as Thai or Japanese. It can also be used to enable line breaking opportunities without displaying a visible space.

### Technical Details

In Unicode, ZWSP is represented as U+200B. In HTML, it can be written as `&#8203;`. When rendered, it takes up no space and is completely invisible to the user.

### Examples in Use

Consider a long URL that needs to break across lines: `https://very-long-domain-name.com/with/many/path/segments`. By inserting ZWSPs at strategic points, browsers can break the URL at those points if needed, without showing visible hyphens or spaces.

### Social Media Applications

- Create "empty" posts on platforms that don't allow truly empty content
- Add line breaks in profiles and bios where normal line breaks aren't allowed
- Format text with custom spacing that platform formatting doesn't support

### Gaming Applications

- Create usernames that appear shorter than they actually are
- Add invisible spacing in chat messages for unique formatting
- Create "invisible" messages that only people who know to look for them will notice
