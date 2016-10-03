function squadvalue(squad, a,b,c,d) {
    console.log([a,b,c,d]);
    return {
        1: squad[0][1]+squad[a][1]+squad[b][1]+squad[c][1]+squad[d][1],
        2: squad[0][2]+squad[a][2]+squad[b][2]+squad[c][2]+squad[d][2],
        3: squad[0][3]+squad[a][3]+squad[b][3]+squad[c][3]+squad[d][3]
    };

}

function match(squad, mission) {
    var found=[];
    for(var a=1; a<6; ++a) {
        for(var b=a+1; b<7; ++b) {
            for(var c=b+1; c<8; ++c) {
                for(var d=c+1; d<9; ++d) {
                    var squadval = squadvalue(squad, a,b,c,d);
                    console.log([a,b,c,d]);
                    console.log(squadval);
                    if(mission[1]<=squadval[1] && mission[2]<=squadval[2] && mission[3]<=squadval[3]) {
                        found.push([a,b,c,d]);
                    }
                }
            }
        }
    }
    return found;
}

$(document).on("click", ".solve", function() {
    var mission = {};
    var $row = $(".mission").find("input");
    for(var i=1; i<4; ++i) {
        mission[i] = parseInt($($row[i-1]).val());
    }

    var squad = window.squad;
    var found = match(squad, mission);
    console.log(found);

    if(!found.length) {
        $("#result").html("Your Squad is too weak!");
        return;
    }

    var result = "";
    for(var k in found) {
        var s=found[k];
        var squadval = squadvalue(squad, s[0],s[1],s[2],s[3]);
        result+="("+squadval[1]+" / "+squadval[2]+" / "+squadval[3]+") ";
        result+=squad[s[0]][0]+", "+squad[s[1]][0]+", "+squad[s[2]][0]+", "+squad[s[3]][0];
        result+="<br>";
    }
    $("#result").html(result);
});
$(document).on("click", ".savesquad", function() {
    var squad = {}
    for(var i=1; i<9; ++i) {
        var $row = $('.s'+i).find('input');
        squad[i] = {
            0:$($row[0]).val(),
            1:parseInt($($row[1]).val()),
            2:parseInt($($row[2]).val()),
            3:parseInt($($row[3]).val())
        }
    }
    var $bRow = $('.sB').find('input');
    squad[0] = {
        1:parseInt($($bRow[0]).val()),
        2:parseInt($($bRow[1]).val()),
        3:parseInt($($bRow[2]).val())
    }
    console.log("saved");
    window.squad = squad;
    window.Cookies.set("squadron", squad);
});
$(function() {
    window.squad = window.Cookies.getJSON("squadron");
    if(window.squad) {
        var squad = window.squad;
        for(var i=1; i<9; ++i) {
            var $row = $('.s'+i).find('input');
            for(var j=0; j<4; ++j) {
                $($row[j]).val(squad[i][j])
            }
        }
        var $bRow = $('.sB').find('input');
        $($bRow[0]).val(squad[0][1])
        $($bRow[1]).val(squad[0][2])
        $($bRow[2]).val(squad[0][3])
    }
});