# ona_scraping
With thousands of journalists flooding into the nation's capital, TripAdvisor data offers a snapshot of popular things to do in Washington, D.C.

The ONA Student Newsroom collected more than 600 attraction listings to see how their ratings and number of reviews correlated.

The bulk of the attractions we collected received ratings above 3 stars, with the average rating sitting at 4.26 stars, but the number of reviews for each attraction varied wildly. The median review count was 15, while the average came in at about 405 reviews, signaling heavy skewness in this metric because of a small number of widely-reviewed attractions.

[pym id="dc_trip_advisor" url="https://static.journalists.org/projects/dc-trip-advisor-matrix/index.html"]

How we did it

First, we found the location listings for Washington, D.C. on TripAdvisor's website and then pulled down all of the HTML for those pages on my computer for faster, local scraping. Once we compiled a list of some 600 locations to visit in Washington, D.C., we ran a BeautifulSoup script that grabbed the rating, number of reviews and establishment category in the HTML. The script compiled all of these individuals objects into a new json file that we used in the visualization.

With the data in hand, we created the data visualization using D3. The scatter plot shows possible ratings across the x-axis and number of reviews along the y-axis. One problem we faced was how to show attractions that had a widely varying amount of reviews — some attractions had 10 reviews, while others had more than a 1,000.  We controlled for this issue by using a logarithmic scale in D3, which exaggerates the lower, more dense ranges of the data and shrinks the more sparse upper ranges. The scatterplot has a bit of clustering of these data points, and there are more than 600 overall. We added a filter to the data to allow users to focus on what establishments have the most and highest ratings.

Using category data, we made the scatterplot color coded and filterable by establishment type, such as "Landmarks" or "Nightlife."

How you can use it

Visualizing this TripAdvisor data offers us a quick overview of some possibly interesting places in Washington, D.C. that tourists might not know about. It's more accessible than scrolling through more than 600 location listings. You choose the establishment type you want and isolate the data to just those listings. A tooltip allows you to tap on the point and get the name, rating and location of the place.

Caveats

This interactive pulls location, rating and review information from TripAdvisor, but there are other data sources that offer differing perspectives. It's only scanning what people who use TripAdvisor think are great or terrible places for tourism in Washington, D.C. The scraper did not pull all of the listings for every single thing to do in town. In the case of bars, it only grabbed the top 30 bars, according user reviews.

Due to several locations only having a handful of reviews, it's possible that their review ratings are somewhat inflated. This is somewhat evident due to the clustering of reviews between four and five stars. However, this highlights a possible problem with review sites -- reviews and ratings are only as reliable as the number and variety of reviews.