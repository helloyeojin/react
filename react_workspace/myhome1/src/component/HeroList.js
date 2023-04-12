//HeroList.js : 백엔드 서버로부터 데이터 가져온다
//axios : npm install axios 설치

import axios from "axios";
import { useEffect, useState } from "react";

function Herolist(props){
    const [heroList, setHeroList]=useState([]);
    //useState 함수가 값을 초기화해주면 해당 값을 저장할 변수와 해당값 변경하는 함수 반환
    //[]-> 배열을 저장할 변수 반환, 배열값을 변환할 함수 주소
    const [loading,setLoading]= useState(false);//데이터를 수신하면 true 로 바뀐다
    
    useEffect(()=>{
        // console.log("나 호출된다.");
        // setHeroList(heroList.concat([
        //     {id:1, name:"이순신", descr:"임란승리"},
        //     {id:2, name:"장덕배", descr:"짱귀여움"},
        //     {id:3, name:"왕밤빵", descr:"왕귀여움"}
        // ]))
        //Promise 기반 컴포넌트라서 return 불가
        axios
        .get("http://localhost:9090/hero/list")
        .then(
            (res)=>{
                console.log(res);
                setHeroList(res.data);
                setLoading(true);
            }
        )
        .catch((res, status, error)=>{
            console.log(status);
        });
    }, []);

    return (
        <div>
        <table>
        {
          loading === true ?
            heroList.map((item, index)=>{
                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.hero_name}</td>
                        <td>{item.hero_desc}</td>
                    </tr>
                )
            })
            :""
        }
        </table>
        </div>
    )
}

export default Herolist;