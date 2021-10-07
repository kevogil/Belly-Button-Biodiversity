## Belly Button Biodiversity

### Objective
Build an interactive dashboard that catalogs the microbial species (also called operational taxonomic units, or OTUs) found in human navels.
<br>
<br>
<br>

### Step 1 : Read data and prepare datasets
We will be reading in the 'samples.json' file with the D3 library, containing data on OTUs found per individual tested.
<br>
<br>
<br>

### Step 2 : Display sample metadata on the tested individual 
The following metadata on the tested individual will be populated as a table:

`id`, `ethnicity`, `gender`, `age`, `location`, `bbtype`, `wfreq`
<br>
<br>
<br>

### Step 3 : Create a horizontal bar chart 
Display the top 10 OTUs found in the selected individual.
<br>
Hovering over the individual bars will display each key-value pair.
<br>
The bar chart will be updated anytime a new sample is selected from the dropdown menu.
<br>

### Step 4 : Create a bubble chart