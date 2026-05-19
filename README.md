# 📊 gitpulse

> Git analytics from your terminal — hotspots, velocity, and team insights.

[![npm](https://img.shields.io/npm/v/@wuchunjie/gitpulse)](https://www.npmjs.com/package/@wuchunjie/gitpulse)
[![npm downloads](https://img.shields.io/npm/dm/@wuchunjie/gitpulse)](https://www.npmjs.com/package/@wuchunjie/gitpulse)
[![license](https://img.shields.io/npm/l/@wuchunjie/gitpulse)](https://github.com/wuchunjie00/gitpulse/blob/main/LICENSE)

## Quick Start

```bash
npm i -g @wuchunjie/gitpulse
gitpulse
```

## Features

- 🔥 **File Hotspots** — Identify technical debt magnets
- 📊 **Commit Patterns** — Spot burnout before it happens
- 🔀 **Branch Strategy** — Track PR vs direct-push ratio
- 👥 **Contributor Impact** — Measure what actually ships

## Usage

```bash
# This month's analytics
gitpulse

# Last quarter
gitpulse --period 3m

# Compare branches
gitpulse --compare main..develop

# Export for sharing
gitpulse --export csv > repo-health.csv
```

## Why gitpulse?

`git blame` tells you WHO changed a line. It doesn't tell you WHY a file changes 47 times a month, or whether your team is burning out on weekends. gitpulse does.

---

## 🛠️ More Free CLI Tools

| Tool | Description | Install |
|------|-------------|---------|
| [scaffoldx](https://github.com/wuchunjie00/scaffoldx) | Project scaffolding — 12 templates | `npm i -g scaffoldx-cli` |
| [dotguard](https://github.com/wuchunjie00/dotguard) | Secret detection & scanning | `npm i -g @wuchunjie/dotguard` |
| [gitpulse](https://github.com/wuchunjie00/gitpulse) | Git analytics & hotspots | `npm i -g @wuchunjie/gitpulse` |
| [snippetx](https://github.com/wuchunjie00/snippetx) | CLI snippet manager | `npm i -g @wuchunjie/snippetx` |

**One-liner:** `npm i -g scaffoldx-cli @wuchunjie/dotguard @wuchunjie/gitpulse @wuchunjie/snippetx`

☕ [Ko-fi](https://ko-fi.com/wuchunjie) | 📝 [Dev.to](https://dev.to/ke_jia_24bb2f9f84f14f728a) | 💬 [Discussions](https://github.com/wuchunjie00/scaffoldx/discussions)
