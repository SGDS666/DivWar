import React from 'react'
import { Link } from 'react-router-dom'
import  './index.css'
export default function Nopage() {

    return (
        <div className='box'>
            <h1>抱歉没有页面</h1>
            <Link className='backbut' to='/'>返回首页</Link>
        </div>
    )
}
