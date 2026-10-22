export interface GreetingOptions {
  prefix?: string;
}

export function greeting(
  name: string,
  options: GreetingOptions = {},
): string {
  const prefix = options.prefix ?? 'Hello';

  return `${prefix}, ${name}!`;
}