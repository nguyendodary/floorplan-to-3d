declare global {
  interface Window {
    puter: {
      auth: {
        getUser: () => Promise<PuterUser | null>;
        signIn: () => Promise<void>;
        signOut: () => Promise<void>;
      };
      ai: {
        img2txt: (image: string | File | Blob, testMode?: boolean) => Promise<string>;
        chat: (prompt: string, imageURL?: string | File | Blob, options?: Record<string, unknown>, testMode?: boolean) => Promise<PuterChatResponse>;
        txt2img: (prompt: string, options?: any) => Promise<HTMLImageElement>;
      };
      fs: {
        write: (path: string, data: string | File | Blob) => Promise<PuterFile>;
        read: (path: string) => Promise<Blob>;
        upload: (files: File[]) => Promise<PuterFile[]>;
        delete: (path: string) => Promise<void>;
        readdir: (path: string) => Promise<PuterDirEntry[] | undefined>;
      };
      kv: {
        get: (key: string) => Promise<string | null>;
        set: (key: string, value: string) => Promise<boolean>;
        del: (key: string) => Promise<boolean>;
        list: (prefix: string, returnValues?: boolean) => Promise<string[] | KVItem[]>;
        flush: () => Promise<boolean>;
      };
    };
  }
}

export interface PuterUser {
  uuid: string;
  username: string;
}

export interface PuterChatResponse {
  message: {
    content: string;
    role: string;
  };
}

export interface PuterFile {
  path: string;
  name: string;
  size: number;
  type?: string;
}

export interface PuterDirEntry {
  name: string;
  path: string;
  size: number;
  is_dir: boolean;
  created: number;
  modified: number;
}

export interface KVItem {
  key: string;
  value: string;
}

export interface Transformation {
  id: string;
  userId: string;
  username: string;
  originalImageUrl: string;
  generatedImageUrl?: string;
  description: string;
  createdAt: number;
}

export interface PuterContextType {
  user: PuterUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  uploadFile: (file: File) => Promise<PuterFile | null>;
  generateImage: (image: string | File | Blob) => Promise<string | null>;
  saveTransformation: (transformation: Transformation) => Promise<boolean>;
  getRecentTransformations: () => Promise<Transformation[]>;
  deleteTransformation: (id: string) => Promise<boolean>;
}
