// scripts/generateBlur.mjs
import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs/promises';

async function generateBlur() {
  try {
    const { base64 } = await getPlaiceholder('./public/images/miro.png');
    await fs.writeFile('./src/data/blurDataURL.json', JSON.stringify({ blurDataURL: base64 }));
    console.log('Blur data URL generated successfully!');
  } catch (error) {
    console.error('Error generating blur data URL:', error);
  }
}

generateBlur();