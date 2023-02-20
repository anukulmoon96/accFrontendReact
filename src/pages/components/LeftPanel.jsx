import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Stack } from "@mui/material";

const LeftPanel = () => {
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="state">State</InputLabel>
          <Select labelId="state" id="state" label="State" fullWidth>
            <MenuItem value={10}>Delhi</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
        <InputLabel id="city">
          City
        </InputLabel>
        <Select labelId="city" id="city" label="City" fullWidth>
          <MenuItem value={10}>Bakoli</MenuItem>
        </Select>
        </FormControl>
        <FormControl fullWidth>
        <InputLabel id="warehouse" >
          Warehouse No.
        </InputLabel>
        <Select
          labelId="warehouse"
          id="warehouse"
          label="Warehouse No."
          fullWidth
        >
          <MenuItem value={10}>1</MenuItem>
        </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={4} style={{ margin: "15px 0 0 0 " }}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <Button variant="contained" style={{ margin: "15px 0" }}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default LeftPanel;
