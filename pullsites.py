from bs4 import BeautifulSoup
import os
import requests
import json

def download(url, dest):
	r = requests.get(url)
	name = url.split('/')[-1].split('#')[0]
	with open(dest +'/' + name, 'w', encoding='utf8') as file:
		file.write(r.text)

def extract_site_url(file):
	with open("subdirectories/" + file, "r", encoding='utf8') as htmlfile:
		bs=BeautifulSoup(htmlfile.read(), "html.parser")
		#print(bs)
		titles=bs.find_all("div",{"class":"listing_title"})
		print(len(titles))
		for title in titles:
			#print(title.find("a").string)
			href=title.find("a")["href"]
			check=href[0:12]
			if check == "/Attraction_":
				download("https://www.tripadvisor.com" + href, "listing_pages")
			elif check == "/Attractions":
				download("https://www.tripadvisor.com" + href, "subdirectories")

#[11]/Attractions-g28970-Activities-c61-t167-Washington_DC_District_of_Columbia.html
#[17]/Attraction_Review-g28970-d130112-Reviews-Corcoran_Gallery_of_Art-Washington_DC_District_of_Columbia.html



pages = os.listdir("subdirectories")
#extract_site_url(pages[0])
for page in pages:
	extract_site_url(page)
#print(pages)