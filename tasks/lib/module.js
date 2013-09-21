
module.exports.process = function (source, path, opts) {

    'use strict';

    var esprima = require('esprima');
    var esmangle = require('esmangle');
    var estraverse = require('estraverse');
    var escodegen = require('escodegen');

    var _ = require('lodash');


    var ast = esprima.parse(source, opts);

    if (!!opts && !!opts.mangle) {
        ast = esmangle.mangle(ast);
    }

    if (!!opts && !!opts.optimize) {
        ast = esmangle.optimize(ast);
    }

    estraverse.traverse(ast, {

        enter: function(node, parent) {

            if (node.type == 'ExpressionStatement' &&
                node.expression.type == 'CallExpression' &&
                node.expression.callee.type == 'MemberExpression' &&
                node.expression.callee.object.type == 'Identifier' &&
                node.expression.callee.object.name == 'console') {

                parent.body = _.without(parent.body, node);
            }
        }
    });

    return escodegen.generate(ast, opts);
};
