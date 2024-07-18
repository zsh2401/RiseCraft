build-macos: RiseCraft.macos assets 
	-mv RiseCraft.macos RiseCraft/RiseCraft

build-windows: RiseCraft.exe assets 
	-mv RiseCraft.exe RiseCraft/RiseCraft
	
generate:
	python make-full-version.py RiseCraft

assets:
	@-mkdir RiseCraft
	-cp -rf jre RiseCraft/
	-cp -rf game RiseCraft/

RiseCraft.macos:
	python -m nuitka --follow-imports main.py
	mv main.bin RiseCraft.macos

RiseCraft.exe:
	python -m nuitka main.py --onefile --windows-disable-console
	mv main.exe RiseCraft.exe

run: RiseCraft
	./RiseCraft
dev:
	python RiseCraft.py
clean:
	rm -rf logs
	rm -rf RiseCraft
	rm -rf RiseCraft.bin RiseCraft.exe