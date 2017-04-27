
def main(args):
    return 0

if __name__ == '__main__':
	import fasttext
	import logging

	logging.basicConfig(format='%(asctime)s : %(levelname)s : %(messages)s', level=logging.INFO)

	model = fasttext.skipgram('../../enwikiExtracted/AA/enwiki-articles-sed-punct-lowercase', 'enwiki-articles-300-fasttext', dim=300)
	print(model.words)

	sys.exit(main(sys.args))
