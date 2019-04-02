export interface GameDesc {
    gameTitle: string;
    desc: string;
    id: any;
    url: string;
}

export interface TeamDesc {
    teamName: String;
    flag: any;
    id: any;
}

export interface Matches {
    date: Date,
    dateTimeGMT: Date,
    matchStarted: boolean,
    squad: boolean,
    team_1: String,
    team_2: String,
    toss_winner_team: String,
    type: String,
    unique_id: any,
    winner_team: String
}