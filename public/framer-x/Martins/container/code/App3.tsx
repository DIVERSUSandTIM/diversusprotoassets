import * as React from "react";
import { Data, animate, Override, Animatable } from "framer"

const data = Data({ opacity: Animatable(1),  })

export const Fade: Override = props => {
    data.opacity.set(props.opacity)

    return {
        opacity: data.opacity,
        onTap() {
            animate.linear(data.opacity, 0, 0.2)
        },
    }
}