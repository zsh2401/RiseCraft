from time import sleep
from random import random,randint
from tqdm import tqdm,trange
with tqdm(["a","b"]) as t:
    for i in t:
        # Description will be displayed on the left
        t.set_description('GEN %s' % i)
        # Postfix will be displayed on the right,
        # formatted automatically based on argument's datatype
        # t.set_postfix()
        sleep(0.1)