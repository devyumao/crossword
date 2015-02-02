/**
 * @file 矩阵
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function () {

    function coord(x, y) {
        return '' + x + y;
    }

    // Grid
    function Grid(options) {
        this.state = options.state;
        this.element = options.element;
        if (this.state !== 'disabled') {
            this.word = options.word;
            this.key = options.key;
            this.riddles = options.riddles
                ? options.riddles
                : {across: null, down: null};
            this.x = options.x;
            this.y = options.y;
            this.direction = options.direction;
            this.display = '';
            this.correct = !!options.correct;
        }
    }

    Grid.prototype.getElement = function () {
        return this.element;
    };

    Grid.prototype.getDirection = function () {
        return this.direction;
    };

    Grid.prototype.setDirection = function (direction) {
        this.direction = direction;
    };

    Grid.prototype.getX = function () {
        return this.x;
    };

    Grid.prototype.getY = function () {
        return this.y;
    };

    Grid.prototype.setAcrossRiddle = function (riddle) {
        this.riddles.across = riddle;
    };

    Grid.prototype.setDownRiddle = function (riddle) {
        this.riddles.down = riddle;
    };

    Grid.prototype.getAcrossClue = function () {
        var riddle = this.riddles.across;
        if (!riddle) {
            return '';
        }
        return riddle.getClue();
    };

    Grid.prototype.getDownClue = function () {
        var riddle = this.riddles.down;
        if (!riddle) {
            return '';
        }
        return riddle.getClue();
    };

    Grid.prototype.getAdjacent = function () {
        var grids = [];
        var hash = {};
        var thisCoord = coord(this.x, this.y);
        var riddles = this.riddles;
        var riddle;

        // TODO: 给Riddle
        for (var type in riddles) {
            riddle = riddles[type];
            if (riddles[type]) {
                riddle.getGrids().forEach(function (grid) {
                    var thatCoord = coord(grid.x, grid.y);
                    if (!hash[thatCoord] && thatCoord !== thisCoord) {
                        hash[thatCoord] = true;
                        grids.push(grid);
                    }
                });
            }
        }
        return grids;
    };

    Grid.prototype.isActive = function () {
        return this.state === 'active';
    };

    Grid.prototype.isSolved = function () {
        return this.state == 'solved';
    };

    Grid.prototype.check = function (render) {
        var riddles = this.riddles;
        for (var type in riddles) {
            riddle = riddles[type];
            if (riddle) {
                riddle.check(render);
            }
        }
    };

    Grid.prototype.showWord = function (render) {
        render(this.element, this.word);
        this.state = 'solved';
    };

    Grid.prototype.setDisplay = function (display) {
        this.display = display;
    };

    Grid.prototype.getDisplay = function () {
        return this.display;
    };

    Grid.prototype.test = function (key, render) {
        this.display = key;
        var riddles = this.riddles;
        var riddle;
        var change = 0;
        for (var type in riddles) {
            riddle = riddles[type];
            if (!riddle) {
                continue;
            }
            if (change === 0) {
                if (this.correct && this.key !== key) {
                    this.correct = false;
                    riddle.minus();
                    change = -1;
                }
                else if (!this.correct && this.key === key) {
                    this.correct = true;
                    riddle.plus();
                    change = 1;
                }
                else {
                    break;
                }
            } else if (change === -1) {
                riddle.minus();
            } else {
                riddle.plus();
            }
        }
        this.check(render);
    };

    // Riddle
    function Riddle(options) {
        this.clue = options.clue;
        this.answer = options.answer;
        this.keys = options.keys;
        this.orientation = options.orientation;
        this.startx = options.startx;
        this.starty = options.starty;
        this.grids = this.grids ? this.grids : [];
        this.size = this.keys.length;
        // this.solved = typeof options.solved !== 'undefined' ? options.solved : false;
        var solved = 0;
        this.grids.forEach(function (grid) {
            if (grid.isSolved()) {
                ++solved;
            }
        });
        this.solved = solved;
    }

    Riddle.prototype.addGrid = function (grid) {
        this.grids.push(grid);
    };

    Riddle.prototype.getGrids = function () {
        return this.grids;
    };

    Riddle.prototype.getClue = function () {
        return this.clue;
    };

    Riddle.prototype.isSolved = function () {
        return this.size === this.solved;
    };

    Riddle.prototype.check = function (render) {
        if (!this.isSolved()) {
            return;
        }
        this.grids.forEach(function (grid) {
            grid.showWord(render);
        });
    };

    Riddle.prototype.plus = function () {
        ++this.solved;
    };

    Riddle.prototype.minus = function () {
        --this.solved;
    };


    // Matrix
    function Matrix(options) {
        this.size = options.size;
        this.data = options.data;
        this.grids = {};
        this.currents = [];
        this.selected = null;
        this.direction = 'none';
        this._init(this.data, options.aGenerator, options.dGenerator);
    }

    Matrix.prototype.set = function (x, y, grid) {
        this.grids[coord(x, y)] = grid;
    };

    Matrix.prototype.get = function (x, y) {
        var grid = this.grids[coord(x, y)];
        if (typeof grid === 'undefined') {
            return null;
        }
        return grid;
    };

    Matrix.prototype._addCurrents = function (grids, render) {
        grids.forEach(function (grid) {
            render(grid);
        });
        this.currents = this.currents.concat(grids);
    };

    Matrix.prototype._clearCurrents = function (render) {
        this.currents.forEach(function (grid) {
            render(grid);
        });
        this.currents = [];
    };

    Matrix.prototype.select = function (x, y, clrRender, sltRender, ajtRender) {
        this.selected = this.get(x, y);
        this._clearCurrents(clrRender);
        this._addCurrents([this.selected], sltRender);
        this._addCurrents(this.selected.getAdjacent(), ajtRender);
    };

    Matrix.prototype.getSelected = function () {
        return this.selected;
    };

    Matrix.prototype.unselect = function () {
        this.selected = null;
    };

    Matrix.prototype.getActive = function (x, y) {
        var grid = this.get(x, y);
        if (!grid.isActive()) {
            grid = null;
        }
        return grid;
    };

    Matrix.prototype.right = function (x, y) {
        this.direction = 'right';
        return this.getActive(x + 1, y);
    };

    Matrix.prototype.down = function (x, y) {
        this.direction = 'down';
        return this.getActive(x, y + 1);
    };

    Matrix.prototype.next = function () {
        var curr;
        var x;
        var y;
        if (arguments.length === 1) {
            curr = arguments[0];
            x = curr.getX();
            y = curr.getY();
        }
        else {
            x = arguments[0];
            y = arguments[1];
            curr = this.get(x, y);
        }
        
        if (!curr) {
            return null;
        }
        var next;
        switch (curr.getDirection()) {
            case 'none':
                next = null;
                break;
            case 'right':
                next = this.right(x, y);
                break;
            case 'down':
                next = this.down(x, y);
                break;
            case 'both':
                switch (this.direction) {
                    case 'none':
                        next = this.right(x, y);
                        if (!next) {
                            next = this.down(x, y);
                        }
                        break;
                    case 'right':
                        next = this.right(x, y);
                        break;
                    case 'down':
                        next = this.down(x, y);
                        break;
                    default:
                }
                break;
            default:
        }
        return next;
    };

    Matrix.prototype._fillPuzzle = function (data, generator) {
        var me = this;
        var direction = {
            0: 'right',
            1: 'down'
        };
        data.forEach(function (item, index) {
            var riddle = new Riddle({
                clue: item.clue,
                answer: item.answer,
                keys: item.keys,
                orientation: item.orientation,
                startx: item.startx,
                starty: item.starty
            });

            var i;
            var len = item.keys.length;
            var x;
            var y;
            var orientation = item.orientation;
            for (i = 0; i < len; ++i) {
                x = item.startx + (orientation === 0 ? i : 0);
                y = item.starty + (orientation === 1 ? i : 0);
                var grid = me.get(x, y);
                if (!grid) {
                    grid = new Grid({
                        state: 'active',
                        word: item.answer[i],
                        key: item.keys[i],
                        element: generator(x, y),
                        riddles: {
                            across: (orientation === 0 ? riddle : null),
                            down: (orientation === 1 ? riddle : null)
                        },
                        x: x,
                        y: y,
                        direction: (i < len - 1) ? direction[orientation] : 'none'
                    });
                    me.set(x, y, grid);
                }
                else {
                    if (orientation === 0) {
                        grid.setAcrossRiddle(riddle);
                    }
                    else {
                        grid.setDownRiddle(riddle);
                    }
                    switch (grid.getDirection()) {
                        case 'none': // 原先无方向
                            if (i < len - 1) { // 现在有方向
                                grid.setDirection(direction[orientation]);
                            }
                            break;
                        default: // 原先有方向
                            if (i < len - 1) { // 现在也有方向
                                grid.setDirection('both');
                            }
                    }
                }
                riddle.addGrid(grid);
            }
        });
    };

    Matrix.prototype._fillRemainGrids = function (generator) {
        var col;
        var row;
        for (col = 0; col < this.size; ++col) {
            for (row = 0; row < this.size; ++row) {
                if (!this.get(col, row)) {
                    this.set(col, row, {
                        state: 'disabled',
                        element: generator(col, row)
                    });
                }
            }
        }
    };

    Matrix.prototype._init = function (data, aGenerator, dGenerator) {
        this._fillPuzzle(data, aGenerator);
        this._fillRemainGrids(dGenerator);
    };

    return Matrix;

});
