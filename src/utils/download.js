export async function downloadAsImage(element, filename = 'passenger.png') {
  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff', scale: 2, useCORS: true, logging: false,
  });
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function downloadAsPDF(element, filename = 'passenger.pdf') {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);
  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff', scale: 2, useCORS: true, logging: false,
  });
  const imgData = canvas.toDataURL('image/png');
  const pw = canvas.width / 2;
  const ph = canvas.height / 2;
  const pdf = new jsPDF({ orientation: ph > pw ? 'portrait' : 'landscape', unit: 'px', format: [pw, ph] });
  pdf.addImage(imgData, 'PNG', 0, 0, pw, ph);
  pdf.save(filename);
}
