function all(promises) {
    console.log('start all: ', promises);
    return new Promise(function (success, fail) {
        var result = new Array(promises.length); // Need to figure out how to order
        var i;
        var count = promises.length;
        var promiseIndex;

        // Following working for 2 soons
        //  all([soon(1), soon(2)]).then(function (array) {
        //    console.log('This should be [1, 2]: ', array);
        //});  

        //        promises[0].then(function (val) {
        //            console.log('promise[0] complete: ', val);
        //            result.push(val);
        //            // success(result);
        //            promises[1].then(function (val) {
        //                console.log('promise[1] complete: ', val);
        //                result.push(val);
        //                success(result);
        //            }).catch(function (error) {
        //                console.log('error: ', error);
        //                fail(error);
        //            });
        //        }).catch(function (error) {
        //            console.log('error: ', error);
        //            fail(error);
        //        });
        //    })

        // Attempt with fail not working
        //        promises[0].then(function (val) {
        //            console.log('promise[0] complete: ', val);
        //            result.push(val);
        //            // success(result);
        //            promise[1].then(function (val) {
        //                console.log('promise [1] complete: ', val);
        //                result.push(val);
        //                // success(result);
        //            }).catch(function (error) {
        //                console.log('promise[1] error: ', error);
        //                failx(error);
        //            });
        //        }).catch(function (error) {
        //            console.log('promise[0] error: ', error);
        //            fail(error);
        //        });
        //    });

        // Another attempt with fail function
        if (promises.length === 0) // No promises just return results
        {
            success(result);
        }
        for (i = 0; i < promises.length; i += 1) {
            console.log('i: ', i);
            (function (promise, i) {
                console.log('promise: ', promise, 'i: ', i);
                promise.then(function (val) {
                    console.log('promise complete: ', val);
                    console.log('inside then i: ', i);
                    result[i] = val;
                    console.log('result: ', result);
                    count -= 1;
                    if (count === 0) {
                        success(result);
                    }
                }, fail);
            }).call(null, promises[i], i);
        }

        // Working
        //        promises.forEach(function (promise, i) {
        //            console.log('i: ', i);
        //            promise.then(function (val) {
        //                console.log('i: ', i, 'result: ', result);
        //                result[i] = val;
        //                console.log('result: ', result);
        //                count -= 1;
        //                if (count === 0) {
        //                    success(result);
        //                }
        //            }, fail);
        //        });

    });
}


function soon(val) {
    console.log('set up soon val: ', val);
    return new Promise(function (success) {
        setTimeout(function () {
                success(val);
            },
            Math.random() * 5000);
    });
}

function failx() {
    console.log('fail');
    return new Promise(function (success, fail) {
        console.log('boom');
        fail(new Error('boom'));
    });
}

console.log('start');

//all([]).then(function (array) {
//    console.log('This should be []: ', array);
//}, function (error) {
//    console.log('This should not happen: ', error);
//});

all([soon(1), soon(2), soon(3)]).then(function (array) {
    console.log('This should be [1, 2, 3]: ', array);
}, function (error) {
    console.log('This should not happen: ', error);
});

//all([soon(1), failx(), soon(3)]).then(function (array) {
//    console.log('We should not get here: ', array);
//}, function (error) {
//    console.log('All Error: ', error);
//    if (error.message != 'boom') {
//        console.log('Unexpected failure: ', error);
//    }
//});
//all([soon(1), fail()]).then(function (array) {
//    console.log('We should not get here');
//}, function (error) {
//    if (error.message != 'boom') {
//        console.log('Unexpected failure: ', error);
//    }
//});