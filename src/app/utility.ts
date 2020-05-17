export class Utility {
  static isDefined<T>(value: T | undefined | null): value is T {
    return (value as any) !== undefined && (value as any) !== null;
  }
}
