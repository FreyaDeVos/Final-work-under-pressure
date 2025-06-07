// src/components/MyP5Sketch.js

import React from 'react';
import Sketch from 'react-p5';

function MyP5Sketch({
    data
}) {
    let currentValue = 0;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(400, 400).parent(canvasParentRef);
    };

    const draw = (p5) => {
        p5.background(30);
        p5.fill(255);
        p5.textSize(24);

        if (data && data.hr) {
            currentValue = data.hr;
        }

        p5.text(`HR: ${currentValue}`, 50, 200);
    };

    return <Sketch setup = {
        setup
    }
    draw = {
        draw
    }
    />;
}

export default MyP5Sketch;