
import itertools
from glove import Glove, Corpus

from gensim.models import word2vec

def main(args):
    return 0

if __name__ == '__main__':
    import sys
    import logging

    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(messages)s', level=logging.INFO) #Show logging

    sentences = list(itertools.islice(word2vec.Text8Corpus('../../text8'),None))#Link to the corpus on disk. word2vec.Text8Corpus means the corpus is one large, plain text file to be treated as one line of text
    corpus = Corpus()#New instance of Corpus
    corpus.fit(sentences, window=10)#Contruct co-occurence matrix
    glove = Glove(no_components=300, learning_rate=0.05) #New instance of Glove, specified size of vector to 300 and learning rate to 0.05
    glove.fit(corpus.matrix, epochs=6, no_threads=2, verbose=True) #learn the corpus, running through it 6 times
    glove.add_dictionary(corpus.dictionary) #add dictionary
    print(glove.most_similar('man')) #see similar words to the word man
    glove.save('../../text8_glove_model') #save model to disk
    
    
    sys.exit(main(sys.argv))
