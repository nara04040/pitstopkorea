'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  onImagesChange: (images: string[]) => void;
  initialImages?: string[];
}

export default function ImageUploader({ onImagesChange, initialImages = [] }: ImageUploaderProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialImages);

  useEffect(() => {
    if (initialImages.length > 0) {
      setPreviewUrls(initialImages);
    }
  }, [initialImages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + previewUrls.length > 10) {
      alert('이미지는 최대 10장까지 업로드할 수 있습니다.');
      return;
    }

    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    onImagesChange([...previewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    onImagesChange(previewUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {previewUrls.map((url, index) => (
          <div key={url} className="relative">
            <Image
              src={url}
              alt={`Preview ${index + 1}`}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-f1-red text-white rounded-full"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {previewUrls.length < 10 && (
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="inline-block px-4 py-2 bg-bg-secondary text-text-primary rounded-lg cursor-pointer hover:bg-bg-tertiary transition-colors"
          >
            이미지 업로드 ({previewUrls.length}/10)
          </label>
        </div>
      )}
    </div>
  );
} 