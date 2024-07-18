declare global {
    interface Window {
        RiseCraft: RiseCraftNativeAPI
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        RiseCraftFn:Record<string,any>
        pywebview: {

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            api: any
        }
    }
}

export interface RiseCraftNativeAPI {
    version(): Promise<RiseCraftVersion>
    read<T>(key: string): Promise<T | null>
    save<T>(key: string, value: T): Promise<void>
    launch(options: RiseCraftLaunchOptions): Promise<void>
    getJavaPaths(): Promise<string[]>
    appDataDir(): Promise<string>
    getVersions(gamePath: string): Promise<string[]>
    isUpgradable(): Promise<boolean>
    performUpgrade(): Promise<void>
    exitLauncher(status: number): Promise<void>
}
export interface UpdateProgressEvent {
    total: number
    step: string
    percent: number
}
export interface RiseCraftVersion {
    name: string
    code: string
}
export interface RiseCraftLaunchOptions {
    java: string
    versionName: string
    baseVersionName: string
    userName: string
    password?: string
    gamePath: string
    server?: string
    port?: number
    jvmArguments?:string[]
}
