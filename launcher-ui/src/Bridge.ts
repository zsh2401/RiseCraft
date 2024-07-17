/* eslint-disable @typescript-eslint/no-explicit-any */
export class Bridge {
    private readonly schema = "native"

    async registerOnWindow(ns: string) {
        const proxy = new Proxy({}, {
            get: (target: any, propName: string) => {
                return async (...args: unknown[]) => {
                    return await this.callNativePywebview(ns, propName, ...args)
                }
            }
        })
        Reflect.set(globalThis, ns, proxy)
    }

    async callNative<R>(ns: string, fn: string, ...args: unknown[]): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            const id = "f" + crypto.randomUUID().replaceAll("-", "");
            (window as any)[id] = {
                args,
                resolve: (json: R) => {
                    resolve(json);
                },
                reject: (reason: string) => {
                    reject(reason)
                }
            }
            location.href = `${this.schema}://${ns}/${fn}/${id}`
        })
    }


    async callNativePywebview<R>(ns: string, fn: string, ...args: unknown[]): Promise<R> {
        return await window.pywebview.api.ns(ns, fn, args)
    }
}
