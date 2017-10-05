from bs4 import BeautifulSoup
import os
import requests
import json

def run(url):
	r = requests.get(url)
	name = url.split('/')[-1].split('#')[0]
	with open('directory_pages/' + name, 'w', encoding='utf8') as file:
		file.write(r.text)

def extract_site_url(file):
	with open("directory_pages/" + file, "r") as htmlfile:
		bs=BeautifulSoup(htmlfile.read(), "html.parser")
		#print(bs)
		titles=bs.find_all("div",{"class":"listing_title"})
		print(len(titles))
		for title in titles:
			#print(title.find("a").string)
			print(title.find("a")["href"])

pages = os.listdir("directory_pages")
extract_site_url(pages[0])
#print(pages)