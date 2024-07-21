.PHONY: structure
darwin: RiseCraft.run structure 
	-mv RiseCraft.run RiseCraft/RiseCraft

win32: RiseCraft.exe structure 
	-mv RiseCraft.exe RiseCraft/RiseCraft
	
zip: darwin win32
	zip -r RiseCraft.zip RiseCraft
generate:
	python main.py generate RiseCraft "https://risecraft.oss-rg-china-mainland.aliyuncs.com/RiseCraft/"

structure:
	@-rm -rf RiseCraft
	@-mkdir RiseCraft
	-cp -rf files RiseCraft/
	cp version.json RiseCraft/

RiseCraft.run:
	# python -m nuitka --follow-imports main.py
	pyinstaller main.py --onefile -w
	mv dist/main RiseCraft.run

RiseCraft.exe:
	pyinstaller main.py --onefile -w --icon=assets/icon.ico
	mv dist/main.exe RiseCraft.exe

clean:
	rm -rf logs
	rm -rf RiseCraft
	rm -rf fake-local
	rm -rf data
	rm -rf main.dist main.build
	rm -rf RiseCraft.bin RiseCraft.exe