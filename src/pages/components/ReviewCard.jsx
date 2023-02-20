import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LocationOn from "@material-ui/icons/LocationOn";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BusinessIcon from "@mui/icons-material/Business";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import Magnifier from "react-magnifier";

import {
  AccessTime,
  CalendarToday,
  Info,
  VideocamRounded,
} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
    borderRadius: 0,
    boxShadow: "5px 10px",
    "-webkit-box-shadow": "-1px 2px 10px -1px rgba(0,0,0,0.84)",
    "-moz-box-shadow": "-1px 2px 10px -1px rgba(0,0,0,0.84)",
    "box-shadow": "-1px 2px 10px -1px rgba(0,0,0,0.84)",
  },
  content: {
    padding: 20,
  },
  title: {
    margin: "-20px 0 -10px 0",
  },
}));

export const ReviewCard = React.memo(function ReviewCard(props) {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useFadedShadowStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia classes={mediaStyles}>
        <Magnifier src={props.image} mgShape="square" />
      </CardMedia>
      <CardContent className={styles.content}>
        <TextInfoContent
          classes={textCardContentStyles}
          heading={<h3 className={styles.title}>{props.warehouse_name}</h3>}
          body={
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin:5
                }}
              >
                <LocationOn className={styles.locationIcon} />
                <span>{props.city}</span>
              </div>

              <Typography
                color={"textSecondary"}
                variant={"body2"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px",
                  gap: "5px",
                }}
              >
                <CalendarToday />
                {props.date}
                {console.log(props)}
                <AccessTime />
                {props.time}
              </Typography>
            </>
          }
        />

        <Typography
          color={"textSecondary"}
          variant={"body2"}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px",
            gap: "5px",
          }}
        >
          <VideocamRounded />
          {props.camera_name}
          {console.log(props)}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default ReviewCard;
