import { Grid, Paper, TextField, TextFieldProps } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { CarHistoryContext } from '../context';

const InputRenderer = (props: TextFieldProps) => {
  return (
    <Paper elevation={3}>
      <TextField {...props} />
    </Paper>
  );
};

const DatePickerBar: React.FC = () => {
  const { setStartDate, setEndDate, timerange } = useContext(CarHistoryContext);
  return (
    <Grid item xs={12}>
      <Grid container columnSpacing={2} direction="row" alignItems="center">
        <Grid item xs={6}>
          <MobileDatePicker
            label="Start date"
            inputFormat="MM/DD/YYYY"
            value={timerange?.start ? dayjs.unix(timerange.start) : null}
            onChange={(date) => (date ? setStartDate(dayjs(date).unix()) : null)}
            renderInput={InputRenderer}
          />
        </Grid>
        <Grid item xs={6}>
          <MobileDatePicker
            label="End date"
            inputFormat="MM/DD/YYYY"
            value={timerange?.end ? dayjs.unix(timerange.end) : null}
            onChange={(date) => (date ? setEndDate(dayjs(date).unix()) : null)}
            renderInput={InputRenderer}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DatePickerBar;
