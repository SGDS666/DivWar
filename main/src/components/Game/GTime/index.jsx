
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { allms,allsec,gamesec,gamemin,gamehour } from '../../../Atom';


export default function GTime() {
    
    const [ms,setms] = useRecoilState(allms)
    const [asec,setasec] = useRecoilState(allsec)
    const [gsec,setgsec] = useRecoilState(gamesec)
    const [gmin,setgmin] = useRecoilState(gamemin)
    const [ghour,setghour] = useRecoilState(gamehour)
    
    useEffect(()=>{
            // console.log('开启了');
            const gameloop = setTimeout(() => {
                setms(ms+1)
                if(ms%100===0 && ms !== 0){
                    setms(0)
                    setgsec(gsec+1)
                    setasec(asec+1)
                    
                    if (gsec % 60 === 0 && gsec !== 0) {
                        setgmin(gmin+1)
                        setgsec(0)
                        if (gmin % 60 === 0 && gmin !== 0) {
                            setghour(ghour+1)
                            setgmin(0)
                        }
                    }
                
                }
            }, 10);
        
        return () => {
            clearTimeout(gameloop)
        }
    },[asec, ghour, gmin, gsec, ms, setasec, setghour, setgmin, setgsec, setms])
    return (
        <div className="timebar">
            {ghour < 10 ? "0" + ghour : ghour}时:
            {gmin < 10 ? "0" + gmin : gmin}分:
            {gsec < 10 ? "0" + gsec : gsec}秒
        </div>
    )
}
