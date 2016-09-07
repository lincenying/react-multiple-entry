import React, {Component} from 'react'

export class Module1 extends Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        return (
            <div>
                <p>{'这是模块1'}</p>
                <p>{'姓名: 林岑影'}</p>
                <p>{'年龄: 1987.09'}</p>
                <p>{'职业: 前端开发'}</p>
            </div>
        )
    }
}
