interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
