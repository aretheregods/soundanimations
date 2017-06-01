function simpleWidget(spec){
  var instance = {}

  var headline, description;

  instance.render = function(){
    var div = d3.select('body').append('div');
    
    div.append('h1').text(headline)

    div.attr('class', 'box')
      .attr('style', 'color', spec.color)
      .append('p')
      .text(description)
    
    return instance

  }

  instance.headline = function(h){
    if(!arguments.length) return headline;

    headline = h

    return instance

  }

  instance.description = function(d) {
    if(!arguments.length) return description

    description = d

    return instance

  }

  return instance

}

var thing1 = simpleWidget({color: "#6495ed"})
  .headline("Widget One")
  .description("The first D3 widget!")
  .render()