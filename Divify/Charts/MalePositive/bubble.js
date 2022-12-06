const file4 = '/Charts/MalePositive/data.json';
const width4 = window.innerWidth/1.5;
const height4 = window.innerHeight/1.5;
const colors4 = {
    html: '#6F42C1',
    css: '#6F42C1',
    js: '#6F42C1'
};

const generateChart4 = data => {
    const bubble = data => d3.pack()
        .size([width4, height4])
        .padding(2)(d3.hierarchy({ children: data }).sum(d => d.score));

    const svg = d3.select('#bubble-chart4')
        .style('width', width4)
        .style('height', height4);
    
    const root = bubble(data);
    const tooltip = d3.select('.tooltip');

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width4 / 2}, ${height4 / 2})`);
    
    const circle = node.append('circle')
        .style('fill', d => colors4[d.data.category])
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
        .text(d => d.data.name.substring(0, d.r / 3));

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
    data = await d3.json(file4).then(data => data);
    generateChart4(data);
})();