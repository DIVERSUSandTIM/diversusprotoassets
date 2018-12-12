import * as React from "react";
import {
	Data,
	PropertyControls,
	ControlType,
	Stack,
	Frame,
	Animatable,
	animate,
    FrameProperties,
    Override,
} from "framer";

// Define type of property
interface Props {
	key: string;
	text: string;
	pages: number;
	gap: number;
	current: number;
	duration: number;
	width: number;
	height: number;
    previous?: number;
    children: React.ReactChild;
	dot: React.ReactElement<FrameProperties>;
}

const data = Data({ currentPage: 0, pages: 3 });
let pages = 0;

export const isPager: Override = props => {
    pages = this.props.children && this.props.children.length;
    return {
        onChangePage(current) {
            data.currentPage = current;
        }
    };
};

export const isIndicator: Override = () => {
    return {
        pages: data.pages,
        current: data.currentPage
    };
};

setTimeout(() => {
    data.pages = pages;
}, 10);

const range = length => [...Array(length).keys()];



export class PageIndicator extends React.Component<Props> {
	// Set default properties
	static defaultProps = {
		height: 32,
		width: 100,
		gap: 8,
		current: 0,
		pages: 3,
	};

	opacities = Data({
		activeOpacity: Animatable(0.51),
		previousOpacity: Animatable(0.99),
		inactiveOpacity: 0.25,
	});

	stackRef = React.createRef();
	activeRef = React.createRef();

	// Items shown in property panel
	static propertyControls: PropertyControls = {
		gap: {
			type: ControlType.Number,
			title: "Gap",
			min: 0,
			max: 64,
			defaultValue: 8,
			step: 1,
		},
		duration: {
			type: ControlType.Number,
			title: "Duration",
			min: 0,
			max: 2,
			defaultValue: 0.2,
			step: 0.01,
		},
		pages: {
			type: ControlType.Number,
			title: "Pages",
			min: 0,
			max: 10,
			defaultValue: 3,
			step: 1,
		},
		dot: {
			type: ControlType.ComponentInstance,
			title: "Dot",
		},
	};

	componentDidMount() {
		this.updateOpacities(false);
	}

	componentDidUpdate() {
		this.updateOpacities(true);
	}

	updateOpacities = async (fadeOut: boolean) => {
		const { activeOpacity, previousOpacity } = this.opacities;
		const { duration } = this.props;

		if (fadeOut) {
			await activeOpacity.set(0.25);
			await previousOpacity.set(1);
		}

		animate.ease(activeOpacity, 1, { duration: duration });
		animate.ease(previousOpacity, 0.25, { duration: duration });
	};

	render() {
		const {
			key,
			dot,
			pages,
			width,
			height,
			gap,
			current,
			previous,
		} = this.props;

		const { activeOpacity, previousOpacity, inactiveOpacity } = this.opacities;

		let indicators = range(pages).map(i => {
			let opacity =
				i === current
					? activeOpacity
					: previous && i === previous
					? previousOpacity
					: inactiveOpacity;

			if (dot[0]) {
				return React.cloneElement(dot[0], {
					opacity: opacity,
					key: `${key}_page_indicator_${i}`,
				});
			} else {
				return (
					<Frame
						key={`${key}_page_indicator_${i}`}
						radius={999}
						background="#0099ff"
						height={8}
						width={8}
						opacity={opacity}
					/>
				);
			}
		});

		return (
			<Stack
				width={width}
				height={height}
				direction="horizontal"
				alignment="center"
				distribution="center"
				gap={gap}
			>
				{indicators}
			</Stack>
		);
	}
}
