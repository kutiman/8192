#pragma strict

static var fieldArray : int[,];
var objField : GameObject;

var gameTurn : int = 0;

function Start () {
	fieldArray = CreateNewField();
	CreateCubes(fieldArray);
}

function Update () {
	if (Input.GetKeyDown (KeyCode.UpArrow)) {
		fieldArray = MergeField("north", fieldArray);
		CreateCubes(fieldArray);
	}
	if (Input.GetKeyDown (KeyCode.DownArrow)) {
		fieldArray = MergeField("south", fieldArray);
		CreateCubes(fieldArray);
	}
	if (Input.GetKeyDown (KeyCode.LeftArrow)) {
		fieldArray = MergeField("west", fieldArray);
		CreateCubes(fieldArray);
	}
	if (Input.GetKeyDown (KeyCode.RightArrow)) {
		fieldArray = MergeField("east", fieldArray);
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
			var ancY = 4.8;
			obj.transform.parent = GameObject.Find("objField").transform;
			obj.transform.localPosition = Vector3(ancX + i * 2.4, ancY - n * 2.4, -1);
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

function MergeField (direction, field : int[,]) {
	var newField : int[,] = new int[5,5];
	var i : int;
	var n : int;
	var row : Array = new Array();
	
	switch (direction) {
		case "north":
			for (i = 0; i < 5; i++) {
				row.Clear();
				
				for (n = 0; n < 5; n++) {
					row.Add(field[i,n]);				
				}
				row = ShiftToSide(row);
				for (n = 0; n < row.length; n++) {
					newField[i,n] = row[n];
				}
			}
			break;
			
		case "west":
			for (i = 0; i < 5; i++) {
				row.Clear();
				
				for (n = 0; n < 5; n++) {
					row.Add(field[n,i]);				
				}
				row = ShiftToSide(row);
				for (n = 0; n < row.length; n++) {
					newField[n,i] = row[n];
				}
			}
			break;
			
		case "south":
			for (i = 4; i >= 0; i--) {
				row.Clear();
				
				for (n = 0; n < 5; n++) {
					row.Add(field[i,n]);				
				}
				row = ShiftToSide(row);
				for (n = 0; n < row.length; n++) {
					newField[i,4 - n] = row[n];
				}
			}
			break;
			
		case "east":
			for (i = 0; i < 5; i++) {
				row.Clear();
				
				for (n = 4; n >= 0; n--) {
					row.Add(field[n,i]);				
				}
				row = ShiftToSide(row);
				for (n = 0; n < row.length; n++) {
					newField[4 - n,i] = row[n];
				}
			}
			break;
	}
	return newField;
}

function ShiftToSide (arr : Array) {
	var newArray : Array = new Array();
	var i = 0;
	while (i < arr.length) {
		if (arr[i] == 0) {
			arr.RemoveAt(i);
		}
		else {
			newArray.Add(arr[i]);
			i++;
		}
	}

	for (i = 0; i < newArray.length - 1; i++) {
		if (newArray[i] == newArray[i+1]) {
			var tempInt : int = newArray[i];
			newArray[i] = tempInt + 1;
			newArray.RemoveAt(i+1);
		}		
	}
	while (newArray.length < 5) {
		newArray.Add(0);
	}
	return newArray;
}













