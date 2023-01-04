import { Typography } from "@mui/material";
import styles from "../../styles/Desc.module.css";

const Descriptor = ({ height, width, data, title, subtitle }) => {
  //   const vdata = data.map((e)=><div style="flex-grow: 1"> {e}</div>)
  const vdata = [];
  for (const [key, value] of Object.entries(data)) {
    // console.log(`${key}: ${value}`);
    if (!!value) {
      let len = value.length;
      vdata.push(
        <div key={key} style={{ flexGrow: len }}>
          {key}_: {value}
        </div>
      );
    }
  }
  title = (
    <Typography>
      {data.dbT1} - {data.dbT2}
    </Typography>
  );
  // title = <div >{data.dbT1} - {data.dbT2}</div>;

  const maindata = title || subtitle ? true : false;
  return (
    <>
      <div
        style={{
          backgroundColor: "lavender",
          width: width,
          height: height,
        }}
      >
        <div hidden={!maindata}>
          <span className={styles.desctitle}>{title}</span>
          <span className={styles.descsubtitle}>{subtitle}</span>
        </div>
        <div
          className={styles.cls}
          style={{
            backgroundColor: "powderblue",
          }}
        >
          {vdata}
        </div>
      </div>
    </>
  );
};

export default Descriptor;
