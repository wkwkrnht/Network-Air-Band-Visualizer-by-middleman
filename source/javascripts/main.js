const
d = document,
fixedLength = 60, // Constructor of fixed part of box size.
fixedLengthToStyle = fixedLength.toString() + 'px';

let
windowWidth = d.documentElement.clientWidth, // Constructor of the window width.
windowHeight = d.documentElement.clientHeight, // Constructor of the window height.
displayDirection = '', // Variable for note which direction on the display is wider.
unitWidth = d.getElementsByClassName('box').style.fontSize;

const headerHeight = 0.13 * windowHeight;

function detectDisplayDirection(){ // For set styles on elements, detect which direction on the display is wider.
    windowWidth = d.documentElement.clientWidth, // Constructor of the window width.
    windowHeight = d.documentElement.clientHeight; // Constructor of the window height.

    if(windowWidth > windowHeight){
        displayDirection = 'landscape';
    }else{
        displayDirection = 'portrait';
    }
}

function updateUnitIndicator(){
    const
    target = d.getElementsByClassName('unit');

    let
    prefix = Number(target.dataset.prefix),
    prefixStr = 'k';

    switch(prefix){
        case 1:
            prefixStr = '';
            break;
        case 1000:
            prefixStr = 'k';
            break;
        case 1000000:
            prefixStr = 'M';
            break;
        case 1000000000:
            prefixStr = 'G';
            break;
        case 0.001:
            prefixStr = 'm';
            break;
        case 0.000001:
            prefixStr = 'μ';
            break;
        case 0.000000001:
            prefixStr = 'n';
            break;
        default:
            prefixStr = 'k';
            break;
    }

    target.innerText = '[' + prefixStr + 'Hz]';
}

function updateUnitInt( direction = '' ){
    const
    amount = 100,
    target = d.getElementsByClassName('unit');

    let
    prefix = Number(target.dataset.prefix);

    switch(direction){
        case '+':
            prefix *= amount;
            break;
        case '-':
            prefix /= amount;
            break;
        default:
            break;
    }

    target.dataset.prefix = prefix;
    updateUnitIndicator();
}

function moveMainPart( direction = '' ){
    const
    target = d.getElementsByClassName('unit'),
    unit = Number(target.dataset.prefix);

    switch(direction){
        case '+':
            switch(displayDirection){
                case 'landscape':
                    scrollBy(unit,0);
                    break;
                case 'portrait':
                    scrollBy(0,unit);
                    break;
                default:
                    break;
            }
            break;
        case '-':
            switch(displayDirection){
                case 'landscape':
                    scrollBy(-unit,0);
                    break;
                case 'portrait':
                    scrollBy(0,-unit);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
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
}

function main(){ // Main function.
    detectDisplayDirection();

    setBoxStyleAtCSS();
}

window.addEventListener('resize', detectDisplayDirection()); //
window.addEventListener('load', main()); // Fire main() after loaded whole of the HTML document.


d.getElementsByClassName('scaler-up').addEventListener(updateUnitInt('+'));
d.getElementsByClassName('scaler-up').addEventListener(updateUnitInt('-'));
d.getElementsByClassName('move-up').addEventListener(moveMainPart('+'));
d.getElementsByClassName('move-up').addEventListener(moveMainPart('-'));