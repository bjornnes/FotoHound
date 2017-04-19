def main(args):
    return 0

if __name__ == '__main__':
    import sys
    from gensim.models import word2vec
    from gensim.models import KeyedVectors
    import logging

    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(messages)s', level=logging.INFO)
    sentences = word2vec.Text8Corpus('~/Documents/text8')

    model = word2vec.Word2Vec(sentences, size=100)
    model.wv.save_word2vec_format('../../text8.bin', binary=True)

    model = KeyedVectors.load_word2vec_format('../../text8.bin', binary=True)

    print (sys.argv)
    print (model.most_similar('man',numbers = 10))
    sys.exit(main(sys.argv))
