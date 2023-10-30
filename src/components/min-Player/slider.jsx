import {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import './slider.scss';

const Slider = ({min, max, step, value, onChange}) => {
    const [sliderValue, setSliderValue] = useState(value); // 当前滑块的值
    const [sliderWidth, setSliderWidth] = useState(0); // 滑动条的宽度
    const [isDragging, setIsDragging] = useState(false); // 是否正在拖动滑块
    const [isHovering, setIsHovering] = useState(false); // 是否鼠标悬停在滑动条上
    const sliderRef = useRef(null); // 滑动条的引用

    useEffect(() => {
        setSliderValue(value);
    }, [value]);

    useEffect(() => {
        setSliderWidth(sliderRef.current.offsetWidth);
    }, []);

    const handleSliderChange = (event) => {
        const newValue = Math.round(event.clientX - sliderRef.current.getBoundingClientRect().left); // 计算用户点击的位置
        const percentage = (newValue / sliderWidth) * 100; // 计算用户点击的位置在滑动条上的百分比
        const rangeValue = Math.round((percentage / 100) * (max - min) / step) * step + min; // 根据百分比计算出滑块的值
        setSliderValue(rangeValue);
        onChange(rangeValue);

    };

    const handleMouseDown = () => {
        setIsDragging(true); // 开始拖动滑块
    };

    const handleMouseMove = (event) => {
        if (isDragging) { // 如果正在拖动滑块
            const newValue = Math.round(event.clientX - sliderRef.current.getBoundingClientRect().left); // 计算用户拖动的位置
            const percentage = (newValue / sliderWidth) * 100; // 计算用户拖动的位置在滑动条上的百分比
            const rangeValue = Math.round((percentage / 100) * (max - min) / step) * step + min; // 根据百分比计算出滑块的值
            setSliderValue(rangeValue);
            onChange(rangeValue);
        } else { // 如果没有拖动滑块
            const isHover = event.clientX >= sliderRef.current.getBoundingClientRect().left && event.clientX <= sliderRef.current.getBoundingClientRect().right; // 判断鼠标是否在滑动条上
            setIsHovering(isHover);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false); // 停止拖动滑块
    };
    // 鼠标离开后
    const handleMouseleave = (e) => {
        setIsHovering(false);
    }

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp); // 在整个文档上添加 mouseup 事件监听器
        return () => {
            document.removeEventListener('mouseup', handleMouseUp); // 组件卸载时移除 mouseup 事件监听器
        };
    }, []);

    const getSliderPosition = () => {
        const percentage = ((sliderValue - min) / (max - min)) * 100; // 计算滑块的值在滑动条上的百分比
        return `${percentage}%`;
    };

    return (
        <div
            className="slider h-1 rounded-full z-0  bg-default-300/50 h-1 rounded-full bg-default-500/30"
            ref={sliderRef}
            onClick={handleSliderChange}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseleave}
        >
            <div className={`slider-thumb ${isHovering ? 'show' : ''}`} style={{left: getSliderPosition()}}></div>
            <div className="slider-bar g-default-400 rounded-full  bg-default-800" style={{width: getSliderPosition()}}></div>
        </div>
    );
};

Slider.propTypes = {
    min: PropTypes.number, // 最小值
    max: PropTypes.number, // 最大值
    step: PropTypes.number, // 步长
    value: PropTypes.number, // 当前值
    onChange: PropTypes.func, // 值改变时的回调函数
};

Slider.defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    onChange: () => {
    },
};

export default Slider;
