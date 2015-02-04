/**
 * @file 主菜单
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-04
 */

define(function () {
    
    return {
        create: function () {
            var me = this;
            var game = this.game;

            game.add.image(0, 0, 'bg');

            game.add.image((game.width - 400) / 2,  80, 'logo');

            game.add.image(20, game.height - 20 - 72, 'setting');

            var btnStyle = {};
            btnStyle.width = 234;
            btnStyle.height = 80;
            btnStyle.left = (game.width - btnStyle.width) / 2;
            btnStyle.top = 300;
            btnStyle.marginBottom = 20;

            var btn1 = game.add.button(
                btnStyle.left,
                btnStyle.top,
                'menu-btn',
                function () {
                    me.state.start('select');
                }
            );
            var text1 = game.add.text(
                btn1.x + btn1.width / 2,
                btn1.y + btn1.height / 2 - 5,
                '开 始 游 戏',
                {
                    font: 'bold 30px Arial',
                    fill: '#283e47',
                    strokeThickness: 5,
                    stroke: '#fff'
                }
            );
            text1.anchor.set(0.5);

            var btn2 = game.add.button(
                btnStyle.left,
                btnStyle.top + btnStyle.height + btnStyle.marginBottom,
                'menu-btn',
                function () {
                
                }
            );
            var text2 = game.add.text(
                btn2.x + btn2.width / 2,
                btn2.y + btn2.height / 2 - 5,
                '继 续 游 戏',
                {
                    font: 'bold 30px Arial',
                    fill: '#283e47',
                    strokeThickness: 5,
                    stroke: '#fff'
                }
            );
            text2.anchor.set(0.5);
        }
    };

});
