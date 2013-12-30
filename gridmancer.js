// Gridmancer challenge - Shane Jarvie
// shane.jarvie@gmail.com

var grid = this.getNavGrid().grid;
var tS = 4;

//flags of marked tiles
var y_len = Math.ceil(grid.length / tS);
var x_len = Math.ceil(grid[0].length / tS);
var flags = [];

for (var j = 0; j < y_len; j++) {
	flags.push([]);
	for (var i = 0; i < x_len; i++){
		flags[j].push(0);
	}
}

// Iterative path finding algorithm, generating greedy rectangles as it progresses
var q = [];
q.push([0,0]);
while (q.length > 0) {
	var p = q.pop();
	var y = p[0];
	var x = p[1];
	var occupied;

	//only run an item if not taken before
	if (flags[y/tS][x/tS] == 0) {

		var r = x + tS;
		var u = y + tS;

		occupied = (grid[y][r].length > 0) || (flags[y/tS][r/tS] > 0);

		//find width of rectangle
		//right
		while ((!occupied) && (r < grid.length)) {
			r += tS;
			occupied = (grid[y][r].length > 0) || (flags[y/tS][r/tS] > 0);
		}
		//left
		if (x-tS > 0) {
			occupied = (grid[y][x-tS].length > 0) || (flags[y/tS][(x-tS)/tS] > 0);
			while (!occupied && (x-tS > 0){
				x -= tS;
				occupied = (grid[y][x-tS].length > 0) || (flags[y/tS][(x-tS)/tS] > 0);
			}
		}

        //find valid rectangle rows
        var rowValid = true;
        // up
        if(u < grid.length){
        	while(rowValid){
	                //check each entry of new row
	                for (i = x; i < r; i += tS){
	                	occupied = (grid[u][i].length > 0) || (flags[u/tS][i/tS] > 0);
	                	if (occupied) {
	                		rowValid = false;
	                		break;
	                	}
	                }
	                if (rowValid){
	                	u += tS;
	                }
                }  
            }
        //down
		if (y-tS > 0) {
			rowValid = true;

			while(rowValid){
				if (y - tS < 0){
					rowValid = false;
				}
				else{
		        	//check each entry of new row
		        	for (i = x; i < r; i += tS){
		        		occupied = (grid[y-tS][i].length > 0) || (flags[(y-tS)/tS][i/tS] > 0);

		        		if (occupied) {
		        			rowValid = false;
		        			break;
		        		}
		        	}
		        }
		        if (rowValid){
		        	y -= tS;
		        }
		    }

		}
        
        //add a new rectangle, mark all new flags
        this.addRect((x + r) / 2, (y + u) / 2, (r - x), (u - y));
        for (j = y; j < u; j += tS) {
        	for (i = x; i < r; i += tS){
        		flags[j/tS][i/tS] = 1;
        	}
        }	        
        this.wait();  // Hover over the timeline to help debug!


		// add vertical borders to path
		for (var i = x; i < r; i += tS) {
			//up
			if ((u < grid.length) && (grid[u][i].length === 0) && (flags[u / tS][i/tS] === 0)) {
				q.push([u,i]);
			}
			
			//down
			if ((y - tS >= 0) && (grid[y-tS][i].length === 0) && flags[(y-tS)/tS][i/tS] === 0) {
				q.push([y-tS,i]);

			}
		}
	    // add horizontal border nodes to path
	    for (var j = y; j < u; j += tS) {

			//left
			if ((x - tS >= 0) && (grid[j][x - tS].length === 0) && (flags[j/tS][(x- tS)/tS] === 0)) {
				q.push([j,x-tS]);
			}

			//right
			if ((r < grid[0].length) && (grid[j][r].length === 0) && (flags[j / tS][r/tS] === 0)) {
				q.push([j,r]);
			}
		}
	}
}




