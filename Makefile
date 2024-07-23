.PHONY: all clean
all:
	make -C resource-pack deploy
	make -C client zip
	cp client/RiseCraft.zip .
clean:
	make -C resource-pack clean
	make -C client clean