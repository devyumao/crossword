/**
 * @file 关卡
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function (require) {

    var global = require('common/global');
    var color = require('common/color');
    var Dialog = require('common/ui/Dialog');

    var game;
    var levelTop = 20;
    var matrixSize = 10;
    var gridSize = 46;

    var matrix = null;
    var hint = null;
    var starState = null;
    var clueAcross = null;
    var clueDown = null;

    var levelNo;
    var levelDataKey;

    function showStar(num) {
        var star = game.add.image(67 + (num - 1) * 38, levelTop + 18, 'star-solid');
        star.anchor.set(0.5);
        star.scale.set(0);
        var show = game.add.tween(star.scale)
            .to({x: 1, y: 1}, 500, Phaser.Easing.Back.Out, false);
        show.start();
    }

    function checkLevelEvents() {
        var beforeUnlocked = matrix.isUnlocked();
        matrix.plusSolved();

        matrix.checkStar(
            function () {
                starState.show(1);
            },
            function () {
                starState.show(2);
            },
            function () {
                starState.show(3);
            }
        ); // 检查星级

        var dialog;
        if (matrix.isSolved()) {
            console.log('solved!');
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
    }

    function showWordRender(element, display, word) {
        var text = element.text;
        var hide = game.add.tween(text.scale)
            .to({x: 0, y: 0}, display ? 500 : 1, Phaser.Easing.Back.In, false);
        var show = game.add.tween(text.scale)
            .to({x: 1, y: 1}, 500, Phaser.Easing.Back.Out, false);

        hide.onComplete.add(function () {
            setFontLang(text, 'ch');
            text.setText(word);
        });

        hide.chain(show);
        hide.start();

        checkLevelEvents();
    }

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

        clueAcross && clueAcross.destroy();
        clueDown && clueDown.destroy();
        var clue1 = grid.getAcrossClue();
        if (clue1) {
            clueAcross = createClue('across', '横：' + clue1);
        }
        var clue2 = grid.getDownClue();
        if (clue2) {
            clueDown = createClue('down', '竖：' + clue2);
        }

        hint[grid.isActive() ? 'activate' : 'disable']();
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
            require('common/ajax').get({
                url: require('common/url').GET_LEVEL,
                data: {
                    index: levelNo
                },
                success: function (res) {
                    res = JSON.parse(res);
                    if (res.retcode) {
                        return;
                    }
                    var timer = game.time.create();
                    // 延迟加载，防止面板压住过场
                    // TODO: better solution
                    timer.add(300, function () {
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
        var y = 142;

        game.add.image(x + 3, y + 4, 'puzzle-shadow');

        var Matrix = require('./Matrix');
        matrix = new Matrix({
            level: levelNo,
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
                    top + gridSize / 2 + 2,
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

        initHint();
    }

    function initKeyboard() {
        var y = 142 + gridSize * matrixSize + 10;
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
            var selected = matrix.getSelected();
            if (!selected || !selected.isActive()) {
                return;
            }

            var currKey = this.data.key;
            selected.getElement().text.setText(currKey);
            selected.test(currKey, showWordRender);

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

                var button = game.add.button(left, top, 'key', onClick, null, 0, 0, 1);
                button.data = {key: key};

                var text = game.add.text(
                    left + keySize / 2,
                    top + keySize / 2 + 3,
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

        initRestart();
    }

    function initClueBoard() {
        var x = 10;
        var y = 60;
        game.add.image(x + 3, y + 4, 'clue-shadow');
        game.add.image(x, y, 'clue');
    }

    function createClue(type, content) {
        var height = 72;
        var ratio = 0.34;

        var clue = game.add.text(
            30,
            48 + height * (type === 'across' ? ratio : (1 - ratio)),
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


    function initHint() {
        var Hint = require('./Hint');
        hint = new Hint(game, {
            buttonX: game.width - 49 * 3 / 2 - 10 + 7,
            buttonY: 142 + gridSize * matrixSize + 10 + 103,
            coinsX: game.width - 10 - 78,
            coinsY: levelTop - 2,
            matrix: matrix,
            showWordRender: showWordRender,
            levelNo: levelNo
        });
    }

    function initStars() {
        var StarState = require('./StarState');
        starState = new StarState(game, {
            starNum: global.getStar(levelNo)
        });
    }

    function initRestart() {
        var restart = game.add.button(
            37, 142 + gridSize * matrixSize + 10 + 102,
            'key',
            function () {
                var dialog = new Dialog(game, {
                    msg: '您确定要重新开始吗？',
                    btns: [
                        {
                            text: '是',
                            onClick: function () {
                                matrix.clear(function (element, isSolved) {
                                    var text = element.text;
                                    text.setText('');
                                    isSolved && setFontLang(text, 'en');
                                    element.button.loadTexture('grid');
                                    dialog.hide();
                                });
                            }
                        },
                        {
                            text: '否'
                        }
                    ]
                });
                dialog.show();
            },
            this,
            0, 0, 1
        );

        var icon = game.add.image(
            restart.x + restart.width * 0.5,
            restart.y + restart.height * 0.5,
            'restart'
        );
        icon.anchor.set(0.5);
    }

    return {
        init: function (level) {
            levelNo = level;
            // levelNo = 2;
            levelDataKey = global.storageKey.levelData + levelNo;
        },
        create: function () {
            game = this.game;

            game.add.image(0, 0, 'bg');

            var Title = require('common/ui/Title');
            new Title(game, {text: '第 ' + levelNo + ' 关'});

            var Back = require('common/ui/Back');
            new Back(game, {state: 'select'});

            fetch();

            initKeyboard();
            initClueBoard();
            initStars();
        }
    };

});
