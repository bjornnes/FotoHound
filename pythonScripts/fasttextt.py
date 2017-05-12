
def main(args):
    return 0

if __name__ == '__main__':
	import fasttext
	import logging

	logging.basicConfig(format='%(asctime)s : %(levelname)s : %(messages)s', level=logging.INFO)

	model = fasttext.cbow('../../text8', 'text8-fasttext-cbow', dim=300)
	print(model.words)

	sys.exit(main(sys.args))
