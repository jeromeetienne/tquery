var DatGuiOpts	= function(){
	this.general	= {
		video	: {
			w		: 320/4,
			h		: 240/4,
			frameRate	: 1
		}
	};
	this.right	= {
		pointer	: {
			display		: true,
			coordSmoothV	: 0.3,
			coordSmoothH	: 0.3
		},
		disp	: {
			enable	: false,
			VHist	: false,
			HHist	: false,
			VLine	: false,
			HLine	: false
		},
		colorFilter	: {
			r	: {
				min	: 125,
				max	: 255
			},
			g	: {
				min	:   3,
				max	: 140
			},
			b	: {
				min	:  10,
				max	:  90
			}
		},
		smooth	: {
			vWidth	: 9,
			hWidth	: 9
		}
	};
	this.left	= {
		pointer	: {
			display		: true,
			coordSmoothV	: 0.3,
			coordSmoothH	: 0.3
		},
		disp	: {
			enable	: false,
			VHist	: false,
			HHist	: false,
			VLine	: false,
			HLine	: false
		},
		colorFilter	: {
			r	: {
				min	:   0,
				max	:  80
			},
			g	: {
				min	:  70,
				max	: 255
			},
			b	: {
				min	:   0,
				max	: 113
			}
		},
		smooth	: {
			vWidth	: 9,
			hWidth	: 9,
			minVHist: 10,
			minHHist: 10
		}
	};
};


var DatGuiOpts	= function(){
	this.general	= {
		video	: {
			w		: 320/4,
			h		: 240/4,
			frameRate	: 1
		}
	};
	this.right	= {
		pointer	: {
			display		: true,
			coordSmoothV	: 0.3,
			coordSmoothH	: 0.3
		},
		disp	: {
			enable	: false,
			VHist	: false,
			HHist	: false,
			VLine	: false,
			HLine	: false
		},
		colorFilter	: {
			r	: {
				min	: 125,
				max	: 255
			},
			g	: {
				min	:   3,
				max	: 140
			},
			b	: {
				min	:  10,
				max	:  90
			}
		},
		smooth	: {
			vWidth	: 9,
			hWidth	: 9
		}
	};
	this.left	= {
		pointer	: {
			display		: true,
			coordSmoothV	: 0.3,
			coordSmoothH	: 0.3
		},
		disp	: {
			enable	: false,
			VHist	: false,
			HHist	: false,
			VLine	: false,
			HLine	: false
		},
		colorFilter	: {
			r	: {
				min	:   0,
				max	:  80
			},
			g	: {
				min	:  70,
				max	: 255
			},
			b	: {
				min	:   0,
				max	: 113
			}
		},
		smooth	: {
			vWidth	: 9,
			hWidth	: 9
		}
	};
};

var guiOpts	= new DatGuiOpts();

window.addEventListener('load', function(){
	var gui		= new dat.GUI();
// General folder
	var folder	= gui.addFolder('General');
	//folder.open();
	folder.add(guiOpts.general.video, 'w', 0, 320).step(40).name('videoW');
	folder.add(guiOpts.general.video, 'h', 0, 240).step(30).name('videoH');
	folder.add(guiOpts.general.video, 'frameRate', 1, 30).step(1);

// Right pointer folder
	var folder	= gui.addFolder('Right Pointer');
	folder.add(guiOpts.right.pointer	, 'display');
	folder.add(guiOpts.right.pointer	, 'coordSmoothV', 0, 1);
	folder.add(guiOpts.right.pointer	, 'coordSmoothH', 0, 1);
// Right display folder
	var folder	= gui.addFolder('Right Display');
	//folder.open();
	folder.add(guiOpts.right.disp	, 'enable');
	folder.add(guiOpts.right.disp	, 'HHist');
	folder.add(guiOpts.right.disp	, 'VHist');
	folder.add(guiOpts.right.disp	, 'HLine');
	folder.add(guiOpts.right.disp	, 'VLine');
// Right Threshold folder
	var folder	= gui.addFolder('Right Threshold');
	//folder.open();
	folder.add(guiOpts.right.colorFilter.r	, 'min', 0, 255).name('red min');
	folder.add(guiOpts.right.colorFilter.r	, 'max', 0, 255).name('red max');
	folder.add(guiOpts.right.colorFilter.g	, 'min', 0, 255).name('green min');
	folder.add(guiOpts.right.colorFilter.g	, 'max', 0, 255).name('green max');
	folder.add(guiOpts.right.colorFilter.b	, 'min', 0, 255).name('blue min');
	folder.add(guiOpts.right.colorFilter.b	, 'max', 0, 255).name('blue max');
	folder.add(guiOpts.right.smooth		, 'hWidth', 0, 20).step(1);
	folder.add(guiOpts.right.smooth		, 'vWidth', 0, 20).step(1);

// Left pointer folder
	var folder	= gui.addFolder('Left Pointer');
	folder.add(guiOpts.left.pointer	, 'display');
	folder.add(guiOpts.left.pointer	, 'coordSmoothV', 0, 1);
	folder.add(guiOpts.left.pointer	, 'coordSmoothH', 0, 1);
// Left display folder
	var folder	= gui.addFolder('Left Display');
	//folder.open();
	folder.add(guiOpts.left.disp	, 'enable');
	folder.add(guiOpts.left.disp	, 'VHist');
	folder.add(guiOpts.left.disp	, 'HHist');
	folder.add(guiOpts.left.disp	, 'VLine');
	folder.add(guiOpts.left.disp	, 'HLine');
// Left Threshold folder
	var folder	= gui.addFolder('Left Threshold');
	//folder.open();
	folder.add(guiOpts.left.colorFilter.r	, 'min', 0, 255).name('red min');
	folder.add(guiOpts.left.colorFilter.r	, 'max', 0, 255).name('red max');
	folder.add(guiOpts.left.colorFilter.g	, 'min', 0, 255).name('green min');
	folder.add(guiOpts.left.colorFilter.g	, 'max', 0, 255).name('green max');
	folder.add(guiOpts.left.colorFilter.b	, 'min', 0, 255).name('blue min');
	folder.add(guiOpts.left.colorFilter.b	, 'max', 0, 255).name('blue max');
	folder.add(guiOpts.left.smooth		, 'vWidth', 0, 20).step(1);
	folder.add(guiOpts.left.smooth		, 'hWidth', 0, 20).step(1);

// try to save value but doesnt work
	//gui.remember(guiOpts);
});
