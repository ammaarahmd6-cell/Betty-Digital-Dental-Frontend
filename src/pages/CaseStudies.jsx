import { Helmet } from 'react-helmet-async';

function CaseStudies() {
  const cases = [
    ['Dental Lab CAD/CAM Upgrade', 'A mid-size lab moved from outsourcing to in-house scanning, design, milling, and finishing.'],
    ['Clinic Scanner Adoption', 'A clinic reduced impression retakes and improved case communication with a complete intraoral scan workflow.'],
    ['3D Printing Production Setup', 'A laboratory added model, guide, and splint printing with validated materials and staff training.']
  ];

  return (
    <>
      <Helmet><title>Dental CAD/CAM Case Studies</title><meta name="description" content="Case studies showing digital dental workflow setup, scanner adoption, milling workflow, 3D printing, and lab business transformation." /></Helmet>
      <section className="page-hero"><div className="container"><span className="eyebrow">Case Studies</span><h1>Real Digital Dental Workflow Outcomes</h1><p>Examples of clinics and laboratories improving speed, precision, and control with digital dentistry.</p></div></section>
      <section className="section"><div className="container"><div className="row g-4">{cases.map(([title, text], index) => <div className="col-lg-4" key={title}><div className="case-card" data-aos="fade-up"><span>0{index + 1}</span><h4>{title}</h4><p>{text}</p></div></div>)}</div></div></section>
    </>
  );
}

export default CaseStudies;
