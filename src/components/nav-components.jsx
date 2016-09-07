import React from 'react'

export const NavCompontent = () => {
    return (
        <ul className="menuOpen">
            <li className="tag-all"><a href="/"><i />首页</a></li>
            <li className="tag-life"><a href={`/module1`}><i />模块1</a></li>
            <li className="tag-study"><a href={`/module2`}><i />模块2</a></li>
            <li className="tag-study"><a href={`/module3`}><i />模块3</a></li>
        </ul>
    )
}
