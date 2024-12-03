interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_SOCKET_URL: string;
  VITE_CLOUDINARY_CLOUD_NAME: string;
  VITE_CLOUDINARY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly hot?: {
    accept: (callback?: (modules: any[]) => void) => void;
    dispose: (callback: (data: any) => void) => void;
    data: any;
  };
}

declare module 'module' {
  interface Module {
    hot?: {
      accept: (callback?: (modules: any[]) => void) => void;
      dispose: (callback: (data: any) => void) => void;
      data: any;
    };
  }
} 