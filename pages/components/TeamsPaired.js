import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  CardHeader,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import cloneDeep from "lodash/cloneDeep";
import { cloneDeep } from "lodash";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProblematicList,
  setSelMatch,
  setCorrectPairedList,
  setMatchesList,
} from "../slices/match/selectedMatchSlice";
import style from "../../styles/MatchNoPaired.module.css";
import config from "../../config.json";

const TeamsPaired = () => {
  const { selTeam, selMatch, selMatchIndex, matchesList, problematicList } =
    useSelector((state) => state.selectedMatchReducer);
  const dispatch = useDispatch();

  const [std1, setStd1] = useState("");
  const [std2, setStd2] = useState("");
  const [net1, setNet1] = useState("");
  const [net2, setNet2] = useState("");
  const [break1, setBreak1] = useState(false);
  const [break2, setBreak2] = useState(false);
  const [pairPos1, setPairPos1] = useState(0);
  const [pairPos2, setPairPos2] = useState(0);
  const header = "paired teams";

  useEffect(() => {
    //update every time a new match is selected
    setNet1(!!selMatch.netT1 ? selMatch.netT1 : selMatch.t1);
    setNet2(!!selMatch.netT2 ? selMatch.netT2 : selMatch.t2);
    setStd1(!!selMatch.dbT1 ? selMatch.dbT1 : "");
    setStd2(!!selMatch.dbT2 ? selMatch.dbT2 : "");
  }, [selMatch]);

  useEffect(() => {
    //update every time a new team is selected to be paired with one of the match teams
    // const selt=selTeam.toString();//in case sel team is string obj
    let flag = false;
    if (break1 && (!std1 || std1 === null)) {
      setStd1(selTeam);
      setBreak1(false);
      brokenSearch();
      setPairPos1(1);
      return;
    }

    if (!selMatch.dbT1 || selMatch.dbT1 === "")
      if (!std1 || std1 === null) {
        setStd1(selTeam);
        flag = true;
        setPairPos1(1);
      }

    if (break2 && (!std2 || std2 === null)) {
      setStd2(selTeam);
      setBreak2(false);
      brokenSearch();
      setPairPos2(2);
      return;
    }

    if (!flag)
      if (!selMatch.dbT2 || selMatch.dbT2 === "")
        if (!std2 || std2 === null) {
          setStd2(selTeam);
          setPairPos2(2);
        }
  }, [selTeam]);

  const brokenSearch = () => {
    matchesList.map((m, idx) => {
      if (m.dbT1 === selTeam || m.dbT2 === selTeam) {
        const isInArrayFlag = problematicList.find((pm) => {
          return pm.matchId == m.matchId ? true : false;
        });
        if (isInArrayFlag) {
          return;
        }
        let localProblematic = problematicList.slice();
        const m2 = { ...m, probIdx: idx };
        // const m2 = cloneDeep(m);
        // m2.probIdx=idx;
        localProblematic.push(m2);
        dispatch(setProblematicList(localProblematic));
      }
    });
  };

  const okClick = (a) => {
    // console.log("okClick", a);
    //TODO create a new object match clone of the sel match
    const pairMatch = cloneDeep(selMatch);
    pairMatch.dbT1 = std1;
    pairMatch.dbT2 = std2;

    if (break1 || pairPos1 == 1) {
      pairMatch.d1 = config.user_paired;
      setPairPos1(0);
    }
    if (break2 || pairPos2 == 2) {
      pairMatch.d2 = config.user_paired;
      setPairPos2(0);
    }
    dispatch(
      setSelMatch({ selMatch: pairMatch, selMatchIndex: selMatchIndex })
    );

    let newMatchArray = cloneDeep(matchesList);
    newMatchArray[selMatchIndex] = pairMatch;
    dispatch(setMatchesList(newMatchArray));

    // correctPairedList.push(newMatchArray);
  };

  const breakT1 = (e) => {
    // console.log("breakT1", e.target.value);
    setStd1(null);
    setBreak1(true);
  };
  const breakT2 = (e) => {
    // console.log("breakT2", e);
    setStd2(null);
    setBreak2(true);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box>
          <Card sx={{ minWidth: 275 }}>
            <CardHeader title={header} sx={{ background: "red" }}></CardHeader>
            <CardContent>
              <div className={style.pair_all}>
                <div className={style.grid}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>
                        <small>netT1:</small> <strong> {net1} </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <small>stdT1:</small> <strong> {std1} </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        sx={{
                          border: "1px solid #73AD21",
                          backgroundColor: "beige",
                        }}
                        value="cccc"
                        onClick={breakT1}
                      >
                        break
                      </Button>
                    </Grid>
                    {/* <Grid item xs={3}>
                  <Button onClick={() => okT1("aaaaa")}>OK</Button>
                </Grid> */}

                    <Grid item xs={4}>
                      <Typography>
                        <small>netT2:</small> <strong> {net2} </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <small>stdT2:</small> <strong> {std2} </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        sx={{
                          border: "1px solid #73AD21",
                          backgroundColor: "beige",
                        }}
                        onClick={breakT2}
                      >
                        break
                      </Button>
                    </Grid>
                    {/* <Grid item xs={3}>
                  <Button onClick={okT2}>OK</Button>
                </Grid> */}
                  </Grid>
                </div>

                <div className={style.ok}>
                  <Button
                    sx={{
                      border: "1px solid #73AD21",
                      backgroundColor: "lemonchiffon",
                    }}
                    onClick={okClick}
                  >
                    OK
                  </Button>{" "}
                </div>
              </div>
            </CardContent>
            {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default TeamsPaired;
