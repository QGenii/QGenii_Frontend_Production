import React from 'react';
import CertificateTemplateA from './CertificateTemplateA';
import CertificateTemplateB from './CertificateTemplateB';
import CertificateTemplateC from './CertificateTemplateC';
import CertificateTemplateD from './CertificateTemplateD';
import CertificateTemplateE from './CertificateTemplateE';

/**
 * Certificate Renderer
 * Automatically selects and renders the correct template based on templateId
 */
const CertificateRenderer = ({ certificate }) => {
  const { templateId } = certificate;

  switch (templateId) {
    case 'TEMPLATE_A':
      return <CertificateTemplateA certificate={certificate} />;
    case 'TEMPLATE_B':
      return <CertificateTemplateB certificate={certificate} />;
    case 'TEMPLATE_C':
      return <CertificateTemplateC certificate={certificate} />;
    case 'TEMPLATE_D':
      return <CertificateTemplateD certificate={certificate} />;
    case 'TEMPLATE_E':
      return <CertificateTemplateE certificate={certificate} />;
    default:
      // Fallback to Template A if template not recognized
      return <CertificateTemplateA certificate={certificate} />;
  }
};

export default CertificateRenderer;
