declare module 'webmake' {
  interface WebmakeOptions {
    name?: string;
    cjs?: boolean;
    amd?: boolean;
    output?: string;
    ignoreErrors?: boolean;
  }

  type Callback = (error: Error, code: string) => any;

  function webmake(
    input: string,
    options?: WebmakeOptions | Callback,
    callback?: Callback,
  ): Promise<any>;

  export { webmake };
}
