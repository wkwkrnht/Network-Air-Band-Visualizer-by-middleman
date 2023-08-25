const
d = document,
fixedLength = 60, // Constructor of fixed part of box size.
fixedLengthToStyle = fixedLength.toString() + 'px';

let
windowWidth = d.documentElement.clientWidth, // Constructor of the window width.
windowHeight = d.documentElement.clientHeight, // Constructor of the window height.
displayDirection = ''; // Variable for note which direction on the display is wider.

const headerHeight = 0.13 * windowHeight;

function detectDisplayDirection(){ // For set styles on elements, detect which direction on the display is wider.
    windowWidth = d.documentElement.clientWidth, // Constructor of the window width.
    windowHeight = d.documentElement.clientHeight, // Constructor of the window height.

    if(windowWidth > windowHeight){
        displayDirection = 'landscape';
    }else{
        displayDirection = 'portrait';
    }
}

function calcAmountOfMove(baseline = 0, unit = 0, times = 0){ // Calculating the DOM will move how much.
    return ((baseline * 0.3) + (times * unit * 1.2));
}

function setBoxStyleAtCSS(){ // Set size and position for each air band boxes.
    const
    targets = d.getElementsByClassName('box'), // List of air band boxes
    length = targets.length;
    let
    i = 0,
    j = 0;

    //if( displayDirection === 'landscape' ){
        while( i < length ){ // Set basic values of air bands style. If display is as landscape, height is fixed, width is valuable, position is set from left.
            const
            d1D = targets[i].dataset.down,
            d1U = targets[i].dataset.up;
            let
            number = 0; // Value of counting of colision

            for( j = 0; j < length; j++ ){ // Count Colision from sizes of the air band box and others.
                if( i !== j ){
                    const
                    d2D = targets[j].dataset.down, // DOM proparty of others.
                    d2U = targets[j].dataset.up; // DOM proparty of others.

                    if( ((d1D < d2D) && (d2D < d1U))  || ((d1D < d2U) && (d2U < d1U)) ){
                        number++;
                    }
                }
            }

            if(number !== 0){ // If this is hitting with someone, set the style to adjust the box at fixed direction.
                targets[i].style.top = calcAmountOfMove(windowHeight, fixedLength, number);
            }

            i++;
        }
    /*}else if( displayDirection === 'portrait' ){
        while( i < length ){ // Set basic values of air bands style. If display is as portrait, width is fixed, height is valuable, position is set from top.
            const
            d1P = targets[i].dataset.down,
            d1W = targets[i].dataset.width;
            let
            topValue = headerHeight + parseFloat(d1P),
            number = 0, // Count of colision
            leftValue = '30vw'; // Initial value of position at fixed direction.

            for( j = 0; j < length; j++ ){ // Count Colision from sizes of the air band box and others.
                if( i !== j ){
                    const
                    d2P = targets[j].dataset.down, // DOM proparty of others.
                    d2W = targets[j].dataset.width; // DOM proparty of others.

                    if( ((d1P < d2P) && (d2P < (d1P + d1W)))  || ((d1P < (d2P + d2W)) && ((d2P + d2W) < (d1P + d1W))) ){
                        number++;
                    }
                }
            }

            if(number !== 0){ // If this is hitting with someone, set the style to adjust.
                leftValue = calcAmountOfMove(windowWidth, fixedLength, number);
                leftValue = leftValue.toString() + 'px';
            }

            style = 'height: ${ d1W } px;left: ${ leftValue } ;top: ${ topValue } px;width: ${ fixedLengthToStyle } ;';
            targets[i].setAttribute('style', style);

            i++;
        }
    }*/
}

function main(){ // Main function.
    detectDisplayDirection();

    setBoxStyleAtCSS();
}

window.addEventListener('resize', detectDisplayDirection()); //
window.addEventListener('load', main()); // Fire main() after loaded whole of the HTML document.