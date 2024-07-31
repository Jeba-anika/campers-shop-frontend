interface ProcessEnv {
  REACT_APP_STRIPE_PK: string;
}

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
}
