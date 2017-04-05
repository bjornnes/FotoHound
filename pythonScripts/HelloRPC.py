# import zerorpc
#
# class HelloRPC(object):
#     def hello(self, name):
#         return "Hello, %s" % name
#
# s = zerorpc.Server(HelloRPC())
# s.bind("tcp://0.0.0.0:4242")
# print 'HelloRPC running'
# s.run()


from socketIO_client import SocketIO
#https://pypi.python.org/pypi/socketIO-client

def on_response(*args):
  print 'on_response args are ', args

socketIO = SocketIO('localhost', 9000)
socketIO.on('connected', on_response)
socketIO.on('welcome', on_response)
socketIO.on('howareyou', on_response)

socketIO.emit('howareyou', {"name": "Tuan" })

socketIO.wait( seconds =1 )
