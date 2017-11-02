import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import moment from 'moment'
import utils from 'mk-utils'

const visitX = [];
const visitY = []
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
    visitX.push(moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'))
    visitY.push(Math.floor(Math.random() * 100) + 10)
}

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        debugger
        injections.reduce('init', this.component.props.visitData)
    }

    getChartOption = (data) => {
        return {
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                show: false,
                data: data.x
            },
            yAxis: {
                show: false,
            },
            grid: {
                left: 0,
                right: 0,
                bottom: 15,
                top: 15
            },
            series: [{
                type: 'line',
                smooth: true,
                sampling: 'average',
                animation: false,
                itemStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    },
                },
                areaStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)',
                    }
                },
                data: data.y
            }]
        }
    }

    numberFormat = utils.number.format
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}