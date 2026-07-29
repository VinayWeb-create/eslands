import PDFDocument from 'pdfkit';

export function generateQuotePDF(quote, lead) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', (err) => reject(err));

    // Brand Header
    doc.fillColor('#0ea5e9').fontSize(24).font('Helvetica-Bold').text('ESLAND IT SOLUTIONS', { align: 'right' });
    doc.fillColor('#64748b').fontSize(9).font('Helvetica').text('Enterprise Cloud Platforms & Technical Training', { align: 'right' });
    doc.text('London, United Kingdom | support@eslanditsolutions.com', { align: 'right' });
    doc.moveDown(2);

    // Document Title
    doc.fillColor('#1e293b').fontSize(16).font('Helvetica-Bold').text(`QUOTATION PROPOSAL: ${quote.quoteNumber}`, { underline: true });
    doc.moveDown();

    // Client Metadata Info Box
    const metaY = doc.y;
    doc.fontSize(10).font('Helvetica-Bold').text('Prepared For:', 50, metaY);
    doc.font('Helvetica').text(`Name: ${lead.name}`);
    doc.text(`Email: ${lead.email}`);
    doc.text(`Phone: ${lead.phone || 'N/A'}`);
    if (lead.company) doc.text(`Company: ${lead.company}`);

    doc.font('Helvetica-Bold').text('Proposal Summary:', 350, metaY);
    const dateIssued = quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : new Date().toLocaleDateString();
    const validUntil = quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : '—';
    doc.font('Helvetica').text(`Date Issued: ${dateIssued}`, 350);
    doc.text(`Valid Until: ${validUntil}`, 350);
    doc.text(`Status: ${quote.status ? quote.status.toUpperCase() : 'SENT'}`, 350);
    
    doc.moveDown(2);

    // Draw Table Line Header
    const tableHeaderY = doc.y;
    doc.font('Helvetica-Bold');
    doc.text('Service Description', 50, tableHeaderY, { width: 280 });
    doc.text('Qty', 340, tableHeaderY, { width: 40, align: 'right' });
    doc.text('Unit Price', 390, tableHeaderY, { width: 80, align: 'right' });
    doc.text('Total', 480, tableHeaderY, { width: 80, align: 'right' });
    doc.moveDown(0.5);
    
    doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke('#cbd5e1');
    doc.moveDown();

    // Items List
    quote.items.forEach((item) => {
      const currentY = doc.y;
      doc.font('Helvetica-Bold').text(item.service, 50, currentY, { width: 280 });
      doc.font('Helvetica').fontSize(9).fillColor('#64748b').text(item.description || 'N/A', 50, currentY + 12, { width: 280 });
      
      doc.fontSize(10).fillColor('#1e293b');
      doc.text(item.quantity.toString(), 340, currentY, { width: 40, align: 'right' });
      doc.text(`£${item.unitPrice.toLocaleString()}`, 390, currentY, { width: 80, align: 'right' });
      doc.text(`£${item.total.toLocaleString()}`, 480, currentY, { width: 80, align: 'right' });
      doc.moveDown(2);
    });

    doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke('#94a3b8');
    doc.moveDown(1.5);

    // Summary Calculations
    const totalsY = doc.y;
    doc.font('Helvetica').text(`Subtotal:`, 350, totalsY, { width: 100, align: 'right' });
    doc.text(`£${quote.subtotal.toLocaleString()}`, 460, totalsY, { width: 100, align: 'right' });

    doc.text(`Tax (${quote.taxRate}%):`, 350, totalsY + 15, { width: 100, align: 'right' });
    doc.text(`£${quote.taxAmount.toLocaleString()}`, 460, totalsY + 15, { width: 100, align: 'right' });

    doc.font('Helvetica-Bold').fontSize(12).text(`Grand Total:`, 350, totalsY + 35, { width: 100, align: 'right' });
    doc.text(`£${quote.total.toLocaleString()}`, 460, totalsY + 35, { width: 100, align: 'right' });

    // Terms
    doc.fontSize(8).fillColor('#94a3b8').font('Helvetica-Oblique').text('All systems, training services, and platforms are subject to our general business terms.', 50, 700, { align: 'center' });

    doc.end();
  });
}

export function generateInvoicePDF(invoice, lead) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', (err) => reject(err));

    // Brand Header
    doc.fillColor('#4f46e5').fontSize(24).font('Helvetica-Bold').text('ESLAND IT SOLUTIONS', { align: 'right' });
    doc.fillColor('#64748b').fontSize(9).font('Helvetica').text('Enterprise Cloud Platforms & Technical Training', { align: 'right' });
    doc.text('VAT Reg No: GB987654321', { align: 'right' });
    doc.moveDown(2);

    // Document Title
    doc.fillColor('#1e293b').fontSize(16).font('Helvetica-Bold').text(`TAX INVOICE: ${invoice.invoiceNumber}`, { underline: true });
    doc.moveDown();

    // Client Metadata Info Box
    const metaY = doc.y;
    doc.fontSize(10).font('Helvetica-Bold').text('Billed To:', 50, metaY);
    doc.font('Helvetica').text(`Name: ${lead.name}`);
    doc.text(`Email: ${lead.email}`);
    doc.text(`Phone: ${lead.phone || 'N/A'}`);

    doc.font('Helvetica-Bold').text('Invoice Details:', 350, metaY);
    const invoiceDate = invoice.issuedAt ? new Date(invoice.issuedAt).toLocaleDateString() : new Date().toLocaleDateString();
    doc.font('Helvetica').text(`Invoice Date: ${invoiceDate}`, 350);
    doc.text(`Payment Status: PAID`, 350);
    
    doc.moveDown(2);

    // Draw Table Line Header
    const tableHeaderY = doc.y;
    doc.font('Helvetica-Bold');
    doc.text('Description', 50, tableHeaderY, { width: 280 });
    doc.text('Qty', 340, tableHeaderY, { width: 40, align: 'right' });
    doc.text('Unit Price', 390, tableHeaderY, { width: 80, align: 'right' });
    doc.text('Total', 480, tableHeaderY, { width: 80, align: 'right' });
    doc.moveDown(0.5);
    
    doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke('#cbd5e1');
    doc.moveDown();

    // Items List
    invoice.items.forEach((item) => {
      const currentY = doc.y;
      doc.font('Helvetica-Bold').text(item.service, 50, currentY, { width: 280 });
      doc.font('Helvetica').fontSize(9).fillColor('#64748b').text(item.description || 'N/A', 50, currentY + 12, { width: 280 });
      
      doc.fontSize(10).fillColor('#1e293b');
      doc.text(item.quantity.toString(), 340, currentY, { width: 40, align: 'right' });
      doc.text(`£${item.unitPrice.toLocaleString()}`, 390, currentY, { width: 80, align: 'right' });
      doc.text(`£${item.total.toLocaleString()}`, 480, currentY, { width: 80, align: 'right' });
      doc.moveDown(2);
    });

    doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke('#94a3b8');
    doc.moveDown(1.5);

    // Summary Calculations
    const totalsY = doc.y;
    doc.font('Helvetica').text(`Subtotal:`, 350, totalsY, { width: 100, align: 'right' });
    doc.text(`£${invoice.subtotal.toLocaleString()}`, 460, totalsY, { width: 100, align: 'right' });

    doc.text(`GST (${invoice.taxRate}%):`, 350, totalsY + 15, { width: 100, align: 'right' });
    doc.text(`£${invoice.taxAmount.toLocaleString()}`, 460, totalsY + 15, { width: 100, align: 'right' });

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#4f46e5').text(`Total Paid:`, 350, totalsY + 35, { width: 100, align: 'right' });
    doc.text(`£${invoice.total.toLocaleString()}`, 460, totalsY + 35, { width: 100, align: 'right' });

    // Terms
    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica').text('Thank you for your business!', 50, 700, { align: 'center' });

    doc.end();
  });
}

export function generateCertificatePDF(studentName, courseName, certNumber) {
  return new Promise((resolve, reject) => {
    // Landscape certificate format
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 40 });
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', (err) => reject(err));

    // Outer Decorative Border
    doc.rect(20, 20, 742, 535).lineWidth(5).stroke('#1e3a8a');
    doc.rect(28, 28, 726, 519).lineWidth(2.5).stroke('#d97706'); // Gold border
    
    doc.moveDown(3);
    
    // Decorative Medallion/Icon Representation
    doc.fillColor('#1e3a8a').fontSize(36).font('Times-Bold').text('ESLAND IT SOLUTIONS', { align: 'center' });
    doc.fillColor('#64748b').fontSize(14).font('Helvetica-Bold').text('CERTIFICATE OF ACADEMIC ACHIEVEMENT', { align: 'center', characterSpacing: 1.5 });
    doc.moveDown(2);

    doc.fillColor('#1e293b').fontSize(16).font('Times-Italic').text('This is to certify that', { align: 'center' });
    doc.moveDown(0.5);

    doc.fillColor('#d97706').fontSize(32).font('Times-Bold').text(studentName, { align: 'center' });
    doc.moveDown(0.5);

    doc.fillColor('#1e293b').fontSize(16).font('Times-Italic').text('has successfully completed the enterprise course curriculum for:', { align: 'center' });
    doc.moveDown(1);

    doc.fillColor('#1e3a8a').fontSize(22).font('Helvetica-Bold').text(courseName, { align: 'center' });
    doc.moveDown(2.5);

    // Signatures
    const sigY = doc.y;
    
    doc.fillColor('#64748b').fontSize(10).font('Helvetica');
    doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, 120, sigY);
    doc.text(`ID Reference: ${certNumber}`, 120, sigY + 15);

    doc.fillColor('#1e3a8a');
    doc.text('__________________________________', 480, sigY - 10);
    doc.fillColor('#64748b').text('Director of Training & Academics', 490, sigY + 5);

    doc.end();
  });
}
