# reddit-api-cache
A cache of the reddit top 20 posts of the day from the reddit api. Updates roughly every 30 minutes from a cloudflare worker. I might change it to have more information in the future but it's limited to 20 because of cloudflare workers limitations.
# How it's done
I am running a cloudflare workers script in my personal account to update this repository every 10 minutes, although caching and stuff means it's probably accurate to within 30 minutes.
The code to use this is in script.js.
To use it you will have to put your github token (classic) in line 10.
