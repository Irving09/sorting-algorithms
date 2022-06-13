(function() {
    'use strict';

    let sortAlgorithms = new SortAlgorithms(render1, render2);
    let testArray = [];
    initializeGraphs();

    let inputText = document.getElementById('inputTextData');

    inputText.addEventListener('focusout', function(event) {
        testArray = getArrayFromInput();
        initializeGraphs();
    });

    function render2(arr, delayCounter, algorithm) {
        if (algorithm === 'merge' || algorithm === 'quick') {
            console.log(`${algorithm} state arr: `, arr);
            console.log(`${algorithm} state delayCounter: `, delayCounter);
        }
    
        let dataUpdate = d3
            .select(`.${algorithm}`)
            .selectAll('div')
            .data(arr);
        
        let dataEnter = dataUpdate
            .enter()
            .append('div')
            .style('color', 'green')

        dataUpdate
            .exit()
            .remove();

        dataUpdate
            .merge(dataEnter)
            .transition()
            .delay(delayCounter * 300)
            .style('height', '10px')
            .style('width', d => (d + 1) * 5 + 'px')
            .style('background', 'lightgreen')
            .style('border', '.5px solid black')
    }

    function render1(array, counter, algorithm) {
        (function(arr, _counter, _algorithm) {
            setTimeout(function() {
                let dataUpdate = d3
                    .select(`.${_algorithm}`)
                    .selectAll('div')
                    .data(arr);

                let dataEnter = dataUpdate
                    .enter()
                    .append('div')
                    .style('color', 'green');

                dataUpdate
                    .exit()
                    .remove();

                dataUpdate
                    .merge(dataEnter)
                    .style('height', '20px')
                    .style('width', d => (d + 1) * 10 + 'px')
                    .style('background', 'lightgreen')
                    .style('border', '1px solid black');
            }, 80 * _counter);
        })(array.slice(), ++counter, algorithm);
    }

    document
        .getElementById('startButton')
        .addEventListener('click', function(event) {

            let arrayInput = getArrayFromInput();

            if (arrayInput.length > 0) testArray = arrayInput.slice();

            initializeGraphs();

            sortAlgorithms
                .use('insertion')
                .sort(testArray);

            sortAlgorithms
                .use('selection')
                .sort(testArray);

            sortAlgorithms
                .use('bubble')
                .sort(testArray);

            sortAlgorithms
                .use('merge')
                .sort(testArray);

            sortAlgorithms
                .use('quick')
                .sort(testArray);
        });

    function getArrayFromInput() {
        return inputText.value.trim().split(',').reduce(function(previous, curr) {
            if (curr.length <= 0) {
                return previous;
            }
            if (typeof curr === 'string' && !isNaN(curr)) {
                previous.push(Number(curr));
            } else {
                alert('please enter a valid comma separated numbers as input');
            }
            return previous;
        }, []);
    }

    function initializeGraphs() {
        render1(testArray.slice(), 1, 'insertion');
        render1(testArray.slice(), 1, 'selection');
        render1(testArray.slice(), 1, 'bubble');
        render1(testArray.slice(), 1, 'merge');
        render1(testArray.slice(), 1, 'quick');
    }
})();