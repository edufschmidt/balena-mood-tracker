# balena-mood-tracker

A voice-controlled mood tracking app meant for deployment on balena devices.

## Usage

Once the `mood-tracker` project is deployed to your device, you need to train Rhasspy. In order to do this, navigate to Rhasspy's UI at `<device-ip>:12101`, and click on the train button. You might also need to download some extra packages, as instructed in the UI.

Once Rhasspy is trained, everything else should work out-of-the-box, and you should be able to create new mood logs by saying something like:

"Computer, today I'm feeling very happy"

Where "computer" is the wake word, "happy" is the actual mood being logged, and "very" is an intensifier.

## Development

In order to build the UI, run the following command:

```
yarn --cwd moody/ui && yarn --cwd moody/ui build
```

Once this is done, you can now build the balena project on your local machine with:

```
balena build -f <fleet-name> --emulated
```

You can also push it directly to your device with:

```
balena push <device-ip.local>
```

Note that this assumes your device is set to local mode.

Or, you can just push this button, and the project will deploy to your balenaCloud account:

[![](https://balena.io/deploy.png)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/edufschmidt/balena-mood-tracker)

## TO DO
### Fixes
- [ ] Add the UI build step to the Docker build

### Rhasspy
- [ ] Handle intensifiers
- [ ] Handle different times/ranges
- [ ] Add more complex rules
### API
- [ ] Integrate more closely with Rhasspy, and provide endpoints for configuring it
- [ ] Allow for the creation of logs that span multiple days/hours/years
- [ ] Allow for the creation of notes to correlate with moods
- [ ] Allow users to log moods on arbitrarily chosen dates/times
- [ ] Improve sentiment analysis/scoring strategy e.g., to take into account intensifiers
- [ ] Process data and generate some statistics
### UI
- [ ] Create empty state
- [ ] Create error state
- [ ] Show events other than mood logs (e.g., from notes)
- [ ] Show logs that span multiple days/hours/years
- [ ] Stack with google calendar/retrieve calendar events for context
- [ ] Aggregate mood logs based on zoom level
- [ ] Draw timeline ticks
- [ ] Store selected data range locally so that it doesn't get lost after a page refresh.
