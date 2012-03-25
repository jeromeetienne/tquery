## emitter
* various type of emitter
  * regular
  * pulsar 

## particles
* all particles got thru the same effect
* all stored in the large typed array ?
  * easy to coordinate
* storing in array is good for access

## What is an effect
* effect arent init xor actions like in sparks.js
* they are listed in emitter
* they can have data per emitter or per particles
* onCreate: called when a particle is created
* onUpdate: called when a particle is updated

## TODO
* do a benchmark without display
* how to link it with three.js, tquery, canvas2d
  * well it depends on the backend
  * which parameters may change the appearance ?
    * coordinate
    * size
    * color
    * texture