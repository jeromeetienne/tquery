var DatGuiOpts	= function(){
	this.right	= {
		disp	: {
			enable	: false,
			HHist	: false,
			VHist	: false,
			HLine	: false,
			VLine	: false
		},
		threshold	: {
			r	: {
				min	:   0,
				max	: 130
			},
			g	: {
				min	:   0,
				max	: 150
			},
			b	: {
				min	: 95,
				max	: 255
			}
		},
		smooth	: {
			hWidth	: 9,
			vWidth	: 9
		}
	};
	this.left	= {
		disp	: {
			enable	: true,
			HHist	: true,
			VHist	: true,
			HLine	: true,
			VLine	: true
		},
		threshold	: {
			r	: {
				min	:   0,
				max	: 130
			},
			g	: {
				min	: 110,
				max	: 255
			},
			b	: {
				min	:   0,
				max	: 130
			}
		},
		smooth	: {
			hWidth	: 9,
			vWidth	: 9
		}
	};
};

var guiOpts	= new DatGuiOpts();

window.addEventListener('load', function(){
	var gui		= new dat.GUI();
// Right display folder
	var folder	= gui.addFolder('Right Display');
	//folder.open();
	folder.add(guiOpts.right.disp, 'enable');
	folder.add(guiOpts.right.disp, 'HHist');
	folder.add(guiOpts.right.disp, 'VHist');
	folder.add(guiOpts.right.disp, 'HLine');
	folder.add(guiOpts.right.disp, 'VLine');
// Right Threshold folder
	var folder	= gui.addFolder('Right Threshold');
	//folder.open();
	folder.add(guiOpts.right.threshold.r	, 'min', 0, 255).name('red min');
	folder.add(guiOpts.right.threshold.r	, 'max', 0, 255).name('red max');
	folder.add(guiOpts.right.threshold.g	, 'min', 0, 255).name('green min');
	folder.add(guiOpts.right.threshold.g	, 'max', 0, 255).name('green max');
	folder.add(guiOpts.right.threshold.b	, 'min', 0, 255).name('blue min');
	folder.add(guiOpts.right.threshold.b	, 'max', 0, 255).name('blue max');
	folder.add(guiOpts.right.smooth		, 'hWidth', 0, 20).step(1);
	folder.add(guiOpts.right.smooth		, 'vWidth', 0, 20).step(1);

// Left display folder
	var folder	= gui.addFolder('Left Display');
	//folder.open();
	folder.add(guiOpts.left.disp, 'enable');
	folder.add(guiOpts.left.disp, 'HHist');
	folder.add(guiOpts.left.disp, 'VHist');
	folder.add(guiOpts.left.disp, 'HLine');
	folder.add(guiOpts.left.disp, 'VLine');
// Left Threshold folder
	var folder	= gui.addFolder('Left Threshold');
	//folder.open();
	folder.add(guiOpts.left.threshold.r	, 'min', 0, 255).name('red min');
	folder.add(guiOpts.left.threshold.r	, 'max', 0, 255).name('red max');
	folder.add(guiOpts.left.threshold.g	, 'min', 0, 255).name('green min');
	folder.add(guiOpts.left.threshold.g	, 'max', 0, 255).name('green max');
	folder.add(guiOpts.left.threshold.b	, 'min', 0, 255).name('blue min');
	folder.add(guiOpts.left.threshold.b	, 'max', 0, 255).name('blue max');
	folder.add(guiOpts.left.smooth		, 'hWidth', 0, 20).step(1);
	folder.add(guiOpts.left.smooth		, 'vWidth', 0, 20).step(1);

// try to save value but doesnt work
	//gui.remember(guiOpts);
});
