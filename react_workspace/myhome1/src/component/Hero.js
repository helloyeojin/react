import React, {useState} from 'react';

function Hero(props) {
  const [heroList, setHeroList] = useState
  (
    [
    {id:1, name:"왕밤빵", descr:"세계 최고의 고양이임"},
    {id:2, name:"장덕배", descr:"귀여움"},
    {id:3, name:"서마롱", descr:"몽실몽실함"},
    {id:4, name:"신리오", descr:"근육질 고양이임"},
    ]
  );

  const [hero, setHero] = useState({name:"", descr:""});

  const nameChange=(e)=>{
    let h = hero;
    h.id = 999;
    h.name = e.target.value;
    setHero(h);
    console.log(hero);
  }

  const descrChange=(e)=>{
    let h = hero;
    h.descr = e.target.value;
    setHero(h);
  }

  const goAppend=(e)=>{
    console.log(hero);
    setHeroList(heroList.concat(hero));
    setHero({name:"", descr:""});
  }

  return(
    <div>
      이름 : <input type = "text" onChange={nameChange}></input><br/>
      업적 : <input type = "text" onChange={descrChange}></input><br/>
      <button type = "button" onClick={goAppend}>추가</button><br/><br/>
      <table>
        <tbody>
          {
            heroList.map((hero, index)=>{
              return(
                
                  <tr key={index}>
                    <td>{hero.id}</td>
                    <td>{hero.name}</td>
                    <td>{hero.descr}</td>
                  </tr>

              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Hero;