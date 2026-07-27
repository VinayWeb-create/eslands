const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'About.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  { regex: /bg-white/g, replacement: 'bg-slate-950' },
  { regex: /bg-slate-50/g, replacement: 'bg-slate-900/50' },
  { regex: /bg-slate-100/g, replacement: 'bg-slate-800' },
  { regex: /text-slate-900/g, replacement: 'text-white' },
  { regex: /text-slate-600/g, replacement: 'text-slate-400' },
  { regex: /text-slate-700/g, replacement: 'text-slate-300' },
  { regex: /text-slate-800/g, replacement: 'text-slate-200' },
  { regex: /border-slate-200/g, replacement: 'border-white/10' },
  { regex: /border-slate-100/g, replacement: 'border-white/5' },
  { regex: /border-slate-300/g, replacement: 'border-slate-600/50' },
  { regex: /from-white/g, replacement: 'from-slate-950' },
  { regex: /to-white/g, replacement: 'to-slate-950' },
  { regex: /via-white/g, replacement: 'via-slate-950' },
  { regex: /bg-sky-50/g, replacement: 'bg-sky-400/5' },
  { regex: /bg-indigo-50/g, replacement: 'bg-indigo-400/5' },
  { regex: /bg-purple-50/g, replacement: 'bg-purple-400/5' },
  { regex: /bg-pink-50/g, replacement: 'bg-pink-400/5' },
  { regex: /border-sky-200/g, replacement: 'border-sky-400/20' },
  { regex: /border-indigo-200/g, replacement: 'border-indigo-400/20' },
  { regex: /border-purple-200/g, replacement: 'border-purple-400/20' },
  { regex: /border-pink-200/g, replacement: 'border-pink-400/20' }
];

replacements.forEach(({ regex, replacement }) => {
  content = content.replace(regex, replacement);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('About.jsx reverted successfully.');
