.PHONY: clean dist full.zip light.zip convert
dist: clean  full.zip
	$(eval SUM=$(shell shasum -a 1 full.zip | cut -d ' ' -f 1))
	@mkdir -p dist/server-resource-packs
	@mkdir -p dist/resourcepacks

	cp full.zip dist/server-resource-packs/$(SUM)
	cp full.zip dist/resourcepacks/RiseCraftResourcePack.zip

	echo sha1 is $(SUM)

convert:
	rm -rf ./assets/minecraft/sounds/*
	python convert.py
	
deploy: dist
	rm -rf ../client/files/.minecraft/server-resource-packs/*
	cp -r dist/* ../client/files/.minecraft 

full.zip: clean convert
	@zip -r full.zip --exclude="*.pxd" --exclude="assets/minecraft/sounds/records/*.mp3"  --exclude="assets/minecraft/sounds/records/*.sh" assets pack.mcmeta pack.png LICENSE.txt

light.zip: clean
	@zip -r light.zip --exclude="*.pxd" assets/minecraft/lang assets/minecraft/textures/gui/title pack.mcmeta pack.png LICENSE.txt

clean:
	-rm -rf dist *.zip 