import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ImageService {
  resizeImage(file: File, maxSize: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        let width = image.width;
        let height = image.height;
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          const img = new Image();
          img.onload = () => {
            // calculate the new width and height
            const maxWidth = 800;
            const maxHeight = 600;
            let width = img.width;
            let height = img.height;
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
        
            // resize the image
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
        
            // get the resized image as a Blob
            canvas.toBlob(blob => {
              if (blob) {
                // do something with the blob
              }
            }, 'image/jpeg', 0.7);
          };
          
        }
        
      };
      image.onerror = (error) => {
        observer.error(error);
      };
      image.src = URL.createObjectURL(file);
    });
  }
}