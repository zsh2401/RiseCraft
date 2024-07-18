build-macos: RiseCraft.macos assets 
	-mv RiseCraft.macos RiseCraft/RiseCraft

build-windows: RiseCraft.exe assets 
	-mv RiseCraft.exe RiseCraft/RiseCraft
	
generate:
	python main.py generate RiseCraft "https://risecraft.oss-rg-china-mainland.aliyuncs.com/RiseCraft/"

assets:
	@-mkdir RiseCraft
	-cp -rf jre RiseCraft/
	-cp -rf game RiseCraft/

RiseCraft.macos:
	python -m nuitka --follow-imports main.py
	mv main.bin RiseCraft.macos

RiseCraft.exe:
	python -m nuitka main.py --onefile --windows-disable-console --windows-icon-from-ico=assets/icon.png
	mv main.exe RiseCraft.exe
RiseCraft.exe-pyinstaller:
	pyinstaller main.py --onefile --icon=assets/icon.png
	mv main.exe RiseCraft.exe

run: RiseCraft
	./RiseCraft
dev:
	python RiseCraft.py
clean:
	rm -rf logs
	rm -rf RiseCraft
	rm -rf fake-local
	rm -rf data
	rm -rf main.dist main.build
	rm -rf RiseCraft.bin RiseCraft.exe