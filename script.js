let _shader, colmatrix, id=2, comp=0;

let filtersList = [
	[[1,0,0],[1,1,0],[0,0,1]],
	[[1,1,0],[0,1,0],[0,0,1]],
	[[1,0,0],[1,0,0],[0,0,1]],
	[[0,1,0],[0,1,0],[0,0,1]],
	[[1,0,0],[0,1,0],[0,1,1]],
	[[1,0,0],[0,1,0],[0,1,0]],
	[[1,1,1],[1,1,1],[1,1,1]],
	[[0,0,0],[0,0,0],[0,0,1]],
	[[1,0,0],[0,1,0],[0,0,1]],
	
];

function setup () {
	let cnv = createCanvas(400,400,WEBGL);
	cnv.parent(document.getElementById('form'));
	let vert=document.getElementById('vert').innerHTML;
	let frag=document.getElementById('frag').innerHTML;
	_shader=createShader(vert,frag);
	colmatrix=filtersList[4]
}

function draw () {
	_shader.setUniform("redWeight",  colmatrix[0]);
	_shader.setUniform("greenWeight",colmatrix[1]);
	_shader.setUniform("blueWeight", colmatrix[2]);
	shader(_shader);
	// fill("white")
	quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function blendMatrix(a,b,v) {
	const x = [[0,0,0],[0,0,0],[0,0,0]];
	for(let i = 0; i < 3; i++) {
		for(let j = 0; j < 3; j++) {
			x[i][j]=a[i][j]*(1-v)+b[i][j]*(v)
		}
	}
	return x;
}

function setFilter (n,m) {
	return blendMatrix(filtersList[n], filtersList[8], m);
}

let elts= document.getElementsByClassName("cbtype");
for(let i = 0; i < elts.length; i++) {
	elts[i].addEventListener('input', e=>{
		colmatrix=setFilter(e.target.id,0.1)
		id = e.target.id;
	});
}

document.getElementById('compval').addEventListener('input', e=> {
	comp=1-e.target.value;
	colmatrix=setFilter(id,comp)
})