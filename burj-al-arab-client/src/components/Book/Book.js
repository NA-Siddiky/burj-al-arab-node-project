import { Button, Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleCheckInDate = (date) => {
        const newDates = { ...selectedDate }
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };

    const handleCheckOutDate = (date) => {
        const newDates = { ...selectedDate }
        newDates.checkOut = date;
        setSelectedDate(newDates);
    };

    const handleBooking = () => {

    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check InDate picker inline"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Date picker dialog"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>

                <Button onClick={handleBooking} variant="contained" color="primary">
                    Book Now
                </Button>
            </MuiPickersUtilsProvider>

        </div>
    );
};

export default Book;