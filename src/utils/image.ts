import fs from 'fs';
import path from 'path';

export class ImageHandler {
  static readImageAsBase64(imagePath: string): string {
    try {
      const fullPath = path.resolve(imagePath);
      
      if (!fs.existsSync(fullPath)) {
        console.warn(`이미지 파일을 찾을 수 없습니다: ${fullPath}`);
        return '';
      }

      const imageBuffer = fs.readFileSync(fullPath);
      const ext = path.extname(imagePath).toLowerCase();
      
      let mimeType = 'image/png';
      switch (ext) {
        case '.jpg':
        case '.jpeg':
          mimeType = 'image/jpeg';
          break;
        case '.gif':
          mimeType = 'image/gif';
          break;
        case '.svg':
          mimeType = 'image/svg+xml';
          break;
        case '.png':
        default:
          mimeType = 'image/png';
          break;
      }

      return `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
    } catch (error) {
      console.error('이미지 읽기 오류:', error);
      return '';
    }
  }

  static getImageMimeType(imagePath: string): string {
    const ext = path.extname(imagePath).toLowerCase();
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.gif':
        return 'image/gif';
      case '.svg':
        return 'image/svg+xml';
      case '.png':
      default:
        return 'image/png';
    }
  }
}