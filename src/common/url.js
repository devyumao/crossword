/**
 * @file AJAX URL
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-06
 */

define(function () {

    var workSpace = 'http://www.yiluwan.org/ecomui/xiaoyouxi?controller=';

    return {
        GET_LEVEL: workSpace + 'game&action=guess',
        GET_SIGNATURE: workSpace + 'ajax&action=gettoken'
    };

});
