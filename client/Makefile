.PHONY: structure clean clean-files index RiseCraft
darwin: clean-files RiseCraft.run structure index
	-cp RiseCraft.run RiseCraft/RiseCraft

win32: clean-files RiseCraft.exe structure index
	-cp RiseCraft.exe RiseCraft/RiseCraft.exe

RiseCraft: darwin win32 
	cp full-version.json RiseCraft/
	
zip: RiseCraft
	@-rm -rf RiseCraft.zip
	zip -r RiseCraft.zip RiseCraft

index: RiseCraft
	python main.py generate RiseCraft "https://risecraft.oss-rg-china-mainland.aliyuncs.com/RiseCraft/"

structure:
	@-rm -rf RiseCraft
	@-mkdir RiseCraft
	-cp -rf files RiseCraft/
	cp version.json RiseCraft/

RiseCraft.run:
	python -m nuitka --follow-imports main.py
	# pyinstaller main.py --onefile -w
	mv main.bin RiseCraft.run

RiseCraft.exe:
	pyinstaller main.py --onefile -w --icon=assets/icon.ico
	mv dist/main.exe RiseCraft.exe

clean-files:
	rm -rf files/.minecraft/logs
	rm -rf files/.minecraft/crash-reports
	rm -rf files/.minecraft/wd_filehost
	rm -rf files/.minecraft/saves
	rm -rf files/.minecraft/journeymap
	rm -rf files/.minecraft/XaeroWaypoints*

clean: clean-files
	rm -rf logs
	rm -rf RiseCraft
	rm -rf fake-local
	rm -rf data
	rm -rf main.dist main.build
	rm -rf RiseCraft.bin RiseCraft.run RiseCraft.exe