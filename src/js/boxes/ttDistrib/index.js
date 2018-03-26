import * as d3 from 'd3';
import {ServiceAPI} from './api';
import * as britecharts from 'britecharts';


export class Window1 {

    constructor(api, conf, target, eventDispatcher) {
        this.api = api;
        this.conf = conf;
        this.target = target;
        this.eventDispatcher = eventDispatcher;
        this.svg = null;
    }

    run({query, lang}) {
        console.log(`window1 looking for ${query} (${lang}) `);
        this.eventDispatcher.dispatch('busy', this);
        this.api.call().then(
            (data) => {
                this.eventDispatcher.dispatch('loaded', this);
                this.target.innerHTML = '';
                const d3target = d3.select(this.target);
                d3target.append('div');
                this.drawChart(d3target.select('div'), data);
            },
            (err) => {
                this.eventDispatcher.dispatch('error', this);
                console.error(err);
            }
        );
    }

    drawChart(svg, data) {
        const barChart = britecharts.bar();
        barChart
            .margin({
                left: 100,
                right: 20,
                top: 10,
                bottom: 15
            })
            .percentageAxisToMaxRatio(1.3)
            .isHorizontal(true)
            .isAnimated(true)
            .yAxisPaddingBetweenChart(30)
            .colorSchema(britecharts.colors.colorSchemas.britecharts)
            .height(240)
            .width(350);
        svg.datum(data).call(barChart);
    }
}


export const init = (conf, target, eventDispatcher) => {
    return new Window1(new ServiceAPI(), conf, target, eventDispatcher);
}