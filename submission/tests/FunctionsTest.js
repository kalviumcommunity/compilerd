describe('Closures and Scope - ', function () {

  it('check font family', function () {
    var element = document.getElementById("html"); 
    expect(element.style.fontFamily).toEqual('Verdana');
  });

  it('check font family', function () {
    var element = document.getElementById("css"); 
    expect(element.style.fontSize).toEqual('150%');
  });

  it('check font family', function () {
    var element = document.getElementById("js"); 
    var style = window.getComputedStyle(element);
    var value = style.getPropertyValue('font-weight');
    expect(value).toEqual('900');
  });
});
