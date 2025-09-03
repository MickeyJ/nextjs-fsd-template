'use client';

import { forwardRef, useCallback, useState } from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Progress } from '@/shared/ui/progress';
import { cva, type VariantProps } from 'class-variance-authority';

const imageUploadVariants = cva('relative rounded-lg border-2 border-dashed transition-colors', {
  variants: {
    variant: {
      default: 'border-neutral-300 hover:border-neutral-400 ',
      error: 'border-error-500',
      success: 'border-success-500',
    },
    size: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface UploadedFile {
  file: File;
  preview: string;
  progress?: number;
  error?: string;
}

export interface ImageUploadProps extends Omit<DropzoneOptions, 'onDrop'>, VariantProps<typeof imageUploadVariants> {
  className?: string;
  value?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  onUpload?: (file: File) => Promise<string>;
  maxFiles?: number;
  maxSize?: number;
  error?: string;
}

export const ImageUpload = forwardRef<HTMLDivElement, ImageUploadProps>(
  (
    {
      className,
      variant,
      size,
      value = [],
      onChange,
      onUpload,
      maxFiles = 5,
      maxSize = 5 * 1024 * 1024, // 5MB
      error,
      accept = {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      },
      ...dropzoneOptions
    },
    ref
  ) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const onDrop = useCallback(
      async (acceptedFiles: File[]) => {
        const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
        }));

        const updatedFiles = [...value, ...newFiles].slice(0, maxFiles);
        onChange?.(updatedFiles);

        if (onUpload) {
          setUploading(true);
          for (let i = 0; i < newFiles.length; i++) {
            try {
              const url = await onUpload(newFiles[i].file);
              updatedFiles[value.length + i] = {
                ...newFiles[i],
                preview: url,
                progress: 100,
              };
              onChange?.(updatedFiles);
            } catch (err) {
              updatedFiles[value.length + i] = {
                ...newFiles[i],
                error: err instanceof Error ? err.message : 'Upload failed',
              };
              onChange?.(updatedFiles);
            }
          }
          setUploading(false);
        }
      },
      [value, onChange, onUpload, maxFiles]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept,
      maxSize,
      maxFiles: maxFiles - value.length,
      disabled: value.length >= maxFiles || uploading,
      onDragEnter: () => setDragActive(true),
      onDragLeave: () => setDragActive(false),
      ...dropzoneOptions,
    });

    const removeFile = (index: number) => {
      const newFiles = [...value];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      onChange?.(newFiles);
    };

    const hasError = error || variant === 'error';

    return (
      <div
        ref={ref}
        className={className}
      >
        <div
          {...getRootProps()}
          className={cn(
            imageUploadVariants({ variant: hasError ? 'error' : variant, size }),
            dragActive && 'border-primary-500 bg-primary-50',
            (value.length >= maxFiles || uploading) && 'cursor-not-allowed opacity-50'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            {isDragActive ? (
              <>
                <Upload className="mb-4 h-12 w-12 text-primary-500" />
                <p className="text-sm font-medium">Drop files here</p>
              </>
            ) : (
              <>
                <Upload className="mb-4 h-12 w-12 text-neutral-400" />
                <p className="text-sm font-medium">Drag & drop files here, or click to select</p>
                <p className="mt-1 text-xs text-neutral-500">
                  {maxFiles > 1 ? `Up to ${maxFiles} files, ` : ''}
                  Max {Math.round(maxSize / 1024 / 1024)}MB each
                </p>
              </>
            )}
          </div>
        </div>

        {error && <p className="mt-2 text-sm text-error-600">{error}</p>}

        {value.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {value.map((file, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-neutral-200"
              >
                {file.file.type.startsWith('image/') ? (
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="h-24 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-24 items-center justify-center bg-neutral-100">
                    <FileText className="h-8 w-8 text-neutral-400" />
                  </div>
                )}

                {file.progress !== undefined && file.progress < 100 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-10/50">
                    <div className="w-3/4">
                      <Progress
                        value={file.progress}
                        className="h-1"
                      />
                    </div>
                  </div>
                )}

                {file.error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-error-500/10">
                    <p className="text-xs text-error-600">Failed</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute right-1 top-1 rounded-full bg-neutral-10/50 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-3 w-3 text-neutral-50" />
                </button>

                <div className="p-1">
                  <p className="truncate text-xs">{file.file.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';
