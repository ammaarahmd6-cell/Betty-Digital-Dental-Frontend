import { Helmet } from 'react-helmet-async';

function Videos() {
  const videos = [
    ['Intraoral scanning workflow', 'https://www.youtube.com/embed/dQw4w9WgXcQ'],
    ['CAD/CAM dental lab production', 'https://www.youtube.com/embed/dQw4w9WgXcQ'],
    ['Dental 3D printer applications', 'https://www.youtube.com/embed/dQw4w9WgXcQ']
  ];

  return (
    <>
      <Helmet><title>Dental Technology Videos</title><meta name="description" content="Watch videos about digital dental scanners, CAD/CAM workflows, milling machines, 3D printers, and lab technology." /></Helmet>
      <section className="page-hero"><div className="container"><span className="eyebrow">Videos</span><h1>Digital Dentistry Video Library</h1><p>Product demos, workflow explainers, and practical digital dental education.</p></div></section>
      <section className="section"><div className="container"><div className="row g-4">{videos.map(([title, url]) => <div className="col-lg-4" key={title}><div className="video-card"><iframe src={url} title={title} allowFullScreen /><h5>{title}</h5></div></div>)}</div></div></section>
    </>
  );
}

export default Videos;
