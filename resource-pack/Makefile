.PHONY: RiseCraftResourcePack.zip clean dist full.zip light.zip
dist: clean full.zip light.zip
	@zip -r RiseCraftResourcePack.zip assets pack.mcmeta pack.png LICENSE.txt
	$(eval ID=$(shell shasum -a 1 full.zip | cut -d ' ' -f 1))
	@mkdir -p dist/server-resource-packs
	@mkdir dist/resourcepacks

	cp full.zip dist/server-resource-packs/$(ID)
	cp light.zip dist/resourcepacks

full.zip: clean 
	@zip -r full.zip --exclude="*.pxd" assets pack.mcmeta pack.png LICENSE.txt

light.zip: clean
	@zip -r light.zip --exclude="*.pxd" assets/minecraft/textures/gui/title pack.mcmeta pack.png LICENSE.txt

clean:
	-rm -rf dist full.zip light.zip