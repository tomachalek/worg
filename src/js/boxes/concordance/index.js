export class ConcordanceBox {

    constructor(conf, target, eventDispatcher) {
        this.conf = conf;
        this.target = target;
        this.eventDispatcher = eventDispatcher;
        this.svg = null;
    }

    run({query, lang}) {
        this.eventDispatcher.dispatch('busy', this);
        window.setTimeout(() => {
            this.eventDispatcher.dispatch('loaded', this);
            this.draw([
                ['been consulted yet', 'about', 'the plans to'],
                ['give enough information', 'about',	'tax proposals for'],
                ['jury subpenas to', 'about', '200 persons involved'],
                ['brought these troubles', 'about', ' has been'],
                ['in 1959 ,', 'about', 'half for burglary',],
                ['CD director for', 'about',	'$ 3,500 a'],
                ['that pertinent information', 'about', 'the local organization'],
                ['Biltmore Hotel that', 'about', 'half of the']
            ])
        },
        1000);

    }

    draw(data) {
        const table = document.createElement('table');
        table.setAttribute('class', 'concordance');
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        this.target.append(table);
        data.forEach(datum => {
            this.drawLine(datum, tbody);
        });
    }

    drawLine(datum, target) {
        const tr = document.createElement('tr');
        target.appendChild(tr);
        const left = document.createElement('td');
        left.textContent = datum[0];
        const kwic = document.createElement('td');
        kwic.setAttribute('class', 'kwic');
        kwic.textContent = datum[1];
        const right = document.createElement('td');
        right.textContent = datum[2];
        tr.appendChild(left);
        tr.appendChild(kwic);
        tr.appendChild(right);
    }
}


export const init = (conf, target, eventDispatcher) => {
    return new ConcordanceBox(conf, target, eventDispatcher);
}