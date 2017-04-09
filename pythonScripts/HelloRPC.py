import zerorpc
import logging
from gensim.models import word2vec
from gensim.models import KeyedVectors

class HelloRPC(object):

    global model
    model = KeyedVectors.load_word2vec_format('../../text8.bin', binary=True)
    print 'Connection started..'
    def word2vecSocket(self, name):
        #model.most_similar
        print name
        #return json
        return  model.most_similar(name)

s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:4242")
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
