.PHONY: clean dist full.zip light.zip
dist: clean full.zip
	$(eval ID=$(shell shasum -a 1 full.zip | cut -d ' ' -f 1))
	@mkdir -p dist/server-resource-packs
	@mkdir -p dist/resourcepacks

	# cp full.zip dist/server-resource-packs/$(ID)
	cp full.zip dist/resourcepacks/RiseCraftResourcePack.zip

deploy: dist
	rm -rf ../client/files/.minecraft/server-resource-packs/*
	cp -r dist/* ../client/files/.minecraft 
full.zip: clean 
	@zip -r full.zip --exclude="*.pxd" assets pack.mcmeta pack.png LICENSE.txt

light.zip: clean
	@zip -r light.zip --exclude="*.pxd" assets/minecraft/lang assets/minecraft/textures/gui/title pack.mcmeta pack.png LICENSE.txt

clean:
	-rm -rf dist *.zip