def main(args):
    return 0

if __name__ == '__main__':
    import sys
    from gensim.models import word2vec
    from gensim.models import KeyedVectors
    #import logging

    #logging.basicConfig(format='%(asctime)s : %(levelname)s : %(messages)s', level=logging.INFO)

    #model = word2vec.Word2Vec.load_word2vec_format('text8.model', binary=False)
    #model = KeyedVectors.load_word2vec_format('text.model.bin', binary=True)
    model = KeyedVectors.load_word2vec_format('../../school/Bachelor2017/GensimWord2Vec/test/text8.bin', binary=True)
    sys.exit(main(sys.argv))
