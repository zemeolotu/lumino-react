import { useEffect, useState, useRef, ReactNode, ReactElement, ReactNodeArray} from "react";
import { DockPanel as LuminoDockPanel, Widget } from "@lumino/widgets";
import React from "react";
import * as ReactDOM from "react-dom";


class DockPanelItem extends Widget {
    portal: React.ReactPortal;
    key: React.Key | null;

    constructor(fragment: ReactNode) {
        super();
        this.key = (fragment as ReactElement).key;
        this.title.label = (fragment as ReactElement).props?.title || "";
        this.portal = ReactDOM.createPortal(fragment, this.node);
    }
}

const mapWidgets = (widgetFunc: any, layout: any) => {
    if (layout.main) {
        layout.main = mapWidgets(widgetFunc, layout.main);
    } else if (layout.children) {
        layout.children = layout.children.map((widget: DockPanelItem) => mapWidgets(widgetFunc, widget));
    } else if (layout.widgets) {
        layout.widgets = layout.widgets.map((widget: DockPanelItem) => widgetFunc(widget));
    }
    return layout;
};

const restore = (dockpanel: LuminoDockPanel, children: ReactNodeArray, layout: any) => {
    const widgets = new Map();
    const seenKeys = new Set<React.Key>();
    const portals = children.map((child: ReactNode) => {
        const widget = new DockPanelItem(child);
        dockpanel.addWidget(widget);
        if (widget.key == null) {
            throw Error("DockPanel children must have a `key`");
        } else if (seenKeys.has(widget.key)) {
            throw Error("DockPanel children must have a unique `key`");
        } else {
            widgets.set(widget.key, widget);
            seenKeys.add(widget.key);
            return widget.portal;
        }
    });
    if (layout) {
        const dockPanelLayout = mapWidgets((widgetKey: string) => widgets.get(widgetKey), layout);
        dockpanel.restoreLayout(dockPanelLayout);
    }

    return portals;
};

type DockPanelProps  = {
  layout: any // fix type
  onLayoutChange: (layout: any) => void// fix type
}

const DockPanel = (props: React.PropsWithChildren<DockPanelProps>) => {
    const container = useRef<HTMLDivElement>(null);
    const [dockpanel] = useState<LuminoDockPanel>(new LuminoDockPanel());
    const { children, onLayoutChange, layout: initialLayout } = props;

    const dockPanelUpdated = () => {
        const layoutWithKeys = mapWidgets((widget: DockPanelItem) => widget.key, dockpanel.saveLayout());
        onLayoutChange?.(layoutWithKeys);
    };

    useEffect(() => {
        if (container.current !== null) {
            dockpanel.id = "main";
            Widget.attach(dockpanel, container.current);
            dockpanel.layoutModified.connect(() => dockPanelUpdated());
        }
    }, []);

    return (
        <React.Fragment>
            <div ref={container}></div>
            {restore(dockpanel, children as React.ReactNodeArray, initialLayout)}
        </React.Fragment>
    );
};

export default DockPanel;
