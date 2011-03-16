function countParams(line){
    var paramStack = []
    function last(){
        return paramStack[paramStack.length - 1]
    }
    var otherHalf = {
        '{': '}',
        '(': ')',
        '[': ']'
    }
    var m
    while(m = line.match(/[\(\)\{\}\[\]]/)){
        if (otherHalf[last()] === m[0])
            paramStack.pop()
        else
            paramStack.push(m[0])
        line = line.slice(m.index + 1)
    }
    return paramStack.length
}
function displayData(data){
    if ('reply' in data){
        var msg = control.htmlEncode(data.reply)
        control.messageBeforePrompt(msg, 'reply')
    }else if ('error' in data){
        control.messageBeforePrompt(data.error, 'error')
    }else if ('console' in data){
        control.messageBeforePrompt(data.console, 'console')
    }
}
function layout(){
    $('#console, #console .jquery-console-inner').css({
        height: ($(window).height() - 22) + 'px'
    })
    $('#slideBoard').css({
        height: $(window).height() + 'px',
        width: $(window).width() + 'px'
    })
}
var control = $('#console').console({
    promptLabel: '> ',
    commandValidate:function(line){
        return line != ''
    },
    continuedPromptLabel: '  ',
    commandHandle:function(line){
        if (countParams(line) > 0){
            control.continuedPrompt = true
        }else{
            control.continuedPrompt = false
            control.commandResult('')
            var reply
            try{
                var result = window.eval(line)
                if (typeof result === 'string')
                    result = "'" + result + "'"
                if (result !== undefined)
                    reply = {reply: String(result)}
            }catch(e){
                var emsg = String(e)
                if (emsg.charAt(0) == '[')
                    emsg = 'Error: ' + e.message
                reply = {error: emsg}
            }finally{
                if (reply)
                    displayData(reply)
            }
        }
    },
    autofocus: true,
    animateScroll:true,
    promptHistory:true
})
function consoleLog(){
    var msg = Array.prototype.slice.call(arguments)
    displayData({console: msg.join(' ')})
}
console = {
    log: consoleLog
}

layout()
$(window).resize(layout)
var slides = $('#slides').text().split(/\n[ \t]*\n/).filter(function(l){return l.trim() != ''}).map(function(l){return l.trim()})

slides.forEach(function(line){
    control.addSlide(line)
})
var curIdx = slides.reduce(function(cur, slide, idx){
    if (cur !== null)
        return cur
    if (slide.substring(0, 3) === '-> '){
        return idx
    }
    return null
}, null)
if (curIdx)
    control.jumpToSlide(curIdx)
    