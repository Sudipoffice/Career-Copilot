import fs from 'fs/promises';
import mammoth from 'mammoth';
import pdf2json from 'pdf2json';

const MAX_TEXT_LENGTH = 15000;

function parsePdfWithPdf2json(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const parser = new pdf2json();
    parser.on('pdfParser_dataReady', (data: any) => {
      const text = data.Pages?.map((p: any) =>
        p.Texts?.map((t: any) => decodeURIComponent(t.R[0]?.T || '')).join(' ')
      ).join('\n') || '';
      resolve(text);
    });
    parser.on('pdfParser_dataError', (err: any) => reject(err.parserError));
    parser.loadPDF(filePath);
  });
}

export async function extractText(filePath: string, mimeType: string): Promise<string> {
  let text = '';

  if (mimeType === 'application/pdf') {
    text = await parsePdfWithPdf2json(filePath);
  } else if (
    mimeType === 'application/msword' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const buffer = await fs.readFile(filePath);
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else {
    throw new Error(`Unsupported file type: ${mimeType}`);
  }

  return text.slice(0, MAX_TEXT_LENGTH);
}
