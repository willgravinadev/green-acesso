export function Singleton<T>() {
  return class Singleton {
    static instance: T

    protected constructor() {}

    public static getInstance(): T {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton() as T
      }

      return Singleton.instance
    }
  }
}
