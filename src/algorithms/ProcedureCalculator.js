function _getSid(data) {
    let tokens = [];
    if (data.general.airport && data.general.procedure && data.general.runway) {
        tokens.push(`SID`);
        tokens.push(`${data.general.procedure}`);
        tokens.push(`RNW ${data.general.runway}`);
    }
    for (let i = 0; i < data.sid.length; i++) {
        const waypoint = data.sid[i];
        switch (waypoint.turnDirection) {
            case 'L':
                tokens.push(`TURN LEFT DIRECT`);
                break;
            case 'R':
                tokens.push(`TURN RIGHT DIRECT`);
                break;
            default:
                break;
        }
        if (waypoint.fix) {
            if (waypoint.flyover) {
                tokens.push(`FIX OVERFLY ${waypoint.fix}`);
            } else {
                tokens.push(`FIX ${waypoint.fix}`);
            }
        } else if (waypoint.hdgtrk) {
            const matchHdg = /H(\d+)/;
            const matchTrk = /T(\d+)/;
            const hdg = waypoint.hdgtrk.match(matchHdg);
            const trk = waypoint.hdgtrk.match(matchTrk);
            if (hdg) {
                tokens.push(`HDG ${hdg[1]}`);
            } else if (trk) {
                tokens.push(`TRK ${trk[1]}`);
            }
            if (hdg || trk) {
                tokens.push(`UNTIL`)
            }
        }
        if (waypoint.altitude) {
            const matchAbove = /(\d+)A/;
            const matchBelow = /(\d+)B/;
            const matchAt = /(\d+)/;
            const above = waypoint.altitude.match(matchAbove);
            const below = waypoint.altitude.match(matchBelow);
            const at = waypoint.altitude.match(matchAt);
            if (above) {
                tokens.push(`AT OR ABOVE ${above[1]}`);
            }
            if (below) {
                tokens.push(`AT OR BELOW ${below[1]}`);
            }
            if (!above && !below && at) {
                tokens.push(`${at[1]}`);
            }
        }
        if (waypoint.speed) {
            tokens.push(`SPEED ${waypoint.speed}`);
        }
    }

    return tokens;
}

function _getStar(data) { // eslint-disable-line
    let tokens = [];
    if (data.general.airport && data.general.procedure && data.general.runway) {
        tokens.push(`STAR`);
        tokens.push(`${data.general.procedure}`);
    }
    for (let i = 0; i < data.star.length; i++) {
        const waypoint = data.star[i];
        switch (waypoint.turnDirection) {
            case 'L':
                tokens.push(`TURN LEFT DIRECT`);
                break;
            case 'R':
                tokens.push(`TURN RIGHT DIRECT`);
                break;
            default:
                break;
        }
        if (waypoint.fix) {
            if (waypoint.flyover) {
                tokens.push(`FIX OVERFLY ${waypoint.fix}`);
            } else {
                tokens.push(`FIX ${waypoint.fix}`);
            }
        } else if (waypoint.hdgtrk) {
            const matchHdg = /H(\d+)/;
            const matchTrk = /T(\d+)/;
            const hdg = waypoint.hdgtrk.match(matchHdg);
            const trk = waypoint.hdgtrk.match(matchTrk);
            if (hdg) {
                tokens.push(`HDG ${hdg[1]}`);
            } else if (trk) {
                tokens.push(`TRK ${trk[1]}`);
            }
            if (hdg || trk) {
                tokens.push(`UNTIL`)
            }
        }
        if (waypoint.altitude) {
            const matchAbove = /(\d+)A/;
            const matchBelow = /(\d+)B/;
            const matchAt = /(\d+)/;
            const above = waypoint.altitude.match(matchAbove);
            const below = waypoint.altitude.match(matchBelow);
            const at = waypoint.altitude.match(matchAt);
            if (above) {
                tokens.push(`AT OR ABOVE ${above[1]}`);
            }
            if (below) {
                tokens.push(`AT OR BELOW ${below[1]}`);
            }
            if (!above && !below && at) {
                tokens.push(`${at[1]}`);
            }
        }
        if (waypoint.speed) {
            tokens.push(`SPEED ${waypoint.speed}`);
        }
    }

    if (data.general.airport && data.general.procedure && data.general.runway) {
        tokens.push("\n");
        tokens.push("");
        tokens.push(`RNW ${data.general.runway}`);
    }
    return tokens;
}

function _getApproach(data) { // eslint-disable-line
    // TODO
}

function _getTransition(data) { // eslint-disable-line
    // TODO
}

export function calculate(data) {
    switch (data.general.mode) {
        case "SID":
            return _getSid(data);
        case "STAR":
            return _getStar(data);
        case "APPROACH":
            return _getApproach(data);
        case "TRANSITION":
            return _getTransition(data);
        default:
            break;
    }
}
