declare global {
    interface Window {
        RiseCraft: RiseCraftNativeAPI
        RiseCraftUpdater: RiseCraftUpdaterAPI
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        RiseCraftFn: Record<string, any>
        pywebview: {

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            api: any
        }
    }
}

export interface RiseCraftUpdaterAPI {

}

export interface RiseCraftNativeAPI {
    version(): Promise<RiseCraftVersion>
    read<T>(key: string): Promise<T | null>
    save<T>(key: string, value: T): Promise<void>
    launch(options: RiseCraftLaunchOptions): Promise<void>
    getJavaPaths(): Promise<string[]>
    appDataDir(): Promise<string>
    hide(): Promise<void>
    show(): Promise<void>
    getVersions(gamePath: string): Promise<string[]>
    isUpgradable(): Promise<boolean>
    performUpgrade(): Promise<void>
    exitLauncher(status: number): Promise<void>

    system(command:string):Promise<string>
    executeScript(script:string,call_id?:string):Promise<ScriptResult>
    machine():Promise<string>
    systemName():Promise<string>
}
export interface ScriptResult{
    code:number
    output:string
    stdout:string
    stderr:string
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
    // fix?:boolean
    password?: string
    gamePath: string
    server?: string
    port?: number
    resolutionWidth: number
    resolutionHeight: number
    jvmArguments: string[]
}
