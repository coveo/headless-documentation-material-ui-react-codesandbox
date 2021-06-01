# Example RelevanceInspector

## Use Case
You want to show Debug Information from the query and/or the results using the Coveo Headless framework.

## Prerequisites
To fully understand how to use this example, you must:
1. Have a Coveo Platform organization.
2. Learn about [Coveo Headless](https://docs.coveo.com/en/headless/latest/).

## Components
The following components are added in the example:
* RelevanceInspector
* RelevanceInspectorResult
* RelevanceInspectorWindow

### RelevanceInspector
Connects to `buildRelevanceInspector` to get the Debug information. The UI will show a `Debug Info switch` to enable/disable the debug information.
Once enabled, it will show a `bug icon`, which will show a modal window `RelevanceInspectorWindow` with the debug information presented in JSON format. The JSON is presented using a `react-json-view` component.

![Debug Information](images/Main.PNG)

In order to enable the component, add this to your `App.tsx`:
```javascript
<Grid item xs={6}>
  <RelevanceInspector />
</Grid>
```

### RelevanceInspectorResult
Debug information is also available for each result. This component will show that. If the `RelevanceInspector` is enabled, it will show on a result level a `bug icon`. That will launch the same `RelevanceInspectorWindow`. In this case it will only show the debug information for the current result.

![Debug Information](images/Result.PNG)

In order to enable the component, add this to your `ResultList.tsx`:
```javascript
<RelevanceInspectorResult result={result} index={index} />
```

For example:
```javascript
this.headlessResultTemplateManager.registerTemplates({
      conditions: [],
      content: (result: Result, index: number) => (
        <Box key={result.uniqueId}>
          {/* In this implementation, the ResultLink component is
           responsible for logging a 'click' event to Coveo UA */}
          <ResultLink result={result} />
          <RelevanceInspectorResult result={result} index={index} />
          <ListItem disableGutters>
            <ListItemText secondary={this.getDate(result)} />
          </ListItem>
          <Divider />
        </Box>
      )
    });
```

### RelevanceInspectorWindow
The actual modal window which shows the debug information.


## Reference
https://docs.coveo.com/en/headless/latest/

https://www.npmjs.com/package/react-json-view


## Version
1.0 May 2021, Wim Nijmeijer

