# ona_scraping
Scraping, analyzing and visualizing TripAdvisor information
Places to checkout in D.C. told through TripAdvisor data 

here's what we did
With thousands of journalists flooding into the nation's capital, I took a dive into TripAdvisor data to gauge some possible little-known, high-rated locales to catch in Washington D.C.

First, I found the location listings for D.C. on TripAdvisor's website and then pulled down all of the html for those pages on my computer for faster scraping. Once I compiled a directory of some 700 locations to visit in D.C., I ran a BeautifulSoup script that grabbed the json rating and review objects in the HTML. The script compiled all of these individuals objects into a new json file. 

With the data inhand, I created my front end files and made some responsive data visualizations using D3 and leaflet. The scatter plot shows xxxx and the leaflet map points to where the locations are at and includes (x,y and z). 

how you can use it

Visualizing this TripAdvisor data offers us a quick overview of some possibly interesting places in D.C. that tourists might not know about. It's more accessible than scrolling through more than 700 location listings. 

Details on how to navigate the map and read the chart

caveats

This interactive pulls location, rating and review info from TripAdvisor and there are other data sources out there that offer differing perspectives. It's only scanning what people who use Trip Advisor think are great or terrible places for tourism in D.C. 

(little more)