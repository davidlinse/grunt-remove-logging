(function(){
// some starting point
console.log('HELLO WORLD');

// un-named fn variable assignment
var foo = function() {
        console.log('HELLO WORLD');
    };
// s.o. but named fn
var bar = function bar() {
        console.log('HELLO WORLD');
    };

// missing semicolon at log-statement
var baz = function baz() {
        console.log('HELLO WORLD')
    };

// unnecessary semicolon at fn()
function one() {
    console.log('HELLO WORLD');
};

// commented + unnecessary semicolon
function two() {
    // console.log('HELLO WORLD');
};

// commented - missing semicolon + unnecessary semicolon
function three() {
    // console.log('HELLO WORLD')
};

function four () {
    try {
        // some code
    }
    catch (e) {
        console.error('ups..');
        var some = 'more code';
    }
}

function info () {
    console.info('HELLO WORLD');
}

function warn () {
    console.warn('HELLO WORLD');
}

function startTime () {
    var foo = bar;
    console.startTime('HELLO WORLD');
}

})();
