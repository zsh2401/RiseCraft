import { OneFileRemover } from "./OneFileRemover";
import { TaskBase } from "./TaskBase";

async function loadRegistry():Promise<TaskBase[]>{
    const REGISTRY: TaskBase[] = [
        //1.0.2->1.0.3
        await OneFileRemover.createForMod("旅行地图journeymap-1.20.1-5.10.1-forge.jar"),
        // await OneFileRemover.createForMod("mobhealthbar-forge-1.20.x-2.3.0.jar"),
    ]
    return REGISTRY
}

export async function executeTasks() {
    for (const task of await loadRegistry()) {
        // alert("running taks")
        try {
            await task.run()
        } catch (err) {
            //todo
            alert(err)
        }
    }
}