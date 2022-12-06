const file5 = '/Charts/All/data.json';
const width5 = window.innerWidth/1.5;
const height5 = window.innerHeight/1.5;
const colors5 = {
    html: '#ffc800',
    css: '#1C88C7',
    js: '#FCC700',
    goodf: '#FFE37F',
    badf: '#FFC800',
    goodm: '#8E74BC',
    badm: '#6F42C1'
};

const generateChart5 = data => {
    const bubble = data => d3.pack()
        .size([width5, height5])
        .padding(2)(d3.hierarchy({ children: data }).sum(d => d.score));

    const svg = d3.select('#bubble-chart5')
        .style('width', width5)
        .style('height', height5);
    
    const root = bubble(data);
    const tooltip = d3.select('.tooltip');

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width5 / 2}, ${height5 / 2})`);
    
    const circle = node.append('circle')
        .style('fill', d => colors5[d.data.type])
        // .on('mouseover', function (e, d) {
        //     tooltip.select('img').attr('src', d.data.img);
        //     tooltip.select('a').attr('href', d.data.link).text(d.data.name);
        //     tooltip.select('span').attr('class', d.data.category).text(d.data.category);
        //     tooltip.style('visibility', 'visible');

        //     d3.select(this).style('stroke', '#222');
        // })
        // .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
        //                              .style('left', `${e.pageX + 10}px`))
        // .on('mouseout', function () {
        //     d3.select(this).style('stroke', 'none');
        //     return tooltip.style('visibility', 'hidden');
        // })
        // .on('click', (e, d) => window.open(d.data.link));
    
    const label = node.append('text')
        .attr('dy', 2)
        .text(d =>  d.data.name);

    node.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    
    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('r', d => d.r);
    
    label.transition()
        .delay(700)
        .ease(d3.easeExpInOut)
        .duration(1000)
        .style('opacity', 1)
};

(async () => {
    data = await d3.json(file5).then(data => data);
    generateChart5(data);
})();