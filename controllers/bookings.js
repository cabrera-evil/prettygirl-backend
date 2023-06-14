const Booking = require("../models/booking");

// Get all bookings
const bookingGet = async (req, res) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };

    const [total, booking] = await Promise.all([
        Booking.countDocuments(query),
        Booking.find(query)
            .limit(Number(limit))
            .skip(Number(skip)),
    ]);

    res.json({
        total,
        booking,
    });
};

// Get an specific booking
const getBooking = async (req, res = response) => {
    const { id } = req.params;
    const booking = await Booking.findById(id)

    res.json(booking);
};

// Post a new booking
const bookingPost = async (req, res) => {
    const booking = new Booking(req.body);

    await booking.save();
    res.json({
        booking,
    });
};

// Put an specific booking
const bookingPut = async (req, res) => {
    const { id } = req.params;
    const newBooking = {...req.body};

    const updatedBooking = await Booking.findByIdAndUpdate(id, newBooking , {new: true});
    res.json(updatedBooking);
};

// Delete an specific booking
const bookingDelete = async (req, res) => {
    const { id } = req.params;

    const BookingDB = await Booking.findByIdAndDelete(id);
    res.json({
        BookingDB,
    });
};

module.exports = {
    bookingGet,
    getBooking,
    bookingPost,
    bookingPut,
    bookingDelete,
};
