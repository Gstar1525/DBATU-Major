const Slot = {
    constructor(
        date,
        time,
        isAvailable
    ) {
        this.date = date;
        this.time = time;
        this.isAvailable = isAvailable;
    }
}

module.exports = Slot;