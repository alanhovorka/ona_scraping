from bs4 import BeautifulSoup
import os
import requests
import json

#print(len(os.listdir("listing_pages")))
#print(len(os.listdir("subdirectories")))

all_listings = []

pages = os.listdir("listing_pages")

def process(page):
	with open("listing_pages/"+page,"r",encoding='utf8') as file:
		soup = BeautifulSoup(file.read(), "html.parser")
		# scpt_tag = json.loads(str(
		# 	soup.find("script",{"type":"application/ld+json"}).string
		# 	))
		scpt_tag = json.loads(str(soup.find("script",{"type":"application/ld+json"}).string))
		niceObj = {}
		details = soup.find("div",{"class":"detail"}).find_all("a")
		if len(details) > 0 and 'aggregateRating' in scpt_tag:
			print(str(details[-1].string))
			niceObj = {
				'name' : scpt_tag['name'],
				'address' : scpt_tag['address']['streetAddress'],
				'reviewCount' : scpt_tag['aggregateRating']['reviewCount'],
				'ratingValue' : scpt_tag['aggregateRating']['ratingValue'],
				'category' : str(details[-1].string)
			}
			all_listings.append(niceObj)

for page in pages:
	process(page)

with open("front_end_files/all_listings.json", "w") as file:
	file.write(json.dumps(all_listings))

