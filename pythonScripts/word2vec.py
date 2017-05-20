def main(args):
    return 0

if __name__ == '__main__':
    import sys
    from gensim.models import word2vec
    from gensim.models import KeyedVectors
    import logging

    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(messages)s', level=logging.INFO)#set logging
    sentences = word2vec.Text8Corpus('~/Documents/text8')#Import and reference the corpus

    model = word2vec.Word2Vec(sentences, size=100)#set size of vector to 300 and train model
    model.wv.save_word2vec_format('../../text8.bin', binary=True)#save model to disk
    
    print (model.most_similar('man'))#print most similar words to the word man
    sys.exit(main(sys.argv))
