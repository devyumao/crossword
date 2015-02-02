/**
 * @file 关卡
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function (require) {

    var Matrix = require('../common/Matrix');
    var ajax = require('../common/ajax');

    // var AJAX_URL = 'http://172.18.20.85/crossword/';
    var AJAX_URL = 'http://tc-sf-tmc01.tc.baidu.com:8501/ecomui/xiaoyouxi?controller=game&action=';

    var matrixSize = 10;
    var matrix;
    var clueAcross;
    var clueDown;

    function clrRender(grid) {
        grid.getElement().button.loadTexture('grid');
    }

    function sltRender(grid) {
        grid.getElement().button.loadTexture('grid-selected');
    }

    function ajtRender(grid) {
        grid.getElement().button.loadTexture('grid-adjacent');
    }

    function fetch(game, handler) {
        ajax.get({
            // url: 'mock/level1.json',
            url: AJAX_URL + 'guess',
            success: function (res) {
                res = JSON.parse(res);
                afterFetch(game, res.tableList);
            }
        });
    }

    function afterFetch(game, data) {
        data = preprocessData(data);
        initPuzzle(game, data, 50 + 72 + 10, 46);
    }

    function preprocessData(data) {
        var newData = [];
        var orientation;
        for (var key in data) {
            orientation = key === 'column' ? 0 : 1;
            data[key].forEach(function (item) {
                newData.push({
                    clue: item.question,
                    answer: item.answer,
                    keys: item.shortcut.toUpperCase(),
                    orientation: orientation,
                    startx: +item.x,
                    starty: +item.y
                });
            });
        }
        return newData;
    }

    function initPuzzle(game, data, y, gridSize) {
        var x = (game.width - matrixSize * gridSize) / 2;

        matrix = new Matrix({
            size: matrixSize,
            data: data,
            aGenerator: function (col, row) {
                var onClick = function () {
                    matrix.select(col, row, clrRender, sltRender, ajtRender);
                    var grid = matrix.get(col, row);
                    var clue1 = grid.getAcrossClue();
                    if (clue1) {
                        clueAcross.setText('横：' + clue1);
                    }
                    else {
                        clueAcross.setText('');
                    }
                    var clue2 = grid.getDownClue();
                    if (clue2) {
                        clueDown.setText('纵：' + clue2);
                    }
                    else {
                        clueDown.setText('');
                    }
                };

                var left = x + col * gridSize;
                var top = y + row * gridSize;

                var button = game.add.button(left, top, 'grid', onClick);
                button.scale.set(gridSize - 1);

                var text = game.add.text(
                    left + gridSize / 2,
                    top + gridSize / 2,
                    '',
                    {font: '30px Arial', fill: '#444'}
                );
                text.anchor.set(0.5);

                var element = {
                    button: button,
                    text: text
                };

                return element;
            },
            dGenerator: function (col, row) {
                var element = game.add.image(x + col * gridSize, y + row * gridSize, 'grid-disabled');
                element.scale.set(gridSize - 1);
                return element;
            }
        });
    }

    function initKeyboard(game, y, keySize) {
        var margin = 2;
        var keyLines = [
            {
                x: (game.width - keySize * 8 - margin * 7) / 2,
                y: y,
                keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'O', 'P']
            },
            {
                x: (game.width - keySize * 9 - margin * 8) / 2,
                y: y + margin + keySize,
                keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
            },
            {
                x: (game.width - keySize * 6 - margin * 5) / 2,
                y: y + (margin + keySize) * 2,
                keys: ['Z', 'X', 'C', 'B', 'N', 'M']
            }
        ];

        var onClick = function () {
            var selected = matrix.getSelected();
            if (!selected || !selected.isActive()) {
                return;
            }

            var currKey = this.data.key;
            selected.getElement().text.setText(currKey);
            selected.test(currKey, function (element, word) {
                element.text.setText(word);
            });

            var next = matrix.next(selected);
            if (next) {
                matrix.select(next.getX(), next.getY(), clrRender, sltRender, ajtRender);
            }

        };

        keyLines.forEach(function (line) {
            line.keys.forEach(function (key, index) {
                var left = line.x + (keySize + margin) * index;
                var top = line.y;

                var button = game.add.button(left, top, 'key', onClick);
                button.scale.set(keySize);
                button.data = {key: key};

                var text = game.add.text(
                    left + keySize / 2,
                    top + keySize / 2,
                    key,
                    {font: '30px Arial', fill: '#eee'}
                );
                text.anchor.set(0.5);
            });
        });
    }

    function initClue(game, y) {
        var margin = 10;
        var x = 10;
        var board = game.add.image(x, y, 'clue');
        board.scale.set(game.width - 2 * margin, 72);
        var height = 72;
        var style = {
            font: '18px Arial',
            fill: '#c5701b'
        };
        clueAcross = game.add.text(x + 10, y + height * 0.3, '', style);
        clueAcross.anchor.set(0, 0.5);
        clueDown = game.add.text(x + 10, y + height * 0.7, '', style);
        clueDown.anchor.set(0, 0.5);
    }

    return {
        preload: function () {
        
        },
        create: function () {
            var game = this.game;

            var gridSize = 46;
            var keySize = 46;

            // initPuzzle(game, 50 + 72 + 10, gridSize);
            fetch(game, afterFetch);

            initKeyboard(game, 50 + 72 + 10 + gridSize * matrixSize + 10, keySize);
            initClue(game, 50);
        },
        update: function () {

        },
        render: function () {

        }
    };

});
