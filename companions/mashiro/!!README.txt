Things that have to be included to get your Companion accepted:
- A complete "companion.json" (See details below)
- At least one image for each action (hug, kiss, cuddle...), please make sure that at least some of the actions have images! :/ The focus is on the messages though.
	- Images cannot be bigger than 230kb, Consider saving in .jpg!
- A Companion image in the main directory named "vanilla.jpg", also not bigger than 230kb

JSON Instructions:
The .json is the "heart" of your companion. It contains all messages and images that will be used by the companion.
Messages should always be "themed" to fit that Companions. You can make small references to the universe that they're from,
or use phrases that they would normally say in their universe. You may use *some* generic messages for hugs, kisses, etc,
if you think that you don't have enough yet.

Elements that have to be included:
msgHug (array, written like this: ["message one", "message two"]) - Hug messages
msgCuddle (same as msgHug): - Cuddle Messages
msgKiss (same as msgHug): - Kiss Messages
msgPat (same as msgHug) - Pat messages
msgPout (same as msgHug) - Pout messages
msgCry (same as msgHug) - Cry messages
msgBlush (same as msgHug) - blush messages
msgCute (same as msgHug) - "look how cute you are"-Type of messages
msgBoop (same as msgHug) - Boop messages
msgPoke (same as msgHug) - Poke messages
msgCheer (same as msgHug) - Cheer messages "You can do it", for example

Images for all messages would be
imgHug
imgCuddle
imgKiss
...etc
These are also arrays, so: (same as msgHug) :P
Images have to be downloaded into the corresponding folders, and paths have to be written as follows:
"./companions/companion_template/(hug/kiss/cuddle, etc)/(name of image).(extension of image)"
So for example for a hug image that is named senkohug1.jpg:
"./companions/companion_template/hug/senkohug1.jpg"

color: Has to be a Hex number, simply google hex color picker. This should be the main color of your companion.

PLEASE VALIDATE THE JSON BY CHECKING IT ON https://jsonformatter.org/ AND PRESSING "VALIDATE"