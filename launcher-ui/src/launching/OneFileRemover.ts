import { TaskBase } from "./TaskBase";

export class OneFileRemover extends TaskBase {

    async run(): Promise<void> {
        const native = window.RiseCraft;
        const systemName = await native.systemName()
        // alert("removing " + this.filePath )
        if (systemName === "Windows") {
            await native.system(`del /f ${this.filePath}`)
        } else {
            await native.system(`rm -f ${this.filePath}`)
        }
    }
    
    constructor(
        private readonly filePath: string
    ) {
        super();
    }

    static async createForMod(modFileName:string):Promise<OneFileRemover>{
        const native = window.RiseCraft
        const root = await native.appDataDir()
        const modPath:string = `${root}/files/.minecraft/mods/${modFileName}`
        return new OneFileRemover(modPath)
    }
}