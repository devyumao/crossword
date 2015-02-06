/**
 * @file 全局量
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-05
 */

define(function () {

    var unlocked = localStorage.getItem('unlocked');
    unlocked = unlocked ? +unlocked : 1;

    return {
        getUnlocked: function () {
            return unlocked;
        },

        setUnlocked: function (num) {
            unlocked = num;
            localStorage.setItem('unlocked', unlocked);
        }
    };

});
