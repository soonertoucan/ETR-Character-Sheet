import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages project sites, assets are served from /<repo-name>/.
// Override at build time with: VITE_BASE=/your-repo/ npm run build
const base = process.env.VITE_BASE || '/Eat-the-Reich-Character-Sheet/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use root base in dev so localhost works without the repo path prefix.
  base: command === 'serve' ? '/' : base,
}))
