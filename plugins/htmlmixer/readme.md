note about html mixer
=====================
* how to mix html with your webgl
* what are the various stages ?
* what is the original setup
  * minecraft looking at youtube player
  * minecraft sitting in front of youtube player
  * what is behind the youtube player

## Steps
1. a pink face
2. pink face with dom on top
3. pink face with dom behind
4. need to be in the middle !
5. not possible :(
6. ok let's dig a hole in webgl rendering
7. now we put css3d behind webgl
8. you are done!

## slota
1. oh minecraft characters looking at tv! 
(i like the one look of the one the right)
TODO screenshot of demo-tvset without player
It would be so cool if they could look at youtube!

2. lets add a youtube player!
It is easy to get one with their 
[embedded api](https://developers.google.com/youtube/player_parameters)
. 

3. Cool but i dont want it to stay flat... i want it to
follow the 3d... Lets use 
[CSS3DRenderer](https://github.com/mrdoob/three.js)
from the marvelous
[three.js](http://example.com)
. It use css 3d transformation to map 
[normal DOMElement](https://developer.mozilla.org/en/docs/DOM/element)
to
[THREE.Object3d](https://github.com/mrdoob/three.js/blob/master/src/core/Object3D.js).
So we create an iframe and include a youtube player in our CSS3D scene.

4.
