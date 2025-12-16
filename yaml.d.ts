// Declares YAML files as modules with the default export. Typescript doesnt natively support yaml

declare module '*.yaml' {
  const data: any;
  export default data;
}

declare module '*.yml' {
  const data: any;
  export default data;
}