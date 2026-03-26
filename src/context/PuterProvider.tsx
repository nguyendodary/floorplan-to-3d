import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { PuterContext } from './PuterContext';
import type { PuterUser, Transformation } from '../types';

const waitForPuter = (maxRetries = 50): Promise<boolean> => {
  return new Promise((resolve) => {
    let attempts = 0;
    const check = () => {
      if (typeof window.puter !== 'undefined' && typeof window.puter.auth !== 'undefined') {
        resolve(true);
        return;
      }
      attempts++;
      if (attempts >= maxRetries) {
        resolve(false);
        return;
      }
      setTimeout(check, 200);
    };
    check();
  });
};

export const PuterProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PuterUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const ready = await waitForPuter();
    if (!ready) {
      setIsLoading(false);
      return;
    }
    try {
      const userData = await window.puter.auth.getUser();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signIn = async () => {
    try {
      await window.puter.auth.signIn();
      const userData = await window.puter.auth.getUser();
      setUser(userData);
    } catch (e) {
      console.error('Sign in failed:', e);
    }
  };

  const signOut = async () => {
    try {
      await window.puter.auth.signOut();
    } catch {
      // ignore
    }
    setUser(null);
  };

  const uploadFile = async (file: File) => {
    try {
      const [uploaded] = await window.puter.fs.upload([file]);
      return uploaded;
    } catch {
      return null;
    }
  };

  const generateImage = async (image: string | File | Blob): Promise<string | null> => {
    try {
      console.log('Generating 3D render from floor plan...');
      const prompt = 'A photorealistic 3D architectural render of a modern house interior based on this floor plan, high resolution, detailed lighting, wooden floors, minimalist furniture, 8k resolution.';
      
      // Use the one-step image-to-image process
      const imageElement = await window.puter.ai.txt2img(prompt, { input_image: image });
      console.log('Successfully generated 3D image.');
      return imageElement.src;
    } catch (e) {
      console.error('AI generation error details:', JSON.stringify(e, Object.getOwnPropertyNames(e)));
      return null;
    }
  };

  const saveTransformation = async (transformation: Transformation): Promise<boolean> => {
    try {
      const existing = await window.puter.kv.get('transformations');
      const transformations: Transformation[] = existing ? JSON.parse(existing) : [];
      transformations.unshift(transformation);
      await window.puter.kv.set('transformations', JSON.stringify(transformations.slice(0, 50)));
      return true;
    } catch {
      return false;
    }
  };

  const getRecentTransformations = async (): Promise<Transformation[]> => {
    try {
      const data = await window.puter.kv.get('transformations');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const deleteTransformation = async (id: string): Promise<boolean> => {
    try {
      const existing = await window.puter.kv.get('transformations');
      const transformations: Transformation[] = existing ? JSON.parse(existing) : [];
      const filtered = transformations.filter((t) => t.id !== id);
      await window.puter.kv.set('transformations', JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  };

  return (
    <PuterContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signOut,
        uploadFile,
        generateImage,
        saveTransformation,
        getRecentTransformations,
        deleteTransformation,
      }}
    >
      {children}
    </PuterContext.Provider>
  );
};
