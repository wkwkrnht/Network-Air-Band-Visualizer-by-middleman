let
windowWidth = document.documentElement.clientWidth, // Constructor of the window width.
windowHeight = document.documentElement.clientHeight, // Constructor of the window height.
displayDirection = '', // Variable for note which direction on the display is wider.
unitWidth = 1000;

const
headerHeight = 0.13 * windowHeight,
e1 = document.getElementById('scaler-up'),
e2 = document.getElementById('scaler-down'),
e3 = document.getElementById('move-up'),
e4 = document.getElementById('move-down');

function detectDisplayDirection(){ // For set styles on elements, detect which direction on the display is wider.
    windowWidth = document.documentElement.clientWidth, // Constructor of the window width.
    windowHeight = document.documentElement.clientHeight; // Constructor of the window height.

    if(windowWidth > windowHeight){
        displayDirection = 'landscape';
    }else{
        displayDirection = 'portrait';
    }
}

function updateUnitIndicator(){
    let
    target = document.getElementById('unit'),
    prefix = Number(target.dataset.unitprefix),
    prefixStr = 'k';

    console.log(prefix);

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

function updateUnitInt( symbol = '' ){
    const
    amount = 100,
    max = 1000000000,
    min = 0.000000001;

    let
    target = document.getElementById('unit'),
    prefix = Number(target.dataset.unitprefix);

    console.log(prefix);

    if(symbol == '+'){
        prefix *= amount;
    }else if(symbol == '-'){
        prefix /= amount;
    }

    if(prefix > max){
        prefix = max;
    }else if(prefix < min){
        prefix = min;
    }

    console.log(prefix);

    target.dataset.unitprefix = prefix;
    updateUnitIndicator();
}

function moveMainPart( symbol = '' ){
    const
    target = document.getElementById('unit'),
    unit = Number(target.dataset.unitprefix) * unitWidth;

    console.log(unit);

    if(displayDirection == 'landscape' && symbol == '+'){
        window.scrollBy(unit,0);
    }else if(displayDirection == 'landscape' && symbol == '-'){
        window.scrollBy(-unit,0);
    }else if(displayDirection == 'portrait' && symbol == '+'){
        window.scrollBy(0,unit);
    }else if(displayDirection == 'portrait' && symbol == '-'){
        window.scrollBy(0,-unit);
    }
}

function calcAmountOfMove(baseline = 0, unit = 0, times = 0){ // Calculating the DOM will move how much.
    return ((baseline * 0.18) + (times * unit * 1.2));
}

function setBoxStyleAtCSS(){ // Set size and position for each air band boxes.
    const
    fixedLength = 60, // Constructor of fixed part of box size.
    targets = document.getElementsByClassName('box'), // List of air band boxes
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
    updateUnitIndicator();

    setBoxStyleAtCSS();
}

window.addEventListener('resize', detectDisplayDirection()); //
window.addEventListener('load', main()); // Fire main() after loaded whole of the HTML document.

e1.addEventListener('click', updateUnitInt('+'));
e1.addEventListener('touchstart', updateUnitInt('+'));
e2.addEventListener('click', updateUnitInt('-'));
e2.addEventListener('touchstart', updateUnitInt('-'));
e3.addEventListener('click', moveMainPart('+'));
e3.addEventListener('touchstart', moveMainPart('+'));
e4.addEventListener('click', moveMainPart('-'));
e4.addEventListener('touchstart', moveMainPart('-'));