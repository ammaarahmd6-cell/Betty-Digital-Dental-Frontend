import { Helmet } from 'react-helmet-async';
import { workflowSteps } from '../data/siteData';

function Workflow() {
  return (
    <>
      <Helmet><title>Digital Dental Workflow | Scan, CAD, CAM, Print</title><meta name="description" content="Understand the full digital dental workflow from patient scan and CAD design to milling, 3D printing, finishing, and final restoration." /></Helmet>
      <section className="page-hero"><div className="container"><span className="eyebrow">Workflow</span><h1>Professional Digital Dental Workflow</h1><p>A clear production pathway for clinics and laboratories moving into digital dentistry.</p></div></section>
      <section className="section light-bg"><div className="container"><div className="workflow-line">{workflowSteps.map((step, index) => <div className="workflow-step" key={step} data-aos="fade-up"><span>{index + 1}</span><h6>{step}</h6><p>{workflowCopy[index]}</p></div>)}</div></div></section>
    </>
  );
}

const workflowCopy = [
  'Capture accurate intraoral or model data using modern scanning technology.',
  'Create clean digital impressions ready for design and production planning.',
  'Design restorations, guides, models, and appliances with CAD software.',
  'Produce cases through validated milling or 3D printing processes.',
  'Refine fit, aesthetics, surface quality, and clinical finishing requirements.',
  'Deliver consistent final restorations with reliable repeatable workflows.'
];

export default Workflow;
