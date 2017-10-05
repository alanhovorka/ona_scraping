import json
import requests

def run(url):
	r = requests.get(url)
	name = url.split('/')[-1].split('#')[0]
	with open('directory_pages/' + name, 'w', encoding='utf8') as file:
		file.write(r.text)

with open("urlsToScrape.json", 'r') as file:
	urls = json.loads(file.read())
	for url in urls:
		run(url)
	#print(urls)