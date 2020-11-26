# lumino-dockpanel-react

The DockPanel API is similar to that of react-grid-layout, where each react child component is the a widget in the dock panel and a user defined layout configuration is used to layout the items appropriately

## Install

```sh
$ npm i lumino-dockpanel-react
```

## Code Sample

```js 
<DockPanel onLayoutChange={console.log} layout={layout}>
    <div key="yellow" title="Yellow Title" className="yellow"></div>
    <div key="red" title="Red Title" className="red"></div>
    <div key="blue" className="blue"></div>
</DockPanel>
```

See [full example](https://github.com/zemeolotu/lumino-react/tree/master/examples/dockPanelExample/src/index.tsx)