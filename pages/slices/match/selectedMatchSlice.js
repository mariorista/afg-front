import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matchesList: [],
  teamsList: [],
  correctPairedList: [],
  problematicList: [],

  matchT1: "",
  matchT2: "",
  stdT1: "",
  stdT2: "",
  stdIdx1: -1,
  stdIdx2: -2,
  problematicMatchIdx: -1,
  selTeam: "",
  selTeamIdx: -1,
  selMatch: {},
  selMatchIndex: -1,

  allNewPairs: [],
  alerts: [],
};

export const selecMatchSlice = createSlice({
  name: "selecMatch",
  initialState,
  reducers: {
    setAlerts: (state, action) => {
      state.alerts = action.payload;
    },

    setProblematicList: (state, action) => {
      state.problematicList = action.payload;
    },
    setCorrectPairedList: (state, action) => {
      state.correctPairedList = action.payload;
    },
    setSelMatch: (state, action) => {
      state.selMatch = action.payload.selMatch;
      state.selMatchIndex = action.payload.selMatchIndex;
    },
    setSelTeam: (state, action) => {
      state.selTeam = action.payload.selTeam;
      state.selTeamIdx = action.payload.selTeamIdx;
    },
    // addProblematicList: (state, action) => {
    //   state.problematicList.push(action.payload);
    // },
    setProblematicList: (state, action) => {
      state.problematicList = action.payload;
    },
    setProblematicIdx: (state, action) => {
      state.problematicMatchIdx = action.payload;
    },
    setStdT1: (state, action) => {
      state.stdT1 = action.payload;
      console.log(state.stdT1);
    },
    setStdT2: (state, action) => {
      state.stdT2 = action.payload;
      console.log(state.stdT2);
    },
    setMatchTeams: (state, action) => {
      state.matchT1 = action.payload.t1;
      state.matchT2 = action.payload.t2;
      state.selMatchIndex = action.payload.matchIdx;
    },
    setStdTeams: (state, action) => {
      state.stdT1 = action.payload.t1;
      state.stdT2 = action.payload.t2;
      state.stdIdx1 = action.payload.idx1;
      state.stdIdx2 = action.payload.idx2;
    },
    setMatchesList: (state, action) => {
      // console.log("setMatchesList: ", action.payload);
      state.matchesList = action.payload;
    },
    setTeamsList: (state, action) => {
      // console.log("setTeamsList: ", action.payload);
      state.teamsList = action.payload;
    },
  },
});

export const {
  setMatchesList,
  setTeamsList,
  setMatchTeams,
  setStdTeams,
  setProblematicIdx,
  setProblematicList,
  addProblematicList,
  setStdT1,
  setStdT2,
  setSelTeam,
  setSelMatch,
  setCorrectPairedList,
  setAlerts,
} = selecMatchSlice.actions;

export default selecMatchSlice.reducer;
