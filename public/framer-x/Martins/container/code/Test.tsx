import * as React from "react";
import { PropertyControls, ControlType } from "framer";

const style: React.CSSProperties = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#8855FF",
    background: "rgba(136, 85, 255, 0.1)",
    overflow: "hidden",
};

// Define type of property
interface Props {
    text: string;
}

export const Fade: Override = props => {
    data.opacity.set(props.opacity)

    return {
        opacity: data.opacity,
        onTap() {
            animate.linear(data.opacity, 0, 0.2)
        },
    }
}

export class Test extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
    kind: ControlType.ComponentInstance
    }

    export const Fade: Override = props => {
    data.opacity.set(props.opacity)

    return {
        opacity: data.opacity,
        onTap() {
            animate.linear(data.opacity, 0, 0.2)
        },
    }
}

    // Items shown in property panel
    static propertyControls: PropertyControls = {
    kind: { type: ControlType.ComponentInstance, title: "kind" },
    }

    render() {
    return <div style={style}>{this.props.text}</div>;
    }
}
