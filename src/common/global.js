/**
 * @file 全局量
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-05
 */

define(function (require) {

    var color = require('common/color');

    var chFont = 'Microsoft Yahei';
    var enFont = 'Arial';

    var unlocked = localStorage.getItem('unlocked');
    unlocked = unlocked ? +unlocked : 1;

    var solvedsObj = {};
    var solveds = localStorage.getItem('solveds');
    if (solveds) {
        solveds.split(',').forEach(function (level) {
            solvedsObj[level] = true;
        });
    }

    var coins = localStorage.getItem('coins');
    coins = coins ? +coins : 200;

    return {
        getUnlocked: function () {
            return unlocked;
        },

        setUnlocked: function (num) {
            unlocked = num;
            localStorage.setItem('unlocked', unlocked);
        },

        getSolveds: function () {
            return solvedsObj;
        },

        addSolved: function (level) {
            solvedsObj[level] = true;
            var solveds = [];
            for (var l in solvedsObj) {
                if (solvedsObj.hasOwnProperty(l) && solvedsObj[l]) {
                    solveds.push(l);
                }
            }
            localStorage.setItem('solveds', solveds.join(','));
        },

        getCoins: function () {
            return coins;
        },

        setCoins: function (num) {
            coins = num;
            localStorage.setItem('coins', coins);
        },

        chFont: chFont,
        enFont: enFont,

        titleStyle: {
            font: '28px ' + chFont,
            fill: color.get('bg'),
            strokeThickness: 5,
            stroke: color.get('dark-glaze')
        }
    };

});
