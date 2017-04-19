
def main(args):
    return 0

if __name__ == '__main__':
	import fasttext
	import logging

	logging.basicConfig(format='%(asctime)s : %(levelname)s : %(messages)s', level=logging.INFO)

	model = fasttext.skipgram('../../enwiki-latest-pages-articles17', 'articles17_model')
	print(model.words)

	sys.exit(main(sys.args))
