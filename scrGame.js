#pragma strict

var fieldArray : int[,];
var objField : GameObject;

function Start () {
	fieldArray = CreateNewField();
	CreateCubes(fieldArray);
}

function Update () {

}

function CreateNewField () {
	var arr : int[,] = new int[5,5];
	for (var i = 0; i < 5; i++) {
		for (var n = 0; n < 5; n++){
			arr[i,n] = 0;
		}
	}
	return arr;
}

function CreateCubes (arr : int[,]) {
	for (var i = 0; i < 5; i++) {
		for (var n = 0; n < 5; n++){
			var cubeLvl = arr[i,n];
			var obj : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Cube"));
			var ancX = -4.8;
			var ancY = -4.8;
			obj.transform.parent = GameObject.Find("objField").transform;
			obj.transform.localPosition = Vector3(ancX + i * 2.4, ancY + n * 2.4, -1);
			//obj.transform.localScale = Vector3(1,1,1);
		}
	}
}