/**
 * @file 全局量
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-05
 */

define(function (require) {

    var color = require('common/color');

    var chFont = 'Arial';
    var enFont = 'Arial';

    var storagePrefix = 'crossword-';
    var storageKey = {
        unlocked: storagePrefix + 'unlocked',
        coins: storagePrefix + 'coins',
        levelData: storagePrefix + 'level-data-',
        levelState: storagePrefix + 'level-state-',
        stars: storagePrefix + 'stars'
    };

    var unlocked = localStorage.getItem(storageKey.unlocked);
    unlocked = unlocked ? +unlocked : 1;

    var stars = localStorage.getItem(storageKey.stars);
    stars = stars ? stars.split(',') : [];

    var coins = localStorage.getItem(storageKey.coins);
    coins = coins ? +coins : 200;

    return {
        // UNLOCKED
        getUnlocked: function () {
            return unlocked;
        },

        setUnlocked: function (num) {
            unlocked = num;
            localStorage.setItem(storageKey.unlocked, unlocked);
        },

        // STARS
        getStars: function () {
            return stars;
        },

        getStar: function (level) {
            var star = stars[level];
            if (typeof star === 'undefined' || star === '') {
                return 0;
            }
            return star;
        },

        setStar: function (level, num) {
            stars[level] = num;
            localStorage.setItem(storageKey.stars, stars.join(','));
        },

        // COINS
        getCoins: function () {
            return coins;
        },

        setCoins: function (num) {
            coins = num;
            localStorage.setItem(storageKey.coins, coins);
        },

        chFont: chFont,
        enFont: enFont,

        titleStyle: {
            font: '28px ' + chFont,
            fill: color.get('bg'),
            strokeThickness: 5,
            stroke: color.get('dark-glaze')
        },

        storageKey: storageKey
    };

});
