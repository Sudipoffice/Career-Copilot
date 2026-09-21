import fs from 'fs/promises';
import mammoth from 'mammoth';

const MAX_TEXT_LENGTH = 50000;

export async function extractText(filePath: string, mimeType: string): Promise<string> {
  const buffer = await fs.readFile(filePath);

  let text = '';

  if (mimeType === 'application/pdf') {
    const { PDFParse } = await import('pdf-parse');
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    parser.destroy();
    text = result.text;
  } else if (
    mimeType === 'application/msword' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else {
    throw new Error(`Unsupported file type: ${mimeType}`);
  }

  return text.slice(0, MAX_TEXT_LENGTH);
}
