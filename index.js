module.exports = function(robot) {
    robot.respond(/roll (\w+)$/, function(msg, done) {
        var die = msg.match[1];

        var breakdown = /(\d+)?d(\d+)/.exec(die);
        if (!breakdown) {
            done();
            return;
        }
        var sides = breakdown[2] | 0;
        var count = 1;
        if (breakdown[1]) {
            count = breakdown[1] | 0;
        }

        var rolls = [];
        for (var i = 0; i < count; i++) {
            rolls.push(roll(sides));
        }

        msg.reply(rolls.join('\n'), done);
    });
};


function roll(sides) {
    var r = (Math.random() * sides | 0) + 1;
    var output = 'Rolled ' + r.toString();
    if (sides === 20) {
        if (r === 20) {
            output += ' (NAT 20!)';
        } else if (r === 1) {
            output += ' (CRITICAL MISS)';
        }
    }
    return output;
}
