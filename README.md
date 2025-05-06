# OMNILOGUE
[OMNILOGUE API](https://github.com/ntzeitlin/omnilogue-api)

## Overview:
**OMNILOGUE** empowers markdown writers to publish their interconnected content without compromise. Writers currently face a painful choice: either flatten their rich, linked knowledge structures into linear documents or spend countless hours manually reformatting for existing platforms. OMNILOGUE solves this by enabling simple posting of markdown text while preserving markdown formatting, and crucial network of bidirectional links. This gives authors a direct path to sharing their work exactly as envisioned, while providing readers with both traditional chapter navigation and the freedom to explore ideas non-linearly through bi-directional links.

The **OMNILOGUE MVP** enables authors to upload and share their markdown files. Authors can upload markdown documents, add metadata like titles, descriptions, categories, and tags, and publish their work to the platform. Readers can browse published content and read stories with proper markdown rendering.

## Purpose and Motivation

As a writer, I created OMNILOGUE after discovering the potential of my Obsidian.md daily journal. I noticed that the bidirectional linking system I was using for personal notes could actually transform storytelling by enabling non-linear narratives. OMNILOGUE takes Obsidian vaults and converts them into web-based reading experiences where readers can explore choose-your-own-adventure stories, navigate knowledge bases with cross-references, or immerse themselves in worlds with interconnected lore. It bridges my private writing process with public sharing, preserving the depth of Obsidian while making these interconnected markdown creations accessible to readers who enjoy navigating stories in more flexible ways.


## Core Features
- Author Dashboard (Office): Create non-linear stories
	- Create new stories with a title, subtitle, excerpt and descriptions.
	- Add sections with Markdown content. Automatic title detection. 
	- Automatic Section Link Detection: Omnilogue automatically detects and processes links between sections.

- Reader Dashboard (Library):
	- Browse available books
	- Read books in browser and interact using section-to-section links.
	- Add favorite books to your bookshelf.

- User Authentication: Secure login / registration system.

## Tech Stack:
- Next.js with TypeScript and Page Routing
- Radix-UI Theme Components for Styling
- TanStackQuery

## Getting Started:
1. Clone the repository
	```
	git clone git@github.com:ntzeitlin/omnilogue-client.git
	cd omnilogue
	```

2. Install dependencies
	```
	npm install
	```

3. Run the development server
	```
	npm run dev
	```
