/// <reference types="vite/client" />

declare interface Window {
  env: {
    VITE_API_URL: string;
    VITE_SOCKET_URL: string;
    VITE_CLOUDINARY_CLOUD_NAME: string;
    VITE_CLOUDINARY_API_KEY: string;
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

declare const process: {
  env: {
    NODE_ENV: 'development' | 'production';
    [key: string]: string | undefined;
  };
};

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
} 