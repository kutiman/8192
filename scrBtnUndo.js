#pragma strict

function Start () {

}

function Update () {

}

function OnMouseDown () {
	GameObject.Find("conGame").GetComponent(scrGame).UndoTurn();
}