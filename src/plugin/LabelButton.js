/**
 * @file 带标签的按钮
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function (require) {

    function LabelButton (options) {
        // var button = options.game.add.button(options.x, options.y, options.key,
        //     options.callback, options.callbackContext,
        //     options.overFrame, options.outFrame, options.downFrame, options.upFrame);
        Phaser.Button.call(this, options.game,
            options.x, options.y, options.key,
            options.callback, options.callbackContext,
            options.overFrame, options.outFrame, options.downFrame, options.upFrame);
        // console.log(button.width);
    }



    return LabelButton;

});
