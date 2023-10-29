import React from "react";
import { Caption } from "../api/models/Caption";
import { Box, Typography } from "@mui/material";
import colors from "../colors.json";

const addLeadingZero = (n: number, fixedPrecision = 0): string => {
  if (n === 0) return "00";

  if (n < 10) return `0${n.toFixed(fixedPrecision)}`;

  return n.toFixed(fixedPrecision);
};

const formatTime = (time: number): string => {
  const seconds = time % 60;
  const minutes = ((time - seconds) / 60) % 60;
  const hours = (time - seconds - 60 * minutes) / 60;
  return `${hours}:${addLeadingZero(minutes)}:${addLeadingZero(seconds, 2)}`;
};

interface Props extends Caption {
  isSelected: boolean;
  onClick: () => void;
}

export const CaptionText: React.FC<Props> = ({
  text,
  stop,
  start,
  isSelected,
  onClick,
}) => {
  const backgroundColor = colors.colors.color3;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        gap: 1,
        "&:hover": { "& .selectedIndicator": { background: backgroundColor } },
      }}
      onClick={() => onClick()}
    >
      <Box
        className="selectedIndicator"
        sx={{
          minWidth: "3px",
          flex: 0,
          alignSelf: "stretch",
          background: isSelected ? backgroundColor : undefined,
        }}
      />
      <Typography variant="overline" sx={{ flex: 0, minWidth: "11em" }}>
        {formatTime(start)} - {formatTime(stop)}
      </Typography>
      <Typography sx={{ display: "inline", flexShrink: 1 }}>{text}</Typography>
    </Box>
  );
};
