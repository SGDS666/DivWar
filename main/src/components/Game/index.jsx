/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from 'react'
import GTime from './GTime'
import { useRecoilState } from 'recoil'
import { allms } from '../../Atom';
import './index.css'


const 属性条 = ({ name, value }) => {
    return (
        <div className='tbar'>
            <div className='tname'>{name}</div>
            <div className='tvalue'>{value}</div>
        </div>
    )
}

const 关卡面板data = { left: "40vw", top: '0.5vh', width: '20vw', height: "5vh" }
const 时间面板data = { right: "0.5vw", top: '0.5vh', width: '10vw', height: "5vh" }
const 属性面板data = { left: "0.2vw", top: '0.5vh', width: '15vw', height: "30vh" }
const 技能面板data = { left: "0.2vw", top: '59vh', width: '15vw', height: "40vh" }
const 面板 = (props) => {
    const { data } = props
    return (
        <div
            className='table'
            style={{ ...data }}
        >
            {props.children}
        </div>
    )
}


const 英雄 = ({英雄位置,旋转角度=0}) => {
    
    const xy = {left:英雄位置.X+15+"px",top:英雄位置.Y+10+"px"}
    
    return (
        <div className='hero' style={{ ...xy }}>
            <div className='bloodbar'></div>
            <div
                className="herobody"
                style={{ transform: `rotateZ(${旋转角度}deg)` }}
            ></div>

        </div>
    )
}

const Mousepost = ({ X, Y, closd }) => {
    return (
        <div className='mousepost' style={{ left: `${X}px`, top: `${Y}px` }}>

        </div>
    )
}


export default function Game() {

    const [移动显示, set移动显示] = useState(false)
    const [鼠标位置, set鼠标位置] = useState({ X: 0, Y: 0 })
    const [英雄位置,set英雄位置] = useState({X:300,Y:300})
    const [旋转角度,set旋转角度] = useState(0)
    const [ms,setms] = useRecoilState(allms)
    const [定时器,set定时器] = useState(null)

    
    
    function 方向判断(px,py,mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        var x = Math.abs(px-mx);
        var y = Math.abs(py-my);
        var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        var cos = y/z;
        var radina = Math.acos(cos);//用反三角函数求弧度
        var angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度

        if(mx>px&&my>py){//鼠标在第四象限
            angle = 180 - angle;
        }

        if(mx===px&&my>py){//鼠标在y轴负方向上
            angle = 180;
        }

        if(mx>px&&my===py){//鼠标在x轴正方向上
            angle = 90;
        }

        if(mx<px&&my>py){//鼠标在第三象限
            angle = 180+angle;
        }

        if(mx<px&&my===py){//鼠标在x轴负方向
            angle = 270;
        }

        if(mx<px&&my<py){//鼠标在第二象限
            angle = 360 - angle;
        }



        return angle;
    }
  
    document.oncontextmenu = (e) => {
        let { pageX, pageY } = e
        
        set移动显示(true)
        set鼠标位置({ X: pageX - 20, Y: pageY - 20 })
        let px = 英雄位置.X
        let py = 英雄位置.Y
        const mx = pageX - 20
        const my = pageY - 20 
        let angle = 方向判断(px,py,mx,my)
        set旋转角度(angle)
        // console.log({px,py,mx,my,angle});
        clearInterval(定时器)
        let d = setInterval(() => {
            if(px!==mx || py !== my){
                if(px>mx){
                    px-=0.2 
                }else{
                    px+=0.2
                }
                if(py>my){
                    py-=0.2
                }else{
                    py+=0.2
                }
                
                set英雄位置({X:px,Y:py})
            }else{
                
            }
        }, 1);
        set定时器(d)
        return false;
    }

    return (

        <div className='game'>
            {移动显示 ? <Mousepost key={Math.random()} X={鼠标位置.X} Y={鼠标位置.Y} /> : null}
            <面板 data={关卡面板data}>
                <属性条 name='关卡' value={1} />
            </面板>
            <面板 data={时间面板data}>
                <GTime />
            </面板>
            <面板 data={属性面板data}>
                <属性条 name='生命值' value={200} />
                <属性条 name='魔法值' value={200} />
                <属性条 name='体力' value={'100/100'} />
                <属性条 name='攻击力' value={20} />
                <属性条 name='攻击距离' value={10} />
                <属性条 name='经验值' value={'0/100'} />
                <属性条 name='等级' value={1} />
            </面板>
            <面板 data={技能面板data}></面板>
            <英雄 鼠标位置={鼠标位置} 英雄位置={英雄位置} 旋转角度={旋转角度}/>
        </div>
    )
}
