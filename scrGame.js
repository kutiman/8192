#pragma strict

static var fieldArray : int[,];
var objField : GameObject;

var gameTurn : int = 0;

function Start () {
	fieldArray = CreateNewField();
	CreateCubes(fieldArray);
}

function Update () {
	if (Input.GetKeyDown ("space")) {
		fieldArray = MergeField("west", fieldArray);
		CreateCubes(fieldArray);
	}
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

	DestroyCubes();
	
	for (var i = 0; i < 5; i++) {
		for (var n = 0; n < 5; n++){
			var cubeLvl = arr[i,n];
			var obj : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Cube"));
			var ancX = -4.8;
			var ancY = -4.8;
			obj.transform.parent = GameObject.Find("objField").transform;
			obj.transform.localPosition = Vector3(ancX + i * 2.4, ancY + n * 2.4, -1);
			obj.GetComponent(scrCube).cubeLevel = cubeLvl;
			obj.GetComponent(scrCube).fieldPos.Add(i);
			obj.GetComponent(scrCube).fieldPos.Add(n);
		}
	}
}

function DestroyCubes () {
	var objList : GameObject[] = GameObject.FindGameObjectsWithTag("tagCube");
	for (var item : GameObject in objList) {
		item.GetComponent(scrCube).DestroySelf();
	}
}

function MergeField (direction, arr : int[,]) {
	var newArray : int[,] = new int[5,5];
	
	switch (direction) {
		case "north":
			
			break;
			
		case "south":
			
			break;
			
		case "west":
			for (var i = 0; i < arr.GetLength(0); i++) {
				var row : Array = new Array();
				
				for (var n = 0; n < arr.GetLength(1); n++) {
					if (n < 4) {
						if (arr[i,n] > 0 && (arr[i,n] == arr[i,n+1])) {
							row.Add(arr[i,n] + 1);
							n++;
						}
						else if (arr[i,n] > 0) {
							row.Add(arr[i,n]);
						}
					}
					else {
						if (arr[i,n] > 0) {
							row.Add(arr[i,n]);
						}
					}
					
				}
				while (row.length < 5) {
					row.Add(0);
				}
				for (var p = 0; p < row.length; p++) {
					newArray[i,p] = row[p];
				}
			}
			break;
			
		case "east":
			
			break;
	}
	return newArray;
}














