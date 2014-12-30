#pragma strict

static var fieldArray : int[,];
var objField : GameObject;

var gameTurn : int = 0;

function Start () {
	fieldArray = CreateNewField();
	CreateCubes(fieldArray);
}

function Update () {
	if (Input.GetKeyDown (KeyCode.UpArrow)) {NewTurn("north");}
	else if (Input.GetKeyDown (KeyCode.DownArrow)) {NewTurn("south");}
	else if (Input.GetKeyDown (KeyCode.LeftArrow)) {NewTurn("west");}
	else if (Input.GetKeyDown (KeyCode.RightArrow)) {NewTurn("east");}
}

function NewTurn (direction : String) {
	var mergingPossible : boolean = IsMergingPossible(direction, fieldArray);
	if (mergingPossible == true) {
		fieldArray = MergeField(direction, fieldArray);
		CreateCubes(fieldArray);
		InsertNewCube();
		gameTurn++;
	}
}

function CreateNewField () {
	var arr : int[,] = new int[5,5];
	for (var i = 0; i < 5; i++) {
		for (var n = 0; n < 5; n++){
			arr[i,n] = 0;
		}
	}
	// debugging
	arr[3,4] = 6;
	// end debugging
	return arr;
}

function CreateCubes (arr : int[,]) {

	DestroyCubes();
	var ancX = -4.8;
	var ancY = 4.8;	
	for (var i = 0; i < 5; i++) {
		for (var n = 0; n < 5; n++){
			var cubeLvl = arr[i,n];
			var obj : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Cube"));

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
	var newField : int[,] = new int[field.GetLength(0),field.GetLength(1)];
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
			for (i = 0; i < 5; i++) {
				row.Clear();
				
				for (n = 4; n >= 0; n--) {
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

function GetEmptySpot (field : int[,]) {
	var tempList : Array = new Array();
	for (var i = 0; i < field.GetLength(0); i++) {
		for (var n = 0; n < field.GetLength(1); n++) {
			if (field[i,n] == 0) {
				tempList.Add(Vector2(i,n));
			}
		}
	}
	var rndm = Random.Range(0, tempList.length);
	Debug.Log(tempList.length);
	if (tempList.length > 0) {
		return tempList[rndm];
	}
	else {
		return Vector2(-1,-1);
	}
}

function InsertNewCube () {
	var bool = false;
	var pos : Vector2 = GetEmptySpot(fieldArray);
	if (pos.x != -1) {
		fieldArray[pos.x, pos.y] = 1;
		bool = true;
	}
	return bool;
}

function IsMovePossible (field : int[,]) {
	var bool = false;
	
	for (var i = 0; i < field.GetLength(0); i++) {
		for (var n = 0; n < field.GetLength(1); n++) {
			if (field[i,n] == 0) {bool = true; break;}
			if (i > 0) {
				if (field[i,n] == field[i-1,n]) {bool = true; break;}
			}
			if (i < field.GetLength(0) - 1) {
				if (field[i,n] == field[i+1,n]) {bool = true; break;}
			}
			if (n > 0) {
				if (field[i,n] == field[i,n-1]) {bool = true; break;}
			}
			if (n < field.GetLength(1) - 1) {
				if (field[i,n] == field[i,n+1]) {bool = true; break;}
			}
		}
	}
	return bool;
}

function IsMergingPossible (direction, field : int[,]) {
	var bool : boolean = true;
	var newField : int[,] = new int[field.GetLength(0), field.GetLength(1)];
	
	newField = MergeField(direction, field);
	var fieldsIdentical : boolean = AreFieldsIdentical(newField, field);
	if (fieldsIdentical) {bool = false;}
	return bool;
}

function AreFieldsIdentical (field1 : int[,], field2 : int[,]) {
	var bool : boolean = true;
	for (var i = 0; i < field1.GetLength(0); i++) {
		for (var n = 0; n < field1.GetLength(1); n++) {
			if (field1[i,n] != field2[i,n]) {
				bool = false;
				//break;
			}
		}
	}
	Debug.Log("Fields are identical - " + bool.ToString());
	return bool;
}

























