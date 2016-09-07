import React, {Component} from 'react'

export class Module3 extends Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        return (
            <div>
                <p>{'这是模块3'}</p>
                <p>{'姓名: 林岑影'}</p>
                <p>{'年龄: 1987.09'}</p>
                <p>{'职业: 前端开发'}</p>
                <p>{'技能: HTML5 + CSS3 + jQuery + Gulp + WebPack + ES6 + Vue + NodeJS + PHP'}</p>
            </div>
        )
    }
}
