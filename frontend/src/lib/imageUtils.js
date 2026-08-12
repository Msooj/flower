import { supabase } from './supabase';

/**
 * Compresses an image file using HTML Canvas to reduce file size before upload/storage.
 * @param {File} file - Local File object from input[type="file"]
 * @param {number} maxDimension - Maximum width or height in pixels (default 1200)
 * @param {number} quality - Quality level between 0.1 and 1.0 (default 0.82)
 * @returns {Promise<{ blob: Blob, dataUrl: string, fileName: string }>}
 */
export const compressImage = (file, maxDimension = 1200, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Invalid image file'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = (err) => reject(err);
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas image compression failed'));
              return;
            }
            const dataUrl = canvas.toDataURL(mimeType, quality);
            const ext = mimeType === 'image/png' ? 'png' : 'jpg';
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
            resolve({ blob, dataUrl, fileName });
          },
          mimeType,
          quality
        );
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Uploads a local image file to Supabase Storage with automatic client compression
 * and fallback to lightweight compressed Data URL if storage fails.
 * @param {File} file - Local File object
 * @param {string} folder - Destination folder, e.g. 'blogs' or 'products'
 * @param {string} primaryBucket - Primary storage bucket name (default 'products')
 * @returns {Promise<{ url: string, isStorageUrl: boolean }>}
 */
export const uploadAndOptimizeImage = async (file, folder = 'blogs', primaryBucket = 'products') => {
  if (!file) {
    throw new Error('No file provided');
  }

  // 1. Compress client-side first
  const { blob, dataUrl, fileName } = await compressImage(file, 1200, 0.82);
  const filePath = `${folder}/${fileName}`;

  // 2. Attempt Supabase Storage upload
  try {
    const bucketsToTry = [primaryBucket, folder, 'blogs', 'products'].filter(
      (value, index, self) => self.indexOf(value) === index
    );

    for (const bucketName of bucketsToTry) {
      try {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, blob, {
            contentType: blob.type,
            cacheControl: '3600',
            upsert: true,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

          if (publicUrlData?.publicUrl) {
            console.log(`Image successfully uploaded to bucket '${bucketName}':`, publicUrlData.publicUrl);
            return { url: publicUrlData.publicUrl, isStorageUrl: true };
          }
        }
      } catch (bucketErr) {
        console.warn(`Upload attempt failed on bucket '${bucketName}':`, bucketErr);
      }
    }
  } catch (err) {
    console.warn('Storage upload error, using compressed Data URL fallback:', err);
  }

  // 3. Fallback to compressed Data URL (tiny ~80KB-200KB string)
  console.log('Using compressed Data URL fallback for local image');
  return { url: dataUrl, isStorageUrl: false };
};
