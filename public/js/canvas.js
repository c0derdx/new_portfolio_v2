var entries = [ 

    { label: 'Back to top'},
    { label: 'html'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'CSS'},
    { label: 'Countdown'},
    { label: 'Dropdown'}
];

var settings = {

    entries: entries,
    width: 590,
    height: 480,
    radius: '65%',
    radiusMin: 75,
    bgDraw: true,
    bgColor: '#14104B',
    opacityOver: 1.00,
    opacityOut: 0.05,
    opacitySpeed: 6,
    fov: 800,
    speed: 1,
    fontFamily: 'Oswald, Arial, sans-serif',
    fontSize: '15',
    fontColor: '#F54D71',
    fontWeight: 'normal',//bold
    fontStyle: 'normal',//italic 
    fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    fontToUpperCase: true,
    tooltipFontFamily: 'Oswald, Arial, sans-serif',
    tooltipFontSize: '11',
    tooltipFontColor: '#fff',
    tooltipFontWeight: 'normal',//bold
    tooltipFontStyle: 'normal',//italic 
    tooltipFontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    tooltipFontToUpperCase: false,
    tooltipTextAnchor: 'left',
    tooltipDiffX: 0,
    tooltipDiffY: 10,
    animatingSpeed: 0.01,
    animatingRadiusLimit: 1.3

};


$('#tag-cloud').svg3DTagCloud(settings);