#!/usr/bin/env python2
# -*- coding: utf-8 -*-
#
#  GloVeTestMain.py
#
#  Copyright 2017 Stein-Erik <steine@stein-pc>
#
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#
#

import itertools
from glove import Glove, Corpus

from gensim.models import word2vec

def main(args):
    return 0

if __name__ == '__main__':
    import sys
    import logging

    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(messages)s', level=logging.INFO)

    sentences = list(itertools.islice(word2vec.Text8Corpus('../../text8'),None))
    corpus = Corpus()
    corpus.fit(sentences, window=10)
    glove = Glove(no_components=300, learning_rate=0.05)
    glove.fit(corpus.matrix, epochs=6, no_threads=2, verbose=True)
    glove.add_dictionary(corpus.dictionary)
    print(glove.most_similar('man'))


    sys.exit(main(sys.argv))
