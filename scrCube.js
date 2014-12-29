#pragma strict

var cubeLevel : int = 0;
var textObject : GameObject;
var colorList : Color[];
var fieldPos : Array = new Array();

function Start () {
	gameObject.tag = "tagCube";
	
	CreateText();
	SetText();
	colorList = CreateColorList();
	SetColor();
}

function Update () {

}

function CreateText () {
	textObject = GameObject.Instantiate(Resources.Load("Prefabs/objText"));
	textObject.transform.parent = gameObject.transform;
	textObject.transform.localPosition = Vector3(0,0,0);
	textObject.transform.localScale = Vector3(1,1,1);
	textObject.GetComponent(TextMesh).text = "";
}

function SetColor () {
	if (cubeLevel < colorList.Length) {
		renderer.material.color = colorList[cubeLevel];
	}
}

function SetText () {
	var textToShow = "";
	var textSize = 0.025;
	if (cubeLevel > 0) {
		textToShow = (Mathf.Pow(2,cubeLevel)).ToString();
	}
	
	if (cubeLevel >= 4 && cubeLevel < 7) {
		textSize = 0.02;
	}
	else if (cubeLevel >= 7 && cubeLevel < 10) {
		textSize = 0.015;
	}
	else if (cubeLevel >= 10 && cubeLevel < 14) {
		textSize = 0.01;
	}
	else if (cubeLevel >= 14) {
		textSize = 0.008;
	}
	textObject.GetComponent(TextMesh).text = textToShow;
	textObject.GetComponent(TextMesh).characterSize = textSize;
}

function OnMouseDown () {
	cubeLevel++;
	SetText();
	SetColor();
	scrGame.fieldArray[fieldPos[0], fieldPos[1]] = cubeLevel;
}

function CreateColorList () {
	var ls : Color[] = new Color[14];
	var i = 0;
	ls[i] = Color(240.0/255.0,240.0/255.0,240.0/255.0); i++;
	ls[i] = Color(249.0/255.0,206.0/255.0,213.0/255.0); i++;
	ls[i] = Color(245.0/255.0,176.0/255.0,189.0/255.0); i++;
	ls[i] = Color(242.0/255.0,146.0/255.0,167.0/255.0); i++;
	ls[i] = Color(239.0/255.0,117.0/255.0,148.0/255.0); i++;
	ls[i] = Color(236.0/255.0,82.0/255.0,130.0/255.0); i++;
	ls[i] = Color(216.0/255.0,56.0/255.0,113.0/255.0); i++;
	ls[i] = Color(202.0/255.0,72.0/255.0,113.0/255.0); i++;
	ls[i] = Color(172.0/255.0,87.0/255.0,110.0/255.0); i++;
	ls[i] = Color(142.0/255.0,89.0/255.0,103.0/255.0); i++;
	ls[i] = Color(147.0/255.0,124.0/255.0,177.0/255.0); i++;
	ls[i] = Color(126.0/255.0,98.0/255.0,161.0/255.0); i++;
	ls[i] = Color(105.0/255.0,72.0/255.0,147.0/255.0); i++;
	ls[i] = Color(94.0/255.0,69.0/255.0,125.0/255.0); i++;
	
	return ls;
}

function DestroySelf () {
	Destroy(gameObject);
}


