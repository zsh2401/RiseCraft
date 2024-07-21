export async function tryRemoveJourneyMap() {
    const native = window.RiseCraft
    const systemName = await native.systemName()
    const root = await native.appDataDir()
    const fileName = "旅行地图journeymap-1.20.1-5.10.1-forge.jar"
    try {
        if (systemName === "Windows") {
            await native.system(`del /f ${root}\\files\\.minecraft\\${fileName}`)
        } else {
            await native.system(`rm -f ${root}/files/.minecraft/${fileName}`)
        }
    } catch (err) {
        // Do nothing
    }

}