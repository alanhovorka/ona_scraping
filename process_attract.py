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
		scpt_tag = str(soup.find("script",{"type":"application/ld+json"}).string)
		all_listings.append(json.loads(scpt_tag))

for page in pages:
	process(page)

with open("all_listings.json", "w") as file:
	file.write(json.dumps(all_listings))

