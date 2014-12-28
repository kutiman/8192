#pragma strict

var cubeLevel : int = 0;
var textObject : GameObject;

function Start () {
	CreateText();
	SetText();
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

function SetText () {
	var textToShow = "";
	if (cubeLevel > 0) {
		textToShow = (cubeLevel).ToString();
	}
	textObject.GetComponent(TextMesh).text = textToShow;
}

function OnMouseDown () {
	cubeLevel++;
	SetText();
}