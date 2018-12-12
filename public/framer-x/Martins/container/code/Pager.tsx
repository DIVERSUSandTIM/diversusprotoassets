import * as React from "react";
import { Scroll, ControlType, PropertyControls} from "framer";

// Define type of property
interface Props {
    width: number;
    height: number;
    text: string;
    callname: string;
};

export class Pager extends React.Component<Props> {
    static propertyControls: PropertyControls = { text:{ type: ControlType.String, title: "naame" }}
    render() {
        return (
            <Scroll 
                parentSize={{
                    width: this.props.width,
                    height: this.props.height,
                }}
            >
                {this.props.children}
            </Scroll>
        );   
    }
}