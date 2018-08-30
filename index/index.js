const app = getApp()

let _touchClientY
let _currentItemInitialOffsetTop
let _currentItemOffsetY
let _currentItemIndex
let _currentItemNewIndex
let itemHeight = 50
let _list = [1,2,3,4,5]

Page({
    data: {
        list: _list.slice(0),
        currentItemIndex: null,
        currentItemOffsetY: null,
        placeholderHelperItemIndex: null
    },
    onTouchStart: function (e) {
        console.log('touchstart')
        // 记下拖动元素的位置
        _currentItemIndex = e.target.dataset.index
        // 事件的起始位置
        _touchClientY = e.touches[0].clientY
        // 元素的垂直位置
        _currentItemInitialOffsetTop = e.currentTarget.offsetTop
    },
    onTouchMove: function (e) {
        console.log('touchmove')
        // 记下移动后的位置, 更新到视图
        _currentItemOffsetY = _currentItemInitialOffsetTop + (e.touches[0].clientY - _touchClientY)
        this.setData({
            currentItemIndex: _currentItemIndex,
            currentItemOffsetY: _currentItemOffsetY
        })
        // 根据元素高及元素的垂直位置算出元素下是哪个元素, 给它一个上边距, 挤出个视觉上的空位
        _currentItemNewIndex = Math.ceil((_currentItemOffsetY - itemHeight / 2) / itemHeight)
        _currentItemNewIndex = _currentItemNewIndex > this.data.list.length ? (this.data.list.length - 1) : _currentItemNewIndex
        _currentItemNewIndex = _currentItemNewIndex <= 0 ? 0 : _currentItemNewIndex
        if (_currentItemNewIndex >= _currentItemIndex) {
            this.setData({
                placeholderHelperItemIndex: _currentItemNewIndex + 1
            })
        } else {
            this.setData({
                placeholderHelperItemIndex: _currentItemNewIndex
            })
        }
    },
    onTouchEnd: function () {
        console.log('touchend')
        // 没有发生移动, 返回
        if (this.data.currentItemIndex === null) {
            return
        }
        let tempList = this.data.list.slice(0)
        // 移动元素, 更新到视图
        tempList.splice(_currentItemIndex, 1)
        tempList.splice(_currentItemNewIndex, 0, _list[_currentItemIndex])
        _list = tempList.slice(0)
        this.setData({
            list: tempList,
            currentItemIndex: null,
            currentItemOffsetY: null,
            placeholderHelperItemIndex: null
        })
    }
})