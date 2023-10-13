# color-cauldron-web

Easily create mystical color palettes by describing how you would use the colors, then sit back and let the magic happen.

# Take a look

You can find this live at [colorcauldron.com](https://colorcauldron.com).

# API

Just want the data? Use the api at the `brew` endpoint. It takes a query parameter `prompt` which is a string that describes how you would use the colors. For example:

`/api/brew?prompt=coffee+shop`

Will return

`{ [ "#FF7518", "#8C6239", "#46281C", "#211E26", "#008080" ] }`