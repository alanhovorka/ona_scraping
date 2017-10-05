import requests

def run(url):
	r = requests.get(url)
	name = url.split('/')[-1].split('#')[0]
	with open('directory_pages/' + name, 'w') as file:
		file.write(r.text)

run("https://www.tripadvisor.com/Attractions-g28970-Activities-oa450-Washington_DC_District_of_Columbia.html#ATTRACTION_LIST")