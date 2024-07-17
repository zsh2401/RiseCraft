declare global {
    interface Window {
        RiseCraft: RiseCraftNativeAPI
    }
}

export interface RiseCraftNativeAPI {
    launch(options: RiseCraftLaunchOptions): Promise<void>
    getJavaPaths(): Promise<string[]>
    appDataDir(): Promise<string>
    getVersions(gamePath: string): Promise<string[]>
    isUpgradable():Promise<boolean>
    performUpgrade():Promise<void>
    exitLauncher(status:number):Promise<void>
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
}
