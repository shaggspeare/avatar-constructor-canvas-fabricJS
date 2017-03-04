(function() {
    const playground = new fabric.Canvas('canvas-playground');

	const data ={
        beards:[
            'beard_1.png',
	        'beard_2.png',
	        'beard_3.png',
	        'beard_4.png',
	        'beard_5.png',
	        'beard_6.png',
	        'beard_8.png',
	        'beard_9.png'
        ],
        wears:[
            'wear_1.png',
	        'wear_2.png',
	        'wear_3.png',
	        'wear_4.png',
	        'wear_5.png',
	        'wear_6.png',
	        'wear_7.png',
	        'wear_8.png'
        ],
		glasses:[
			'glasses_1.png',
			'glasses_2.png',
			'glasses_3.png',
			'glasses_4.png'
		]
    };

	//Render Border
	const border = new fabric.Rect({
		left: 90,
		top: 20,
		fill: 'white',
		width: 183,
		height: 206,
		strokeWidth: 5,
		stroke: 'rgba(100,200,200,0.5)'
	});

	border.hasBorders = false;
	border.hasControls = false;

	playground.add(border).sendToBack(border);

	//Render Default skin
	fabric.Image.fromURL('./img/skin.png', function(img) {

		const defaultSkin = img.set({
			width: 166,
			height: 177,
			left: 100,
			top: 50
		});

		defaultSkin.set('selectable', false);
		defaultSkin.hasBorders = false;
		defaultSkin.hasControls = false;

		playground.add(defaultSkin).bringToFront(defaultSkin);
	});

	//Render titles
	function renderTitle(title, offsetTop) {
		const text = new fabric.Text(title, { left: 600, top: 10 + offsetTop, fontSize: 30,fontFamily: 'Helvetica'});

		text.set('selectable', false);
		text.hasBorders = false;
		text.hasControls = false;

		playground.add(text);
	}

	//Render all items to drag
    function renderItems (itemType, offsetTop, margin, initialLeft = 400) {
        for(let i = 0; i < itemType.length; i+=1){
            fabric.Image.fromURL(`./img/${itemType[i]}`, function(img) {

                let ol = img.set({
	                width: img.width/2,
	                height: img.height/2,
	                left: initialLeft + i*margin,
	                top: offsetTop,
                    backgroundColor: 'gray'
                });

	            playground.add(ol);
	            playground.bringToFront(ol);
            });
        }
    }

    //Compose render functions to each item
    function renderWears() {
	    renderTitle('Choose and drag Wearing', 490);
	    renderItems(data.wears, 550, 150, 20);

    }
	function renderBeards() {
		renderTitle('Choose and drag Hairstyle', 0);
		renderItems(data.beards, 50, 100);

	}
	function renderGlasses() {
		renderTitle('Choose and drag Glasses', 290);
		renderItems(data.glasses, 350, 100, 550);

	}

	renderWears();
	renderBeards();
	renderGlasses();

	//Implement buttons
	document.getElementById('download').addEventListener('click', function() {

		window.open(playground.toDataURL({
			format: 'png',
			left: 90,
			top: 20,
			width: 188,
			height: 211
		}));

	}, false);

	document.getElementById('reset').addEventListener('click', function() {

		location.reload();

	}, false);


	document.getElementById('imgLoader').onchange = function handleImage(e) {
		const reader = new FileReader();
		reader.onload = function (event) {

			const imgObj = new Image();

			imgObj.src = event.target.result;

			imgObj.onload = function () {

				const image = new fabric.Image(imgObj);
				image.set({
					left: 50,
					top: 250,
				});

				playground.add(image);
			}

		};

		reader.readAsDataURL(e.target.files[0]);
	}

})();