(function() {
    'use strict';

    const utils = {
        assertString: function(string) {
            const isString = typeof string === 'string';
            if (!isString) throw new Error(`Parameter needs to be a type of string: ${string}`);
        },

        assertArray: function(array) {
            const notArray = !(array instanceof Array);
            if (notArray) throw new Error(`Parameter needs to be an instance of Array: ${array}`);
        }
    };

    function SortAlgorithms(visualizer) {
        const sortingAlgorithms = {
            insertion: insertionSort,
            selection: selectionSort,
            bubble: bubbleSort,
            merge: mergeSort,
            quick: quickSort
        };

        let counter = 0;

        function insertionSort(array) {
            array = array.slice();
            if (array.length <= 1) return;

            let ptr = 1;
            let p1 = 1;
            let p2 = 0;

            while (ptr < array.length) {
                let key = array[ptr];
                while (p2 >= 0 && key < array[p2]) {
                    array[p1] = array[p2];
                    array[p2] = key;
                    p1--;
                    p2--;
                    visualizer(array.slice(), ++counter, 'insertion');
                }
                ptr++;
                p1 = ptr;
                p2 = p1 - 1;
            }
            return array;
        }

        function selectionSort(array) {
            array = array.slice();
            let tmp;
            for (let i = 0; i < array.length - 1; i++) {
                for (let j = i + 1; j < array.length; j++) {
                    if (array[j] < array[i]) {
                        // swap
                        tmp = array[i];
                        array[i] = array[j];
                        array[j] = tmp;
                        visualizer(array.slice(), ++counter, 'selection');
                    }
                }
            }
            return array;
        }

        function bubbleSort(array) {
            array = array.slice();
            let isSorted = false;
            let stoppingPoint = array.length;
            while (!isSorted) {
                isSorted = true;
                for (let current = 0, next = 1; next < stoppingPoint;) {
                    if (array[current] > array[next]) {
                        isSorted = false;
                        let tmp = array[current];
                        array[current] = array[next];
                        array[next] = tmp;
                        visualizer(array.slice(), ++counter, 'bubble');
                    }
                    current++;
                    next++;
                }
                stoppingPoint--;
            }
            return array;
        }

        function mergeSort(arr) {
            let delayCounter = 1;

            let mid = Math.floor(arr.length / 2);

            divide(arr, 0, mid - 1, mid, arr.length - 1);
            conquer(arr, 0, mid - 1, mid, arr.length - 1);

            function divide(arr, ll, lr, rl, rr) {
                const leftHalfLength = lr - ll + 1;
                const rightHalfLength = rr - rl + 1;

                if (leftHalfLength > 1) {
                    const leftHalfMid = ll + Math.floor((lr - ll) / 2);
                    divide(arr, ll, leftHalfMid, leftHalfMid + 1, lr);
                    conquer(arr, ll, leftHalfMid, leftHalfMid + 1, lr);
                }

                if (rightHalfLength > 1) {
                    const rightHalfMid = rl + Math.floor((rr - rl) / 2);
                    divide(arr, rl, rightHalfMid, rightHalfMid + 1, rr);
                    conquer(arr, rl, rightHalfMid, rightHalfMid + 1, rr);
                }
            }

            function conquer(arr, ll, lr, rl, rr) {
                if (ll > rl || lr > rr)
                    return;

                let p1 = ll;
                let p2 = rl;

                let sorted = [];
                while (p1 <= lr && p2 <= rr) {
                    if (arr[p1] <= arr[p2]) {
                        sorted.push(arr[p1]);
                        p1++;
                    } else {
                        sorted.push(arr[p2]);
                        p2++;
                    }
                }

                while (p1 <= lr) {
                    sorted.push(arr[p1]);
                    p1++;
                }

                while (p2 <= rr) {
                    sorted.push(arr[p2]);
                    p2++;
                }

                for (let i = ll, s = 0; i <= rr; i++, s++) {
                    arr[i] = sorted[s];
                }

                visualizer(arr, delayCounter, 'merge');
                delayCounter++;
            }
        }

        function quickSort(array) {

            if (array.length <= 1) return array;

            let sortedArray = _quickSort(array.slice(), 0, array.length - 1);
            visualizer(sortedArray.slice(), ++counter, 'quick');
            return sortedArray;

            function _quickSort(array, low, high) {
                let pivot;

                if (high > low) {
                    pivot = partition(array, low, high);
                    _quickSort(array, low, pivot - 1);
                    _quickSort(array, pivot + 1, high);
                }
                return array.slice();
            }

            function partition(array, low, high) {
                let left, right, target = array[low];

                left = low;
                right = high;

                while (left < right) {
                    while (array[left] <= target) left++;
                    while (array[right] > target) right--;
                    if (left < right)
                        swap(array, left, right);
                    visualizer(array.slice(), ++counter, 'quick');
                }

                array[low] = array[right];
                array[right] = target;
                return right;
            }

            function swap(array, indexA, indexB) {
                let tmp = array[indexA];
                array[indexA] = array[indexB];
                array[indexB] = tmp;
            }

        }

        function use(algorithm) {
            utils.assertString(algorithm);
            counter = 0;
            return {
                sort: function(array) {
                    utils.assertArray(array);
                    return sortingAlgorithms[algorithm.toLowerCase()](array)
                }
            };
        }

        return {
            use: use
        };
    }

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return SortAlgorithms;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = SortAlgorithms;
    } else {
        window.SortAlgorithms = SortAlgorithms;
    }

})();