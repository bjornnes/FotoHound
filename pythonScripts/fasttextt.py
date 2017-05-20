
def main(args):
    return 0

if __name__ == '__main__':
	import fasttext
	import logging

	logging.basicConfig(format='%(asctime)s : %(levelname)s : %(messages)s', level=logging.INFO) #set logging

	model = fasttext.skipgram('../../text8', 'text8-fasttext', dim=300)#Training with skipgram using vectors with dimension of 300. 2nd param is name of output file
	print(model.most_similar('man')) #prints most similar words to the word man

	sys.exit(main(sys.args))
