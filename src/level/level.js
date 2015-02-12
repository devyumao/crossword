/**
 * @file 关卡
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function (require) {

    var Matrix = require('./Matrix');
    var ajax = require('common/ajax');
    var global = require('common/global');
    var color = require('common/color');
    var Dialog = require('common/ui/Dialog');

    // var AJAX_URL = 'http://tc-sf-tmc01.tc.baidu.com:8501/ecomui/xiaoyouxi?controller=game&action=';
    var AJAX_URL = 'http://121.40.104.68/ecomui/xiaoyouxi?controller=game&action=';

    var game;
    var matrixSize = 10;
    var gridSize = 46;
    var matrix;
    var clueAcross = null;
    var clueDown = null;
    var levelNo;
    var levelDataKey;

    function setFontLang(text, lang) {
        if (lang === 'en') {
            text.font = global.enFont;
            text.fontSize += 2;
        }
        else {
            text.font = global.chFont;
            text.fontSize -= 2;
        }
    }

    function clrRender(grid) {
        grid.getElement().button.loadTexture('grid');
    }

    function sltRender(grid) {
        grid.getElement().button.loadTexture('grid-selected');
        var clue1 = grid.getAcrossClue();
        if (clue1) {
            clueAcross && clueAcross.destroy();
            clueAcross = createClue('across', '横：' + clue1);
        }
        var clue2 = grid.getDownClue();
        if (clue2) {
            clueDown && clueDown.destroy();
            clueDown = createClue('down', '竖：' + clue2);
        }
    }

    function ajtRender(grid) {
        grid.getElement().button.loadTexture('grid-adjacent');
    }

    function fetch(handler) {
        var localData = localStorage.getItem(levelDataKey);
        if (localData) {
            initPuzzle(JSON.parse(localData));
        }
        else {
            ajax.get({
                url: AJAX_URL + 'guess',
                data: {
                    index: levelNo
                },
                success: function (res) {
                    var timer = game.time.create();
                    // 延迟加载，防止面板压住过场
                    // TODO: better solution
                    timer.add(500, function () {
                        res = JSON.parse(res);
                        initPuzzle(preprocessData(res.tableList));
                    });
                    timer.start();
                }
            });
        }
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
        localStorage.setItem(levelDataKey, JSON.stringify(newData));
        return newData;
    }

    function initPuzzle(data) {
        var x = (game.width - matrixSize * gridSize) / 2;
        var y = 132;

        game.add.image(x + 3, y + 4, 'puzzle-shadow');

        matrix = new Matrix({
            storeKey: 'level-state-' + levelNo,
            size: matrixSize,
            data: data,
            aGenerator: function (col, row) {
                var onClick = function () {
                    matrix.select(col, row, clrRender, sltRender, ajtRender);
                    matrix.adjustDirection();
                };

                var left = x + col * gridSize;
                var top = y + row * gridSize;

                var button = game.add.button(left, top, 'grid', onClick, null, 0, 0, 1);

                var text = game.add.text(
                    left + gridSize / 2,
                    top + gridSize / 2 - 1,
                    '',
                    {
                        fill: color.get('white')
                    }
                );
                text.fontSize = 28;
                text.fontWeight = 'bold';
                text.font = global.enFont;
                text.anchor.set(0.5);
                text.alpha = 0.85;

                var element = {
                    button: button,
                    text: text
                };

                return element;
            },
            dGenerator: function (col, row) {
                var element = game.add.image(
                    x + (col + 0.5) * gridSize,
                    y + (row + 0.5) * gridSize,
                    'grid-disabled'
                );
                element.anchor.set(0.5);
                element.angle = Math.floor(Math.random() * 4) * 90;
                return element;
            }
        });

        matrix.retrive(function (element, display, isSolved) {
            var text = element.text;
            isSolved && setFontLang(text, 'ch');
            text.setText(display);
        });
    }

    function initKeyboard() {
        var y = 132 + gridSize * matrixSize + 10;
        var keySize = 49;
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
            var beforeSolved = matrix.isSolved();
            if (beforeSolved) { // 谜题已解决
                return;
            }

            var beforeUnlocked = matrix.isUnlocked();

            var selected = matrix.getSelected();
            if (!selected || !selected.isActive()) {
                return;
            }

            var currKey = this.data.key;
            selected.getElement().text.setText(currKey);
            selected.test(currKey, function (element, word) {
                var text = element.text;
                var hide = game.add.tween(text.scale)
                    .to({x: 0, y: 0}, 500, Phaser.Easing.Back.In, false);
                var show = game.add.tween(text.scale)
                    .to({x: 1, y: 1}, 500, Phaser.Easing.Back.Out, false);
                hide.onComplete.add(function () {
                    setFontLang(text, 'ch');
                    text.setText(word);
                });

                hide.chain(show);
                hide.start();
                
                matrix.plusSolved(); // 临时
            });

            var next = matrix.next();
            if (next) {
                matrix.select(next.getX(), next.getY(), clrRender, sltRender, ajtRender);
            }

            var dialog;
            if (matrix.isSolved()) {
                console.log('solved!');
                global.addSolved(levelNo);

                dialog = new Dialog(game, {
                    msg: '太棒了\n\n您已完成所有谜题！',
                    btns: [
                        {
                            text: '下 一 关',
                            onClick: function () {
                                game.stateTransition.forward('level', true, false, levelNo + 1);
                            }
                        }
                    ]
                });
                dialog.show();
            }
            else if (!beforeUnlocked && matrix.isUnlocked()) { // 刚好达到解锁要求
                var unlocked = global.getUnlocked();
                if (levelNo === unlocked) { // 当前关为最新关
                    console.log('unlocked!');
                    global.setUnlocked(unlocked + 1);

                    dialog = new Dialog(game, {
                        msg: '您已完成80%\n\n恭喜您成功解锁下一关！',
                        btns: [
                            {
                                text: '知 道 啦'
                            }
                        ]
                    });
                    dialog.show();
                }
            }

            matrix.store();
        };

        keyLines.forEach(function (line) {
            line.keys.forEach(function (key, index) {
                var left = line.x + (keySize + margin) * index;
                var top = line.y;

                var button = game.add.button(left, top, 'key', onClick, null, 0, 0, 1);
                button.data = {key: key};

                var text = game.add.text(
                    left + keySize / 2,
                    top + keySize / 2,
                    key,
                    {
                        font: 'bold 26px ' + global.enFont,
                        fill: color.get('white'),
                        strokeThickness: 4,
                        stroke: color.get('dark-glaze')
                    }
                );
                text.anchor.set(0.5);
            });
        });
    }

    function initClueBoard() {
        var padding = 20;
        var x = 10;
        var y = 50;
        game.add.image(x + 3, y + 4, 'clue-shadow');
        game.add.image(x, y, 'clue');
    }

    function createClue(type, content) {
        var height = 72;
        var ratio = 0.34;

        var clue = game.add.text(
            30,
            40 + height * (type === 'across' ? ratio : (1 - ratio)),
            content,
            {
                font: '16px ' + global.chFont,
                fill: color.get('dark-green')
            }
        );

        if (clue.width > 420) {
            clue.width = 420;
        }

        return clue;
    }


    return {
        init: function (level) {
            levelNo = level;
            // levelNo = 1;
            levelDataKey = 'level-data-' + levelNo;
        },
        create: function () {
            game = this.game;

            game.add.image(0, 0, 'bg');

            var title = game.add.text(
                game.width * 0.5, 6,
                '第 ' + levelNo + ' 关',
                global.titleStyle
            );
            title.anchor.set(0.5, 0);

            var backBtn = game.add.button(
                10, 10,
                'back',
                function () {
                    game.stateTransition.back('select');
                },
                this,
                0, 0, 1
            );

            var restartBtn = game.add.button(
                game.width - 10 - 34, 10,
                'restart',
                function () {
                    matrix.clear(function (element, isSolved) {
                        var text = element.text;
                        text.setText('');
                        isSolved && setFontLang(text, 'en');
                        element.button.loadTexture('grid');
                    });
                },
                this,
                0, 0, 1
            );

            fetch();

            initKeyboard();
            initClueBoard();

            // global.addSolved(levelNo);
        }
    };

});
