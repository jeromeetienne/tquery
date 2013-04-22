## notes
* handle device orientation on macos and tablet
  * some axis inversion
* handle the leap controls
* how to mix them all together
* for each of them determine availability
  * availability === null if unknown
  * availability === true if it is available
  * availability === false if not available
* how to handle progressive

### docs
* .right/.left are boolean
* .up/.down are boolean
* .deltaX/.deltaY are number
  * only if available in the input handler
  * .deltaX() < 0 for left
  * as a guideline, Math.abs(deltaX()) === 1.0 for normal speed
  * it is up to the input handle to check

