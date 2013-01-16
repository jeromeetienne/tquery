/**
 * base class for combo emitters. aka emitter composed of multiple
 * Fireworks.Emitter, sound etc...
*/
Fireworks.ComboEmitter	= function(){
} 

/**
 * Start the emitter
*/
Fireworks.ComboEmitter.prototype.start	= function(){
}

/**
 * Ask to Stop the emitter. It is a gracefull stop, so the emitter may
 * keep emit for a while, the time 
*/
Fireworks.ComboEmitter.prototype.stop	= function(){
}

/**
 * Stop immediatly the emitter
*/
Fireworks.ComboEmitter.prototype.ungracefullStop	= function(){
};
