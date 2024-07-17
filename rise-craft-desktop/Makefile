build:
	python -m nuitka --follow-imports main.py
	@-mkdir RiseCraft
	-mv main.bin RiseCraft/RiseCraft
	-mv main.exe RiseCraft/RiseCraft.exe
	cp -rf jre RiseCraft/
	cp -rf game RiseCraft/
	cp -rf version.json RiseCraft/
	cp RiseCraft/RiseCraft fake-local

run: RiseCraft
	./RiseCraft
dev:
	python RiseCraft.py
clean:
	rm -rf logs
	rm -rf RiseCraft
	rm -rf RiseCraft.bin RiseCraft.exe