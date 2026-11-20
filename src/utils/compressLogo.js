// Resizes a logo in the browser and saves it as a PNG (keeps transparency). SVG logos are converted to PNG too.
export async function compressLogo(file, maxSize = 800) {
  if (!file.type.startsWith('image/')) throw new Error(`${file.name} is not an image`)
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = () => reject(new Error('Could not read that image'))
      el.src = url
    })
    const w0 = img.naturalWidth || 400
    const h0 = img.naturalHeight || 200
    const scale = Math.min(1, maxSize / Math.max(w0, h0))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(w0 * scale))
    canvas.height = Math.max(1, Math.round(h0 * scale))
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) throw new Error('Could not process that image')
    return blob
  } finally {
    URL.revokeObjectURL(url)
  }
}
