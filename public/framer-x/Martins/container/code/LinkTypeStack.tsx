import * as React from "react";
import { Data, animate, Override, Animatable } from "framer"

const data = Data({ opacity: Animatable(1) })

export const Scale: Override = () => {
    return {
        opacity: data.opacity,
        onTap() {
            data.opacity.set(0.6)
            animate.spring(data.opacity, 1)
        },
    }
}
