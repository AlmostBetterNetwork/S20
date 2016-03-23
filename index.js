module.exports = function(robot) {
    robot.respond(/roll ([\w\+ ]+)$/, function(msg, done) {
        var die = msg.match[1];

        var breakdown = /(\d+)?d(\d+) *(\+\s*\d+)?/.exec(die);
        if (!breakdown) {
            done();
            return;
        }
        var sides = breakdown[2] | 0;
        var count = 1;
        var add = 0;
        if (breakdown[1]) {
            count = breakdown[1] | 0;
        }
        if (breakdown[3]) {
            add = parseInt(breakdown[3].substr(1), 10);
        }

        var rolls = [];
        for (var i = 0; i < count; i++) {
            rolls.push(roll(sides, add));
        }

        msg.reply(rolls.join('\n'), done);
    });
};


function roll(sides, add) {
    var r = (Math.random() * sides | 0) + 1;
    var total = r + add;
    var output = 'Rolled ' + r.toString();
    if (add) {
        output += ' + ' + add.toString() + ' = ' + total.toString();
    }
    if (sides === 20) {
        if (r === 20) {
            output += ' (NAT 20!)';
        } else if (r === 1) {
            output += ' (CRITICAL MISS)';
        }
    }
    return output;
}
