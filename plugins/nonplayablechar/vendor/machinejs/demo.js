// a little demo ecosystem that betrays my horrifically incomplete knowledge of plant biology

// the oak object - sucks up water, photosynthesises, grows
function Oak(landscape) {
  this.state = null;
  this.landscape = landscape;

  this.height = 1;

  this.energy = false;
  this.oxygen = false;
  this.water = 0;
  this.sun = 0;
}

Oak.prototype = {
  hasSun: function() { return this.sun > 0; },
  hasWater: function() { return this.water > 0; },
};

Oak.states = {
  idle: function() { },

  grow: function() {
    this.energy = false;
    this.height += 1;
  },
  canGrow: function() { return this.energy; },

  canMakeEnergy: function() {
    return this.hasSun() && this.hasWater();
  },
  makeEnergy: function() {
    this.sun -= 1;
    this.water -= 1;
    this.energy = true;
  },

  canPhotosynthesise: function() {
    return this.hasSun() && this.hasWater();
  },

  canEmitOxygen: function() { return this.oxygen; },
  emitOxygen: function() {
    this.oxygen = false;
    this.landscape.oxygenate();
  },

  gatherSun: function() { this.sun += 1; },
  canGatherSun: function() { return this.landscape.isShining(); },

  gatherWater: function() {
    this.water += this.landscape.giveWater();
  },
  canGatherWater: function() { return this.landscape.hasWater(); },
};

// the landscape object - rains or shines
function Landscape() {
  this.state = null;
  this.groundwater = 0;
  this.oxygen = 0;
}

Landscape.prototype = {
  isShining: function() { return this.state.identifier == "shine"; },

  hasWater: function() { return this.groundwater > 0; },

  giveWater: function() {
    this.groundwater -= 1;
    return 1;
  },

  oxygenate: function() { this.oxygen += 1; },
};

Landscape.states = {
  idle: function() { },

  rain: function() { this.groundwater += 1; },
  canRain: function() { return Math.random() > 0.5; },

  shine: function() {  }, // nothing to do - just a state
  canShine: function() { return Math.random() > 0.1; },
};