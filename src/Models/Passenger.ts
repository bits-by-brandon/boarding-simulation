class Passenger {
    protected id: number;

    constructor(id: number) {
        this.id = id;
    }

    greet(): string {
        return 'Hello, I am person: ' + this.id;
    }
}

export default Passenger;