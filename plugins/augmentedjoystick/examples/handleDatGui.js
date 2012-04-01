var DatGuiOpts	= function(){
	this.green	= {
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
				min	: 110,
				max	: 255
			},
			b	: {
				min	:   0,
				max	: 130
			}
		},
		smooth	: {
			hFactor	: 0.07,
			vFactor	: 0.07
		}
	};
	this.blue	= {
		disp	: {
			enable	: false,
			HHist	: false,
			VHist	: false,
			HLine	: true,
			VLine	: true
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
			hFactor	: 0.05,
			vFactor	: 0.05
		}
	};
};

var guiOpts	= new DatGuiOpts();

window.addEventListener('load', function(){
	var gui		= new dat.GUI();
// Green display folder
	var folder	= gui.addFolder('Green Display');
//	folder.open();
	folder.add(guiOpts.green.disp, 'enable');
	folder.add(guiOpts.green.disp, 'HHist');
	folder.add(guiOpts.green.disp, 'VHist');
	folder.add(guiOpts.green.disp, 'HLine');
	folder.add(guiOpts.green.disp, 'VLine');
// Green Threshold folder
	var folder	= gui.addFolder('Green Threshold');
	folder.open();
	folder.add(guiOpts.green.threshold.r	, 'min', 0, 255).name('red min');
	folder.add(guiOpts.green.threshold.r	, 'max', 0, 255).name('red max');
	folder.add(guiOpts.green.threshold.g	, 'min', 0, 255).name('green min');
	folder.add(guiOpts.green.threshold.g	, 'max', 0, 255).name('green max');
	folder.add(guiOpts.green.threshold.b	, 'min', 0, 255).name('blue min');
	folder.add(guiOpts.green.threshold.b	, 'max', 0, 255).name('blue max');
	folder.add(guiOpts.green.smooth		, 'hFactor', 0, 0.4);
	folder.add(guiOpts.green.smooth		, 'vFactor', 0, 0.4);


// Blue display folder
	var folder	= gui.addFolder('Blue Display');
	folder.open();
	folder.add(guiOpts.blue.disp, 'enable');
	folder.add(guiOpts.blue.disp, 'HHist');
	folder.add(guiOpts.blue.disp, 'VHist');
	folder.add(guiOpts.blue.disp, 'HLine');
	folder.add(guiOpts.blue.disp, 'VLine');
// Blue Threshold folder
	var folder	= gui.addFolder('Blue Threshold');
	folder.open();
	folder.add(guiOpts.blue.threshold.r	, 'min', 0, 255).name('red min');
	folder.add(guiOpts.blue.threshold.r	, 'max', 0, 255).name('red max');
	folder.add(guiOpts.blue.threshold.g	, 'min', 0, 255).name('green min');
	folder.add(guiOpts.blue.threshold.g	, 'max', 0, 255).name('green max');
	folder.add(guiOpts.blue.threshold.b	, 'min', 0, 255).name('blue min');
	folder.add(guiOpts.blue.threshold.b	, 'max', 0, 255).name('blue max');
	folder.add(guiOpts.blue.smooth		, 'hFactor', 0, 0.4);
	folder.add(guiOpts.blue.smooth		, 'vFactor', 0, 0.4);
});
