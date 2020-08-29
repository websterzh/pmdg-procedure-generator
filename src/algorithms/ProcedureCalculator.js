function _parseTurnDirection(turnDirection) {
    const tokens = [];
    switch (turnDirection) {
        case 'L':
            tokens.push(`TURN LEFT DIRECT`);
            break;
        case 'R':
            tokens.push(`TURN RIGHT DIRECT`);
            break;
        default:
            break;
    }
    return tokens;
}

function _parseSpeed(speed) {
    const tokens = [];
    if (speed) {
        tokens.push(`SPEED ${speed}`);
    }
    return tokens;
}

function _parseAltitude(altitude) {
    const tokens = [];
    if (altitude) {
        const matchAbove = /(\d+)A/;
        const matchBelow = /(\d+)B/;
        const matchAt = /(\d+)/;
        const above = altitude.match(matchAbove);
        const below = altitude.match(matchBelow);
        const at = altitude.match(matchAt);
        if (below) {
            tokens.push(`AT OR BELOW ${below[1]}`);
        }
        if (above) {
            tokens.push(`AT OR ABOVE ${above[1]}`);
        }
        if (!above && !below && at) {
            tokens.push(`${at[1]}`);
        }
    }
    return tokens;
}

function _parseFix(fix, flyover = false) {
    const tokens = [];
    if (fix) {
        if (flyover) {
            tokens.push(`FIX OVERFLY ${fix}`);
        } else {
            tokens.push(`FIX ${fix}`);
        }
    }
    return tokens;
}

function _parseHdgTrk(hdgtrk) {
    const tokens = [];
    if (hdgtrk) {
        const matchHdg = /H(\d+)/;
        const matchTrk = /T(\d+)/;
        const matchNumber = /(\d+)/;
        const hdg = hdgtrk.match(matchHdg);
        const trk = hdgtrk.match(matchTrk);
        const num = hdgtrk.match(matchNumber);
        if (trk) {
            tokens.push(`TRK ${trk[1]}`);
        } else if (hdg) {
            tokens.push(`HDG ${hdg[1]}`);
        } else if (num) {
            tokens.push(`TRK ${num[1]}`);
        }
        if (hdg || trk || num) {
            tokens.push(`UNTIL`);
        }
    }
    return tokens;
}

function _parseWaypoint(waypoint) {
    const tokens = [];
    tokens.push(..._parseTurnDirection(waypoint.turnDirection));
    if (waypoint.fix) {
        tokens.push(..._parseFix(waypoint.fix, waypoint.flyover));
    } else if (waypoint.hdgtrk) {
        tokens.push(..._parseHdgTrk(waypoint.hdgtrk));
    }
    tokens.push(..._parseAltitude(waypoint.altitude));
    tokens.push(..._parseSpeed(waypoint.speed));

    return tokens;
}

function getSid(data) {
    let tokens = [];
    if (data.general.airport && data.general.procedure && data.general.runway) {
        tokens.push(`SID`);
        tokens.push(`${data.general.procedure}`);
        tokens.push(`RNW ${data.general.runway}`);
    }
    for (let i = 0; i < data.sid.length; i++) {
        const waypoint = data.sid[i];
        tokens.push(..._parseWaypoint(waypoint));
    }

    return tokens;
}

function getStar(data) {
    let tokens = [];
    if (data.general.airport && data.general.procedure && data.general.runway) {
        tokens.push(`STAR`);
        tokens.push(`${data.general.procedure}`);
    }
    for (let i = 0; i < data.star.length; i++) {
        const waypoint = data.star[i];
        tokens.push(..._parseWaypoint(waypoint));
    }

    if (data.general.airport && data.general.procedure && data.general.runway) {
        tokens.push("\n");
        tokens.push("");
        tokens.push(`RNW ${data.general.runway}`);
    }
    return tokens;
}

function getApproach(data) {
    let tokens = [];
    if (data.general.airport && data.general.procedure && data.general.runway) {
        tokens.push(`APPROACH`);
        tokens.push(`${data.general.procedure}`);
    }
    for (let i = 0; i < data.approach.length; i++) {
        const waypoint = data.approach[i];
        if (!waypoint.fix && !waypoint.hdgtrk) {
            tokens.push(`RNW ${data.general.runway}`);
        }
        tokens.push(..._parseWaypoint(waypoint));
    }

    return tokens;
}

function getTransition(data) {
    let tokens = [];
    if (data.general.procedure) {
        tokens.push("");
        tokens.push(`TRANSITION`);
        tokens.push(`${data.general.procedure}`);
    }
    for (let i = 0; i < data.transition.length; i++) {
        const waypoint = data.transition[i];
        tokens.push(..._parseWaypoint(waypoint));
    }

    return tokens;
}

export function calculate(data) {
    switch (data.general.mode) {
        case "SID":
            return getSid(data);
        case "STAR":
            return getStar(data);
        case "APPROACH":
            return getApproach(data);
        case "TRANSITION":
            return getTransition(data);
        default:
            break;
    }
}
