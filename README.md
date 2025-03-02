# color-cauldron-web

![color-cauldron-openg-image](https://colorcauldron.app/color-cauldron-openg-image.png)

### Color palettes powered by AI, driven by imagination.

Easily create mystical color palettes simply by describing colors, vibes, or use cases. 


# Take a look

You can find this live at: [colorcauldron.app](https://colorcauldron.app/).

# API

Just want the data? Use the api at the `brew` endpoint. It takes a query parameter `prompt` which is a string that describes how you would use the colors. For example:

`/api/brew?prompt=coffee+shop`

Will return

`{ [ "#FF7518", "#8C6239", "#46281C", "#211E26", "#008080" ] }`
