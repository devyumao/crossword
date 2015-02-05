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
    var levelNo;
    var storeKey;

    function clrRender(grid) {
        grid.getElement().button.loadTexture('grid');
    }

    function sltRender(grid) {
        grid.getElement().button.loadTexture('grid-selected');
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
    }

    function ajtRender(grid) {
        grid.getElement().button.loadTexture('grid-adjacent');
    }

    function fetch(game, handler) {
        ajax.get({
            url: AJAX_URL + 'guess',
            data: {
                index: levelNo
            },
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

        game.add.image(x + 3, y + 4, 'puzzle-shadow');

        matrix = new Matrix({
            storeKey: storeKey,
            size: matrixSize,
            data: data,
            aGenerator: function (col, row) {
                var onClick = function () {
                    matrix.select(col, row, clrRender, sltRender, ajtRender);
                    matrix.adjustDirection();
                };

                var left = x + col * gridSize;
                var top = y + row * gridSize;

                var button = game.add.button(left, top, 'grid', onClick);

                var text = game.add.text(
                    left + gridSize / 2,
                    top + gridSize / 2,
                    '',
                    {font: 'bold 28px Arial', fill: '#f8f7f2'}
                );
                text.anchor.set(0.5);

                var element = {
                    button: button,
                    text: text
                };

                return element;
            },
            dGenerator: function (col, row) {
                var element = game.add.image(x + (col + 0.5) * gridSize, y + (row + 0.5) * gridSize, 'grid-disabled');
                element.anchor.set(0.5);
                element.angle = Math.floor(Math.random() * 4) * 90;
                return element;
            }
        });

        matrix.retrive(function (element, display) {
            element.text.setText(display);
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

        game.add.image(keyLines[0].x - keySize / 2 + 3, keyLines[0].y + 4, 'keyboard-shadow');

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

            var next = matrix.next();
            if (next) {
                matrix.select(next.getX(), next.getY(), clrRender, sltRender, ajtRender);
            }

            matrix.store();
        };

        keyLines.forEach(function (line) {
            line.keys.forEach(function (key, index) {
                var left = line.x + (keySize + margin) * index;
                var top = line.y;

                var button = game.add.button(left, top, 'key', onClick);
                // var button = game.add.button(left + 0.5 * keySize, top + 0.5 * keySize, 'key', onClick);
                // button.anchor.set(0.5);
                // button.angle = Math.floor(Math.random() * 4) * 90;
                button.data = {key: key};

                var text = game.add.text(
                    left + keySize / 2,
                    top + keySize / 2,
                    key,
                    {
                        font: 'bold 26px Arial',
                        fill: '#fff',
                        strokeThickness: 4,
                        stroke: '#b2a892'
                    }
                );
                text.anchor.set(0.5);
            });
        });
    }

    function initClue(game, y) {
        var padding = 20;
        var x = 10;
        game.add.image(x + 3, y + 4, 'clue-shadow');
        game.add.image(x, y, 'clue');

        var height = 72;
        var style = {
            font: '18px Arial',
            fill: '#49453d'
        };
        clueAcross = game.add.text(x + 20, y + height * 0.32, '', style);
        clueAcross.anchor.set(0, 0.5);
        clueDown = game.add.text(x + 20, y + height * 0.68, '', style);
        clueDown.anchor.set(0, 0.5);
    }

    return {
        init: function (level) {
            levelNo = level;
            // levelNo = 1;
            storeKey = 'level-' + levelNo;
        },
        preload: function () {
        
        },
        create: function () {
            var me = this;
            var game = this.game;

            game.add.image(0, 0, 'bg');

            var backBtn = game.add.button(10, 10, 'back', function () {
                me.state.start('select');
            });

            var restartBtn = game.add.button(game.width - 10 - 34, 10, 'restart', function () {
                matrix.clear(function (element) {
                    element.text.setText('');
                    element.button.loadTexture('grid');
                });
            });

            var gridSize = 46;
            var keySize = 49;

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
