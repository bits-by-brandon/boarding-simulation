# Boarding Simulator
A simulation to test plane boarding methodologies in your terminal

## Motivation
After watching a [wonderfully informative and entertaining video](https://www.youtube.com/watch?v=oAHbLRjF0vo&t=86s) on 
the frustrations of the existing methodologies for boarding a plane, I decided to build a simulation to model some of the 
methodologies to the test

## Requirements
- Node 11.0+ Due to V8 7.0 bringing a stable sort implementation to Array.sort
    - Request: use lodash sortby() to circumvent stable sort issue

## How to use

Boarding Simulator runs in your terminal and uses a json file to configure the simulation.
Run `node ./dist/index.js` to run the simulation with the default configuration
Pass in a path to a configuration json to use those settings: `node ./dist/index.js path/to/my/settings.json`

### The config file

`passengerCount: number`

Number of passengers that will be assigned seats. Will be limited to the maximum seats available

`rows: number`

Number of seat rows in the plane
___
`columnsPerSide: number`

Number of seat columns *per side* of the plane. Ex: 3 columnsPerSide = 6 columns total
___
`boardingGroups: number`

Number of boarding groups to divide the rows by
___
`stepsBerBag: number`

Number of steps it takes to stow a single bag
___
`bagMin: number`

Minimum number of bags that a passenger may carry
___
`bagMax: number`

Maximum number of bags that a passenger may carry
___
`seatShufflePenalty: number`

Steps it takes for a person to bypass an already seated passenger to get to assigned seat
___

`sortStrategyName: string`

Strategy to sort passengers by. See *Sorting Strategies* for a list of available strategies
___
`showRowNumbers: boolean`
___
`showColumnNumbers: boolean`
___
`showBoardingGroups: boolean`

(not implemented)
___
`showLog: boolean`

(not implemented)
___
`animate: boolean`

Sets the simulation mode. 
- `true`  Animation mode
- `false`  Average mode
___
`simulationRuns: number`

Times that the simulation will be run. Only used when in Average mode, i.e `animate: false`
___
`fps: number`

Framerate of the simulation. Only used when in Animation mode, i.e `animate: true`
___

### Sorting Strategies

`alternatingRows`

`backToFront`

`backToFrontRow`

`bySide`

`fastest`

`frontToBack`

`frontToBackRow`

`isleToWindow`

`random`

`slowest`

`windowToIsle`

### Simulation Mode

The simulator can run in two distinct modes: 

`Animation mode`: Runs a single simulation and displays an animation in the terminal

`Average mode`: Runs the simulation without animating then returns an summary of all simulations run. Runs the
simulation as many times as provided by the provided `siumulationRuns` value

## Building
TBD
