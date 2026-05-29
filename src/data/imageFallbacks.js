const svgData = (title, accent = '#00AEEF') => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#0B1F3A"/>
          <stop offset="1" stop-color="${accent}"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)"/>
      <circle cx="930" cy="170" r="130" fill="#ffffff" opacity="0.12"/>
      <circle cx="180" cy="640" r="180" fill="#ffffff" opacity="0.1"/>
      <path d="M545 245c-45-48-125-18-125 62 0 90 54 207 112 248 21 15 44 2 48-24l20-129c2-13 21-13 23 0l20 129c4 26 27 39 48 24 58-41 112-158 112-248 0-80-80-110-125-62-36 38-97 38-133 0Z" fill="#ffffff" opacity="0.92"/>
      <rect x="330" y="590" width="540" height="54" rx="27" fill="#ffffff" opacity="0.2"/>
      <text x="600" y="625" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700" fill="#ffffff">${title}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const fallbackImages = {
  clinic: svgData('Digital Dental Solutions'),
  product: svgData('Dental Product Image', '#17D4E8'),
  lab: svgData('Dental Lab Workflow', '#00AEEF'),
  printer: svgData('Dental 3D Technology', '#17D4E8'),
  blog: svgData('Digital Dentistry Article', '#00AEEF')
};
