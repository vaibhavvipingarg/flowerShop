flowerShop
==========

Visualizing sales data for a flower shop using pure JS and HTML5 rendered in a bullet chart
Details
I have chosen the horizontal fight graph to represent the data that you have sent. My logic here is that I want to compare the units sold vs. unsold and represent the same in the graph.

I have implemented this visualization from scratch and it is extensible. 
You can edit the data to remove or add a few entries
You can re-size the browser window to re-scale the canvas

Some of the other considerations for this data were
Vertical stack graph - I wanted the graph to grow vertically and not horizontally when there are several different varieties of flowers and data is for several days not just 5.
Line Graph - Could not show the unsold data information well
Data Grid Visualization- Too many numbers and text


Some of my reference scratch notes attached here.
Flower shop
Read the data
Hard-code/ Read from server
Incremental fetch/ one time
Build the model
Make it modular and extensible
Duplicate Entries/ Missing Entries?
Create the MVC structure? overkill?maybe
Select a rendering scheme 
D3/ Custom
Dashboard/ Single Viz.
Container is one thing and the meat of the content is another. Most important here is the part which actually visualizes the data not the container or the responsiveness. It does not have to be interactive. 
Select styling scheme
Bootstrap/ Plain css
Responsive
Submission
Link/ Zip/ Host


1. To incorporate the daily break up of sales
2. To use the sold and unsold information both at the same time, especially since the scales are different for each flower, clear distinction of sold vs. unsold on a given day per flower.
3. To keep in mind the growing number of flowers, growing vertically would be easier than growing horizontally
