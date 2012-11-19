# note about dialog tree
* how to code it
* how to test it

### how to test it
* no need for 3d
* so display somehitng on tty with node
  * or in js console with function to answer
  *2 runnerConsole runnerTty

### Misc
* this is a graph
* each node is a exchange in the conversation

What is a node ?
* bot can say something
* player got multiple choises to pick
* depending on player choise, we go to the next node
* if there are no more children, the conversation is over


#### node data structure:
* string are template "Hello <%= playername %>"

{
	identifier	: "blabla",
	botText		: "Hello superplayer"
	children: [
		{
			playerText	: "Hi",
			nextNode	: 
				"anIdentifier"
				| {
					botText	: 'call me bill'
				} 
				| function(){ return aNode; }
		},
		{
			playerText	: "Hi",
		},
	]
}


#### issue in data representation:
* to edit that in a text file is doable but very inconfortable
* it is ok on very short/simple conversation
* for longer one, a graphical editor is likely needed
  * how to do it easily
  * is there a easy way to do that


