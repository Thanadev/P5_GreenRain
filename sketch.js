var symbolSize = 16;
var streams = [];

function setup() {
    createCanvas(600, 600);
    textSize(symbolSize);
    var x = 0;
    
    for (var i = 0; i < width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, random(-1000, 0));
        streams.push(stream);
        x += symbolSize;
    }
}

function draw() {
    background(0, 125);
    streams.forEach(function(stream) {
        stream.render();
    });
}


function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.first = first;
    this.value;
    this.switchCharInterval = round(random(5, 30));
    
    this.setRandomSymbol = function() {
        this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
    }
    
    this.render = function () {
        (first == false) ? fill(0, 255, 70) : fill(180, 255, 180);
        text(this.value, this.x, this.y);
        
        if (frameCount % this.switchCharInterval == 0) {
            this.setRandomSymbol();
        }
        
        this.rain();
    }
    
    this.rain = function () {
        this.y += this.speed;
        
        if (this.y > height) {
            this.y = 0;
        }
    }
}


function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(10, 35));
    this.speed = random(3, 5);
    
    this.generateSymbols = function(x, y) {
        var first = round(random(0, 4)) == 4;
        
        for (var i = 0; i < this.totalSymbols; i++) {
            var symbol = new Symbol(x, y, this.speed, first);
            symbol.setRandomSymbol();
            this.symbols.push(symbol);
            
            first = false;
            y -= symbolSize;
        }
    }
    
    this.render = function() {
        this.symbols.forEach(function(sym) {
            sym.render();
        })
    }
}