import Plane from './Plane'

it('creates the right amount of seats', () => {
    const plane = new Plane(3, 4, 2);

    expect(plane.seats.length).toEqual(24);
});

it('assigns seat boarding groups', () => {
    const plane = new Plane(10, 2, 2);

    const firstBoardingGroupSeats = plane.getBoardingGroup(0);

    expect(firstBoardingGroupSeats.length).toEqual(20);
});
