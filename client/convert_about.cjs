const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'About.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  { regex: /bg-slate-950/g, replacement: 'bg-white' },
  { regex: /bg-slate-900\/50/g, replacement: 'bg-slate-50' },
  { regex: /bg-slate-900/g, replacement: 'bg-slate-50' },
  { regex: /bg-slate-800\/50/g, replacement: 'bg-white' },
  { regex: /bg-slate-800/g, replacement: 'bg-slate-100' },
  { regex: /text-white/g, replacement: 'text-slate-900' },
  { regex: /text-slate-400/g, replacement: 'text-slate-600' },
  { regex: /text-slate-300/g, replacement: 'text-slate-700' },
  { regex: /text-slate-200/g, replacement: 'text-slate-800' },
  { regex: /border-white\/10/g, replacement: 'border-slate-200' },
  { regex: /border-white\/5/g, replacement: 'border-slate-100' },
  { regex: /border-slate-800/g, replacement: 'border-slate-200' },
  { regex: /border-slate-700\/50/g, replacement: 'border-slate-200' },
  { regex: /border-slate-600\/50/g, replacement: 'border-slate-300' },
  { regex: /from-slate-950/g, replacement: 'from-white' },
  { regex: /to-slate-950/g, replacement: 'to-white' },
  { regex: /via-slate-950/g, replacement: 'via-white' },
  { regex: /bg-sky-400\/5/g, replacement: 'bg-sky-50' },
  { regex: /bg-indigo-400\/5/g, replacement: 'bg-indigo-50' },
  { regex: /bg-purple-400\/5/g, replacement: 'bg-purple-50' },
  { regex: /bg-pink-400\/5/g, replacement: 'bg-pink-50' },
  { regex: /border-sky-400\/20/g, replacement: 'border-sky-200' },
  { regex: /border-indigo-400\/20/g, replacement: 'border-indigo-200' },
  { regex: /border-purple-400\/20/g, replacement: 'border-purple-200' },
  { regex: /border-pink-400\/20/g, replacement: 'border-pink-200' }
];

replacements.forEach(({ regex, replacement }) => {
  content = content.replace(regex, replacement);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('About.jsx updated successfully.');
