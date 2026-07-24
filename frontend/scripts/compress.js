import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');

async function compressImage(filename, quality = 75, maxWidth = 1200) {
  const filePath = path.join(PUBLIC_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filename}`);
    return;
  }

  const tempPath = filePath + '.tmp';
  const statsBefore = fs.statSync(filePath);
  const sizeBeforeKB = (statsBefore.size / 1024).toFixed(2);

  try {
    console.log(`Compressing ${filename} (Original size: ${sizeBeforeKB} KB)...`);
    
    let pipeline = sharp(filePath);
    
    // Get metadata to check width
    const metadata = await pipeline.metadata();
    if (metadata.width > maxWidth) {
      console.log(`Resizing ${filename} from width ${metadata.width} to ${maxWidth}...`);
      pipeline = pipeline.resize(maxWidth);
    }
    
    // Compress based on format
    if (metadata.format === 'png') {
      pipeline = pipeline.png({ quality: quality, compressionLevel: 9 });
    } else if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      pipeline = pipeline.jpeg({ quality: quality });
    }
    
    await pipeline.toFile(tempPath);
    
    // Replace original with compressed version
    fs.renameSync(tempPath, filePath);
    
    const statsAfter = fs.statSync(filePath);
    const sizeAfterKB = (statsAfter.size / 1024).toFixed(2);
    const savings = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(2);
    
    console.log(`Successfully compressed ${filename}: ${sizeAfterKB} KB (Saved ${savings}%)`);
  } catch (error) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.error(`Error compressing ${filename}:`, error);
  }
}

async function run() {
  await compressImage('flower_delivery_van_nairobi.png', 75, 1000);
  await compressImage('florist_working_about_us.png', 75, 1000);
  await compressImage('WhatsApp Image 2026-05-14 at 7.35.48 PM.jpeg', 80, 1200);
  await compressImage('WhatsApp Image 2026-04-12 at 7.50.49 PM.jpeg', 80, 1200);
}

run();
