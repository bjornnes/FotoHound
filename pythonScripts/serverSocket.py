import zerorpc
import logging
#from gensim.models import word2vec
from gensim.models import KeyedVectors

class SocketServer(object):


    global word2vec_model_NO
    word2vec_model_NO = KeyedVectors.load_word2vec_format('../../nowiki-articles-300.bin', binary=True)
    global fasttext_model_NO
    fasttext_model_NO = KeyedVectors.load_word2vec_format('../../nowiki-articles-300-fasttext.vec')
    global word2vec_model_ENG
    word2vec_model_ENG = KeyedVectors.load_word2vec_format('../../enwiki-articles-300.bin', binary=True)
    #global fasttext_model_ENG
    #fasttext_model_ENG = KeyedVectors.load_word2vec_format('../../enwiki-articles-300-fasttext.vec')
    global glove_model_ENG
    glove_model_ENG = KeyedVectors.load_word2vec_format('../../glove.42B.300d.bin', binary=True)

    print ('Connection started..')
    def norwegianSocket(self, pos, neg):
        print ('NO  +',pos,' -',neg)
        result = ''
        try:
            result = word2vec_model_NO.most_similar(positive=pos, negative=neg) + fasttext_model_NO.most_similar(positive=pos, negative=neg)
        except:
            result = []
        return result

    def englishSocket(self, pos, neg):
        print ('ENG +',pos,' -',neg)
        result = ''
        try:
            result = word2vec_model_ENG.most_similar(positive=pos, negative=neg) + glove_model_ENG.most_similar(positive=pos, negative=neg)
        except:
            result = []
        return result

s = zerorpc.Server(SocketServer())
s.bind("tcp://158.38.43.76:4242")
s.run()

# from socketIO_client import SocketIO
# #https://pypi.python.org/pypi/socketIO-client
#
# def on_response(*args):
#   print 'on_response args are ', args
#
# socketIO = SocketIO('localhost', 9000)
# socketIO.on('connected', on_response)
# socketIO.on('welcome', on_response)
# socketIO.on('howareyou', on_response)
#
# socketIO.emit('howareyou', {"name": "Tuan" })
#
# socketIO.wait( seconds =1 )
