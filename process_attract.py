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

		details = soup.find("div",{"class":"detail"}).find_all("a")
		if len(details) > 0:
			print(str(details[-1].string))
			scpt_tag["category"] = str(details[-1].string)

		all_listings.append(scpt_tag)

for page in pages:
	process(page)

with open("front_end_files/all_listings.json", "w") as file:
	file.write(json.dumps(all_listings))

