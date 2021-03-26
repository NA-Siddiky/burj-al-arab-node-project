import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>

        </div>
    );
};

export default Book;