/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import './index.css'

const 属性条 = ({name,value}) => {
    return (
        <div className='tbar'>
            <div className='tname'>{name}</div>
            <div className='tvalue'>{value}</div>
        </div>
    )
}


const 属性面板data = {left:"0.2vw",top:'0.5vh',width:'15vw',height:"30vh"} 
const 技能面板data = {left:"0.2vw",top:'59vh',width:'15vw',height:"40vh"} 
const 面板 = (props) => {
    const {data} = props
    return (
        <div 
        className='table'
        style={{...data}}
        >
            {props.children}
        </div>
    )
}

const initxy =  {left:"40vw",top:'40vh'}
const 英雄 = ({xy=initxy}) => {
    return (
        <div className='hero' style={{...xy}}>
            <div className='bloodbar'></div>
            <div className="herobody"></div>

        </div>
    )
}

const Mousepost = ({X,Y,closd}) => {
    return (
    <div className='mousepost' style={{left:`${X}px`,top:`${Y}px`}}>

    </div>
    )
}

export default function Game() {
    const [移动显示,set移动显示] = useState(false)
    const [鼠标位置,set鼠标位置] = useState({X:0,Y:0})

    document.oncontextmenu = (e) =>{
        console.log(e);
        let {pageX,pageY} = e
        console.log(pageX,pageY);
        set移动显示(true)
        set鼠标位置({X:pageX-20,Y:pageY-20})
        return false;
    }

    return (
        
        <div className='game'>
            {移动显示?<Mousepost key={Math.random()} X={鼠标位置.X} Y={鼠标位置.Y}/>:null}
            <面板 data={属性面板data}>
                <属性条 name='生命值' value={200}/>
                <属性条 name='魔法值' value={200}/>
                <属性条 name='体力' value={'100/100'}/>
                <属性条 name='攻击力' value={20}/>
                <属性条 name='攻击距离' value={10}/>
                <属性条 name='经验值' value={'0/100'}/>
                <属性条 name='等级' value={1}/>
            </面板>
            <面板 data={技能面板data}></面板>
            <英雄/>
        </div>
    )
}
