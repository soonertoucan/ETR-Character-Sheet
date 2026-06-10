// Render a DOM node to PNG or PDF using html2canvas + jsPDF.
// Imported lazily so the heavy libs aren't in the initial bundle.
import { downloadBlob, slugify } from './files'

async function renderCanvas(node) {
  const { default: html2canvas } = await import('html2canvas')
  return html2canvas(node, {
    backgroundColor: '#0c0a08',
    scale: 2,
    useCORS: true,
    logging: false,
  })
}

export async function snapshotPNG(node, name) {
  const canvas = await renderCanvas(node)
  const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'))
  downloadBlob(`${slugify(name)}-sheet.png`, blob)
}

export async function snapshotPDF(node, name) {
  const canvas = await renderCanvas(node)
  const imgData = canvas.toDataURL('image/png')
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({
    orientation: canvas.width >= canvas.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  })
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
  pdf.save(`${slugify(name)}-sheet.pdf`)
}
