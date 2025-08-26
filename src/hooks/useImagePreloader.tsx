import { useState, useEffect, useCallback } from 'react';

interface UseImagePreloaderProps {
  images: string[];
  priority?: number;
}

interface PreloadState {
  loaded: Set<string>;
  loading: Set<string>;
  failed: Set<string>;
  progress: number;
}

export const useImagePreloader = ({ images, priority = 3 }: UseImagePreloaderProps) => {
  const [state, setState] = useState<PreloadState>({
    loaded: new Set(),
    loading: new Set(),
    failed: new Set(),
    progress: 0,
  });

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setState(prev => {
          const newLoaded = new Set(prev.loaded);
          newLoaded.add(src);
          const newLoading = new Set(prev.loading);
          newLoading.delete(src);
          
          return {
            ...prev,
            loaded: newLoaded,
            loading: newLoading,
            progress: (newLoaded.size / images.length) * 100,
          };
        });
        resolve();
      };
      
      img.onerror = () => {
        setState(prev => {
          const newFailed = new Set(prev.failed);
          newFailed.add(src);
          const newLoading = new Set(prev.loading);
          newLoading.delete(src);
          
          return {
            ...prev,
            failed: newFailed,
            loading: newLoading,
            progress: ((prev.loaded.size + newFailed.size) / images.length) * 100,
          };
        });
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });
  }, [images.length]);

  const preloadBatch = useCallback(async (batch: string[]) => {
    setState(prev => ({
      ...prev,
      loading: new Set([...prev.loading, ...batch])
    }));

    const promises = batch.map(src => 
      preloadImage(src).catch(error => {
        console.warn('Image preload failed:', error);
      })
    );

    await Promise.allSettled(promises);
  }, [preloadImage]);

  useEffect(() => {
    if (images.length === 0) return;

    const batches: string[][] = [];
    for (let i = 0; i < images.length; i += priority) {
      batches.push(images.slice(i, i + priority));
    }

    const loadBatches = async () => {
      for (const batch of batches) {
        await preloadBatch(batch);
        // Small delay between batches to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    loadBatches();
  }, [images, priority, preloadBatch]);

  return {
    loaded: state.loaded,
    loading: state.loading,
    failed: state.failed,
    progress: state.progress,
    isImageLoaded: (src: string) => state.loaded.has(src),
    isImageLoading: (src: string) => state.loading.has(src),
    isImageFailed: (src: string) => state.failed.has(src),
    allLoaded: state.loaded.size === images.length,
  };
};